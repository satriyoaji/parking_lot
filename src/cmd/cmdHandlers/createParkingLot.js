const { CREATE_PARKING_LOT,
  NUMBER_OF_LEVEL
} = require('../constants');
const parking = require('../../parking');
const { invalidInstruction } = require('../../errors');
const { matchPattern } = require('../helpers');

/**
 * @param {*} command
 */
const createParkingLot = (command) => {
  const pattern = `^${CREATE_PARKING_LOT} [0-9]{1,3}$`;

  if (matchPattern(command, pattern)) {
    const [_, spotsPerLevel] = command.split(' ');
    parking.createParkingLot(parseInt(spotsPerLevel, 10), NUMBER_OF_LEVEL);
    return;
  }
  invalidInstruction();
};

module.exports = createParkingLot;
