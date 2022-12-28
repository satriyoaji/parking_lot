// @ts-ignore
const { clean } = require('./helpers');
const { unknownOperation } = require('../errors');
const {
  CREATE_PARKING_LOT, PARK, LEAVE, STATUS,
} = require('./constants');

const createParkingLot = require('./cmdHandlers/createParkingLot');
const leave = require('./cmdHandlers/leave');
const park = require('./cmdHandlers/park');
const status = require('./cmdHandlers/status');

/**
 * map cmd to a handler
 */
const handlerLookup = {};
handlerLookup[CREATE_PARKING_LOT] = createParkingLot;
handlerLookup[LEAVE] = leave;
handlerLookup[PARK] = park;
handlerLookup[STATUS] = status;

/**
 * hands over the instruction to the appropriate handler
 * if the lookup contains a handler for the instruction
 * @param {string} command
 * @param {*} lookup
 */
const execute = (command, lookup = handlerLookup) => {
  const [cmd] = clean(command).split(' ');

  if (cmd && lookup[cmd]) {
    const handleFunction = lookup[cmd];
    handleFunction(command);
    return;
  }
  unknownOperation();
};

module.exports = { exec: execute };
