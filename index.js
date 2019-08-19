const mergeDates = require('./lib/merge-dates');
const availability = require('./lib/availability');

function findAvailability(start, end, dateStringsArray) {
  return availability(start, end, mergeDates(dateStringsArray));
}

module.exports = findAvailability;
