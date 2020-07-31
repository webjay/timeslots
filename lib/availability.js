function dateClone(val) {
  return new Date(val);
}

function toDate(val) {
  if (val instanceof Date) return val;
  return new Date(val);
}

function dateExtend(date, timespanMS) {
  date.setTime(date.getTime() + timespanMS);
}

function availability(start, end, timespan, eventsArray) {
  const timespanMS = timespan * 1000;
  const timeslotStart = dateClone(start);
  const timeslotEnd = dateClone(start);
  dateExtend(timeslotEnd, timespanMS);
  function eventOverlap({ start: start2, end: end2 }) {
    return timeslotStart >= toDate(start2) && timeslotStart < toDate(end2);
  }
  const availArray = [];
  while (timeslotStart < toDate(end)) {
    const found = eventsArray.some(eventOverlap);
    if (found === false) {
      availArray.push({
        start: dateClone(timeslotStart),
        end: dateClone(timeslotEnd),
      });
    }
    dateExtend(timeslotStart, timespanMS);
    dateExtend(timeslotEnd, timespanMS);
  }
  return availArray;
}

module.exports = availability;
