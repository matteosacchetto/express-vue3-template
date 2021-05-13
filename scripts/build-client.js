const execa = require('execa');
const path = require('path');
const { Listr } = require('listr2');
const { exit } = require('process');

const optimizeBuild = require('./lib/optimize-build-client.js');

const tasks = new Listr(
  [
    {
      title: `Check if the client needs to be built`,
      task: (ctx, task) => {
        if (optimizeBuild()) {
          ctx.clientIsBuilt = false;
        } else {
          ctx.clientIsBuilt = true;
        }
      },
    },
    {
      title: `Build the client`,
      skip: (ctx) => ctx.clientIsBuilt,
      task: (ctx, task) =>
        execa('npm', ['run', 'build'], {
          cwd: path.join(__dirname, '..', 'client'),
        }),
    },
  ],
  { rendererOptions: { showErrorMessage: false, showTimer: true } }
);

tasks.run({}).catch(() => {
  // Log error to console
  console.error(tasks.err.toString());
  exit(1);
});
