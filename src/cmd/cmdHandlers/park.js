const { PARK } = require('../constants');
const parking = require('../../parking');
const { invalidInstruction } = require('../../errors');
const { matchPattern } = require('../helpers');

/**
 * @param {string} instruction
 */
const park = (instruction) => {
  const pattern = `^${PARK} [A-Z0-9-]{1,}$`;

  if (matchPattern(instruction, pattern)) {
    const [_, vehicleSign] = instruction.split(' ');
    parking.park(vehicleSign);
    return;
  }
  invalidInstruction();
};

module.exports = park;
