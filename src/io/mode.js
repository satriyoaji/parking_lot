const shell = require('./shell');
const file = require('./file');

const run = () => {
    const { argv } = process;
    // console.log("Args: ", argv);
    if (argv.length === 3 && argv[2].endsWith('.txt')) file.runFileMode();
    else if (argv.length === 2) shell.runShellMode();
    else console.error('Unknown Mode');
}
module.exports = {run};
