function dateClone(val) {
  return new Date(val);
}

function toDate(val) {
  if (val instanceof Date) return val;
  return new Date(val);
}

function dateExtend(date, timespan) {
  date.setTime(date.getTime() + (timespan * 1000));
}

function availability(start, end, timespan, eventsArray) {
  const timeslotStart = dateClone(start);
  const timeslotEnd = dateClone(start);
  dateExtend(timeslotEnd, timespan);
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
    dateExtend(timeslotStart, timespan);
    dateExtend(timeslotEnd, timespan);
  }
  return availArray;
}

module.exports = availability;
