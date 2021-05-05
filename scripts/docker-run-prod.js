const execa = require('execa');
const { Listr } = require('listr2');
const chalk = require('chalk');
const stripAnsi = require('strip-ansi');
const path = require('path');
const fs = require('fs');

const local_ssl_folder = path.join(__dirname, '..', 'server', 'ssl')
const container_ssl_folder = path.join('/usr', 'src', 'app', 'server', 'ssl')
const ssl_key_file = 'ssl.key'
const ssl_cert_file = 'ssl.cert'

const localPort = 44300
const containerPort = 443

const logger = require('./lib/logger.js');

// Import package.json
const info = require('../package.json');
const { fstat } = require('fs');

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
            title: `Check that the ssl folder exists and contains the required files`,
            task: (ctx, task) => {
              if(fs.existsSync(local_ssl_folder)) {
                if(fs.existsSync(path.join(local_ssl_folder, ssl_key_file)) && fs.existsSync(path.join(local_ssl_folder, ssl_cert_file)))
                {
                  return;
                }
                else
                {
                  let message = `${path.relative(path.join(__dirname, '..'), local_ssl_folder)} does not contain required files - KEY: ${ssl_key_file}, CERT: ${ssl_cert_file}`;
                  task.title = message;
                  throw Error(message);
                }
              }
              else
              {
                let message = `${path.relative(path.join(__dirname, '..'), local_ssl_folder)} does not exist`;
                task.title = message;
                throw Error(message);
              }
            }
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
                'USE_HTTP=false',
                '-v',
                `${local_ssl_folder}:${container_ssl_folder}`,
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
            title: `Get HTTPS port of ${info.name}-${info.version} container`,
            task: (ctx, task) =>
              execa('docker', [
                'port',
                `${info.name}-${info.version}`,
                '443/tcp',
              ]).then((result) => {
                ctx.https = result.stdout
                  .toString()
                  .replace(/0\.0\.0\.0/g, 'https://localhost');
                parent.output = `URLs: \n${chalk.italic(ctx.https)}\n`;
              }),
          },
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
