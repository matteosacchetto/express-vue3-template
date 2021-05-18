const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const stripAnsi = require('strip-ansi');

const logger = {
  info: (data, file) => {
    if (data.constructor === Array) {
      data = data.join();
    }
    
    const dir = 'logs';
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    const filename = `${dir}/${new Date().getTime()}-log-${path.basename(
      file,
      '.js'
    )}.log`;
    fs.writeFileSync(filename, stripAnsi(data));

    console.log(`\nLog has been written to -> ${chalk.bold.cyan(filename)}`);
  },
  error: (data, file) => {
    if (data.constructor === Array) {
      data = data.join();
    }
    
    const dir = 'logs';
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    const filename = `${dir}/${new Date().getTime()}-err-${path.basename(
      file,
      '.js'
    )}.log`;
    fs.writeFileSync(filename, stripAnsi(data));

    console.log(
      `\n${chalk.bold.redBright(
        'Error:'
      )} Log has been written to -> ${chalk.bold.cyan(filename)}`
    );
  },
};

module.exports = logger;
