const { abstractClassError } = '../../errors';
/**
 * Vehicle is a less specific class of car
 * Can put common behaviours in it
 */
class Vehicle {
  /**
     * Represents a vehicle.
     * @constructor
     * @param {string} registeredNumber
     * @param {string} color
     * @param {string} type
     * @param {object} ticket
     */
  constructor(registeredNumber, color, type, ticket = null) {
    if (new.target === Vehicle) {
      abstractClassError();
    }
    this._registeredNumber = registeredNumber;
    this._color = color;
    this._type = type;
    this._ticket = ticket;
  }

  /**
     * Attach ticket to a vehicle
     * @method
     * @param {Ticket} ticket
     * @returns {Vehicle}
     */
  setTicket(ticket) {
    this._ticket = ticket;
    return this;
  }

  /**
     * Get ticket attached to a vehicle
     * @method
     * @returns {Ticket}
     */
  getTicket() {
    return this._ticket;
  }

  /**
     * Get registration number of a vehicle
     * @method
     * @returns {string}
     */
  getRegisteredNumber() {
    return this._registeredNumber;
  }
}

module.exports = Vehicle;
