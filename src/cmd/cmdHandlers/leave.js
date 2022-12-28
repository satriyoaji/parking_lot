const { LEAVE } = require('../constants');
const parking = require('../../parking');
const { invalidInstruction } = require('../../errors');
const { matchPattern } = require('../helpers');

/**
 * @param {*} instruction
 */
const leave = (instruction) => {
  const pattern = `^${LEAVE} [A-Z0-9-]{1,} [0-9]{1,}$`;

  if (matchPattern(instruction, pattern)) {
    const [_, vehicleSign, duration] = instruction.split(' ');
    parking.unpark(vehicleSign, parseInt(duration, 10));
    return;
  }
  invalidInstruction();
};

module.exports = leave;
