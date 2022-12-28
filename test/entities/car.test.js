const test = require('ava');
const Car = require('../../src/entities/vehicles/car');
const Vehicle = require('../../src/entities/vehicles/vehicle');
const Ticket = require('../../src/entities/tickets/ticket');

test('car methods', (t) => {
  const car = new Car('AA-123');
  t.is(car.getRegisteredNumber(), 'AA-123');
  t.is(car.getTicket(), null);

  const newTicket = new Ticket(8, 'rand');
  car.setTicket(newTicket);
  t.is(car.getTicket(), newTicket);
});

test('car inheritance', (t) => {
  const car = new Car('ZZ-123');
  t.truthy(car instanceof Car);
  t.truthy(car instanceof Vehicle);
});
