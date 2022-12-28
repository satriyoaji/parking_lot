class Ticket {
  /**
     * Represents a ticket
     * @constructor
     */
  constructor(duration = 0, billing = 'basic') {
    this._duration = duration;
    this._billing = billing;
  }

  /**
     * Update duration on a ticket
     * @method
     * @param {number} until - hours parked
     */
  setDuration(until) {
    this._duration = until;
    return this;
  }

  /**
     * Get duration from ticket
     * @method
     * @returns {number} - hours parked
     */
  getDuration() {
    return this._duration;
  }

  /**
     * Calculate cost on checkout
     * @method
     * @returns {number} - money
     */
  calcFee() {
    if (this._billing === 'basic') {
      return this.basicPayment();
    }
    return 0;
  }

  /**
     * Simple algo to calculate cost
     * @method
     * @returns {number} - money
     */
  basicPayment() {
    const baseFee = 10;
    const recurFee = 10;
    const extraHours = this.getDuration() - 2;
    return extraHours <= 0 ? baseFee : baseFee + extraHours * recurFee;
  }
}

module.exports = Ticket;
