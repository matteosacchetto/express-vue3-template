const execa = require('execa');
const { Listr } = require('listr2');
const chalk = require('chalk');
const stripAnsi = require('strip-ansi');

const logger = require('./lib/logger.js');

const localPort = 8000
const containerPort = 80

// Import package.json
const info = require('../package.json');

const tasks = new Listr(
  [
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
            task.output = `Please run ${chalk.bold(
              'npm run docker-build'
            )} to create the image\n`;
            throw Error(stripAnsi(task.output));
          }),
      options: { persistentOutput: true },
    },
    {
      title: `Create and run ${info.name}-${info.version} container`,
      enabled: (ctx) => ctx.imageExist,
      task: (ctx, task) =>
        task.newListr([
          {
            title: `Check if exists the ${info.name}-${info.version} container`,
            task: (ctx, task) =>
              execa('docker', [
                'ps',
                '-a',
                '-q',
                '-f',
                `name=${info.name}-${info.version}`,
              ]).then((result) => {
                if (result.stdout.toString() === '') {
                  ctx.conainerExist = false;
                  task.title = `Container ${info.name}-${info.version} does not exist`;
                } else {
                  ctx.conainerExist = true;
                  task.title = `Container ${info.name}-${info.version} exists`;
                }
              }),
          },
          {
            title: `Delete ${info.name}-${info.version} container`,
            enabled: (ctx) => ctx.conainerExist,
            task: (ctx, task) =>
              task.newListr([
                {
                  title: `Stop ${info.name}-${info.version} container`,
                  task: (ctx, task) =>
                    execa('docker', ['stop', `${info.name}-${info.version}`]),
                },
                {
                  title: `Delete ${info.name}-${info.version} container`,
                  task: () =>
                    execa('docker', ['rm', `${info.name}-${info.version}`]),
                },
              ]),
          },
          {
            title: `Create and run ${info.name}-${info.version} container`,
            task: () =>
              execa('docker', [
                'run',
                '-d',
                '--name',
                `${info.name}-${info.version}`,
                '-p',
                `${localPort}:${containerPort}`,
                '-e',
                'USE_HTTPS=false',
                `${info.name}/${info.name}:${info.version}`,
              ]),
          },
        ]),
    },
    {
      title: `Get URLs of ${info.name}-${info.version} container`,
      enabled: (ctx) => ctx.imageExist,
      task: (ctx, task) =>
        task.newListr((parent) => [
          {
            title: `Get HTTP port of ${info.name}-${info.version} container`,
            task: (ctx, task) =>
              execa('docker', [
                'port',
                `${info.name}-${info.version}`,
                '80/tcp',
              ]).then((result) => {
                ctx.http = result.stdout
                  .toString()
                  .replace(/0\.0\.0\.0/g, 'http://localhost');
                parent.output = `URLs: \n${chalk.italic(ctx.http)}\n`;
              }),
          }
        ]),
      options: { persistentOutput: true },
    },
  ],
  { rendererOptions: { showErrorMessage: false, showTimer: true } }
);

tasks.run({}).catch(() => {
  // Log error to file
  logger.error(tasks.err, __filename);
});
