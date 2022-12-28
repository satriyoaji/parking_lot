const shell = require('./shell');

const run = () => {
    const { argv } = process;
    console.log("Args: ", argv);
    if (argv.length === 2) shell.runShellMode();
    else console.error('Unknown Mode');
}
module.exports = {run};
