const readline = require('readline');
const { exec } = require('../cmd/executorRouter');

/**
 * handles readline for cli
 */
const runShellMode = async () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'command> ',
  });

  rl.prompt();

  // eslint-disable-next-line no-restricted-syntax
  for await (const line of rl) {
    try {
      exec(line);
    } catch (e) {
      console.error(e);
    }
    // rl.prompt();
  }

  rl.on('close', () => {
    process.exit(0);
  });
};

module.exports = { runShellMode };
