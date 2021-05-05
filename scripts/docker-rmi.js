const execa = require('execa');
const { Listr } = require('listr2');

const logger = require('./lib/logger.js');

// Import package.json
const info = require('../package.json');

const tasks = new Listr(
  [
    {
      title: `Delete docker image ${info.name}/${info.name}:${info.version} and the relative containers`,
      task: (ctx, task) =>
        task.newListr([
          {
            title: `Check if there is the image ${info.name}/${info.name}:${info.version}`,
            task: (ctx, task) =>
              execa('docker', [
                'image',
                'inspect',
                `${info.name}/${info.name}:${info.version}`,
              ])
                .then(() => {
                  ctx.imageExist = true;
                  task.title = `Image ${info.name}/${info.name}:${info.version} exist`;
                })
                .catch(() => {
                  ctx.imageExist = false;
                  task.title = `Image ${info.name}/${info.name}:${info.version} does not exist`;
                }),
          },
          {
            title: `Delete ${info.name}/${info.name}:${info.version} image`,
            enabled: (ctx) => ctx.imageExist,
            task: (ctx, task) =>
              task.newListr([
                {
                  title: `Check if there are containers based on image ${info.name}/${info.name}:${info.version}`,
                  enabled: (ctx) => ctx.imageExist,
                  task: (ctx, task) =>
                    execa('docker', [
                      'ps',
                      '-a',
                      '-q',
                      '--filter',
                      `ancestor=${info.name}/${info.name}:${info.version}`,
                      '--format="{{.ID}}"',
                    ]).then((result) => {
                      if (result.stdout.toString() === '') {
                        ctx.containersExist = false;
                        task.title = `There is no container based on image ${info.name}/${info.name}:${info.version}`;
                      } else {
                        ctx.containersExist = true;
                        ctx.containerList = result.stdout.toString();
                        task.title = `There are containers based on image ${info.name}/${info.name}:${info.version}`;
                      }
                    }),
                },
                {
                  title: `Delete all containers based on image ${info.name}/${info.name}:${info.version}`,
                  enabled: (ctx) => ctx.containersExist,
                  task: (ctx, task) =>
                    task.newListr([
                      {
                        title: `Stop containers`,
                        task: (ctx) => {
                          const promises = [];
                          const ids = ctx.containerList
                            .replace(/("|')/g, '')
                            .split('s');

                          ids.forEach((el) => {
                            promises.push(execa('docker', ['stop', `${el}`]));
                          });

                          return Promise.all(promises);
                        },
                      },
                      {
                        title: `Delete containers`,
                        task: (ctx) => {
                          const promises = [];
                          const ids = ctx.containerList
                            .replace(/("|')/g, '')
                            .split('s');

                          ids.forEach((el) => {
                            promises.push(execa('docker', ['rm', `${el}`]));
                          });

                          return Promise.all(promises);
                        },
                      },
                    ]),
                },
                {
                  title: `Delete image ${info.name}/${info.name}:${info.version}`,
                  task: () =>
                    execa('docker', [
                      'rmi',
                      `${info.name}/${info.name}:${info.version}`,
                    ]),
                },
              ]),
          },
        ]),
    },
  ],
  { rendererOptions: { showErrorMessage: false, showTimer: true } }
);

tasks.run({}).catch(() => {
  // Log error to file
  logger.error(tasks.err, __filename);
});
