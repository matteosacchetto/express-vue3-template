const fs = require('fs');
const path = require('path');
const config = require('../../client/vue.config.js');

const buildNeeded = () => {
  const root = path.join(__dirname, '..', '..', 'client');
  const buildDirectory = config.outputDir;

  const ignore_list = new Map();
  ignore_list.set(path.join(root, 'node_modules'), true);
  ignore_list.set(__dirname, true);

  const getOldest = (dir, max) => {
    if (!fs.existsSync(dir)) {
      return max;
    }

    const list = fs.readdirSync(dir);

    list
      .map((el) => path.join(dir, el))
      .filter((el) => !ignore_list.has(el))
      .forEach((el) => {
        const stats = fs.statSync(el);

        if (stats.isDirectory()) {
          max = getOldest(el, max);
        } else {
          if (stats.ctime.getTime() > max) {
            max = stats.ctime.getTime();
          }

          if (stats.mtime.getTime() > max) {
            max = stats.mtime.getTime();
          }
        }
      });

    return max;
  };

  const maxVue = getOldest(root, 0);
  const maxBuild = getOldest(buildDirectory, 0);

  if (maxVue > maxBuild) {
    // We need to build the app
    return true;
  }

  // We don't
  return false;
};

module.exports = buildNeeded;
