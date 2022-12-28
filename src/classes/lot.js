const Level = require('./levels/level');
const Spot = require('./spots/spot');

const { PARKING_LOT_FULL, VEHICLE_NOT_FOUND, VEHICLE_ALREADY_PARKED } = require('./constants');

class Lot {
  /**
     * Represents a parking lot
     * @constructor
     * @param {number} numberOfLevels - size of lot
     */
  constructor(numberOfLevels = 1) {
    this._maxSize = numberOfLevels;
    this._levels = [];
    this._regnLevelMap = {};
  }

  getMaxSize() {
    return this._maxSize;
  }

  getCurrentSize() {
    return this._levels.length;
  }

  getLevels() {
    return this._levels;
  }

  /**
   * Adds a level with spots to the lot
   * adds only if number of _levels.length does not exceed _size
   * @param {number} levelSize
   */
  addSpotLevel(levelSize) {
    const spots = (Array(levelSize).fill(1)).map((_, index) => new Spot(index + 1, index + 1));
    if (this.getCurrentSize() < this.getMaxSize()) {
      this._levels.push(new Level(spots, this._levels.length));
    }
  }

  /**
   * checks if the lot is full
   * by checking if each level is full
   */
  isFull() {
    return this._levels.filter((level) => !level.isFull()).length === 0;
  }

  /**
   * @param {string} registeredNumber
   */
  isVehicleInLot(registeredNumber) {
    return this._regnLevelMap[registeredNumber] !== undefined;
  }

  /**
   * @param {string} searchStrategy
   */
  findEmptyLevel(searchStrategy = 'nearest') {
    switch (searchStrategy) {
      case 'nearest': {
        const levelIndex = this._levels.map((level) => level.isFull()).indexOf(false);
        return this._levels[levelIndex];
      }
      default:
        return -1;
    }
  }

  /**
   * @param {Vehic;e} vehicle
   */
  findSpotAndPark(vehicle) {
    if (this.isVehicleInLot(vehicle.getRegisteredNumber())) {
      return VEHICLE_ALREADY_PARKED;
    }
    if (this.isFull()) {
      return PARKING_LOT_FULL;
    }
    const emptyLevel = this.findEmptyLevel();
    const spotId = emptyLevel.findSpotAndPark(vehicle);
    this._regnLevelMap[vehicle.getRegisteredNumber()] = emptyLevel.getId();
    return spotId;
  }

  /**
   * @param {number;e} levelIndex
   */
  getBookedSpotsOfLevel(levelIndex = 0) {
    const bookedSpots = this._levels.map((level) => level.getBookedSpots());
    return bookedSpots[levelIndex];
  }

  /**
   * @param {string} registeredNumber
   */
  findSpotAndVacate(registeredNumber) {
    if (!this.isVehicleInLot(registeredNumber)) {
      return VEHICLE_NOT_FOUND;
    }
    const levelNumber = this._regnLevelMap[registeredNumber];
    const spot = this._levels[levelNumber].findSpotAndVacate(registeredNumber);
    delete this._regnLevelMap[registeredNumber];
    return spot;
  }
}

module.exports = Lot;
