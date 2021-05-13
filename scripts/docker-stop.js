const execa = require('execa');
const { Listr } = require('listr2');

const logger = require('./lib/logger.js');

// Import package.json
const info = require('../package.json');

const tasks = new Listr(
  [
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
      title: `Stop the ${info.name}-${info.version} container`,
      enabled: (ctx) => ctx.conainerExist,
      task: (ctx, task) =>
        task.newListr((parent) => [
          {
            title: `Check if the ${info.name}-${info.version} container is running`,
            task: (ctx, task) =>
              execa('docker', [
                'ps',
                '-q',
                '-f',
                `name=${info.name}-${info.version}`,
              ]).then((result) => {
                if (result.stdout.toString() === '') {
                  ctx.isRunning = false;
                  task.title = `Container ${info.name}-${info.version} is already stopped`;
                  parent.title = `Container ${info.name}-${info.version} is already stopped`;
                } else {
                  ctx.isRunning = true;
                  task.title = `Container ${info.name}-${info.version} is running`;
                }
              }),
          },
          {
            title: `Stop the ${info.name}-${info.version} container`,
            enabled: (ctx) => ctx.isRunning,
            task: (ctx, task) =>
              execa('docker', ['stop', `${info.name}-${info.version}`]),
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
