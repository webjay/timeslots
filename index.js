const mergeDates = require('./lib/merge-dates');
const availability = require('./lib/availability');

function findAvailability(start, end, timespan, dateStringsArray) {
  return availability(start, end, timespan, mergeDates(dateStringsArray));
}

module.exports = findAvailability;
