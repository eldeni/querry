const { argv } = require('yargs');
const { createLaunch, proc } = require('process-launch');
const { logger } = require('jege/server');

const log = logger('[monorepo-querry]');

const processDefinitions = {
  sandbox: proc(
    'node',
    [
      './scripts/launch.js',
      ...argv._,
    ],
    {
      cwd: `./packages/sandbox`,
      stdio: 'inherit',
    },
  ),
};

function launcher() {
  try {
    log('launcher(): argv: %j', argv);

    const launch = createLaunch({
      processDefinitions,
    });

    launch({
      process: argv.process,
    });
  } catch (err) {
    log('launcher(): Error reading file', err);
  }
}

module.exports = launcher;

if (require.main === module) {
  launcher();
}
