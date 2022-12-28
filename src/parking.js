const Lot = require('./entities/lot');
const Spot = require('./entities/spots/spot');
const Car = require('./entities/vehicles/car');
const Ticket = require('./entities/tickets/ticket');

const {
  parkingLotInitError,
  parkingLotNotInited,
} = require('./errors');

const {
  PARKING_LOT_FULL,
  VEHICLE_ALREADY_PARKED,
  VEHICLE_NOT_FOUND,
} = require('./entities/constants');

/**
 * this is the parkingLot instance
 * can be instantiated only once
 */
let parkingLot;

const isParkingLotExisted = () => !!parkingLot;

/**
 * @param {number} spotsPerLevel
 * @param {number} numberOfLevels
 */
const createParkingLot = (spotsPerLevel, numberOfLevels) => {
  if (isParkingLotExisted()) parkingLotInitError();

  parkingLot = new Lot(numberOfLevels);
  parkingLot.addSpotLevel(spotsPerLevel);
  console.log(`Created parking lot with ${spotsPerLevel} slots`);
};

/**
 * @param {string} vehicleNumber
 */
const park = (vehicleNumber) => {
  if (!isParkingLotExisted()) parkingLotNotInited();

  const spotId = parkingLot.findSpotAndPark(new Car(vehicleNumber, 'black', new Ticket()));
  console.log("spotId: ",spotId)
  if (spotId === PARKING_LOT_FULL) {
    console.log(PARKING_LOT_FULL);
    return;
  }
  if (spotId === VEHICLE_ALREADY_PARKED) {
    console.log(VEHICLE_ALREADY_PARKED);
    return;
  }
  console.log(`Allocated slot number: ${spotId}`);
};

const status = () => {
  if (!isParkingLotExisted()) parkingLotNotInited();

  const bookedSpots = parkingLot.getBookedSpotsOfLevel();
  if (bookedSpots && bookedSpots.length > 0) {
    const header = 'Slot No.    Registration No.';
    const spacer = '           ';
    const tmpArr = bookedSpots
      .map((spot) => [spot.getId(), spot.getVehicle().getRegisteredNumber()].join(spacer));
    console.log([header, ...tmpArr].join('\n'));
  }
};

/**
 * @param {string} vehicleNumber
 * @param {number} durationUntil
 */
const unpark = (vehicleNumber, durationUntil) => {
  if (!isParkingLotExisted()) parkingLotNotInited();

  const result = parkingLot.findSpotAndVacate(vehicleNumber);
  if (result === VEHICLE_NOT_FOUND) {
    console.log(`Registration number ${vehicleNumber} not found`);
    return;
  }
  const fee = result.getVehicle().getTicket().setDuration(durationUntil).calcFee();
  console.log(`Registration number ${result.getVehicle().getRegisteredNumber()} with Slot Number ${result.getId()} is free with Charge ${fee}`);
};

module.exports = {
  createParkingLot,
  park,
  status,
  unpark,
};
