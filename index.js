const mergeDates = require('./lib/merge-dates');
const availability = require('./lib/availability');

function findAvailability(start, end, timespan, eventsArray) {
  return availability(start, end, timespan, mergeDates(eventsArray));
}

module.exports = findAvailability;
