const Vehicle = require('./vehicle');
const { vehicleType } = require('../constants');

class Car extends Vehicle {
  /**
     * Represents a car.
     * @constructor
     * @param {string} carSign - number plate registration
     * @param {string} color - default is black
     */
  constructor(carSign, color = 'black', ticket = null) {
    super(carSign, color, vehicleType.CAR, ticket);
  }
}

module.exports = Car;
