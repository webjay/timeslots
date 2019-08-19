function dateClone(date) {
  return new Date(date);
}

function dateExtend(date, timespan) {
  date.setTime(date.getTime() + (timespan * 1000));
}

function eventOverlap(timeslotStart, { start, end }) {
  return timeslotStart >= start && timeslotStart < end;
}

function availability(start, end, timespan, eventsArray) {
  const timeslotStart = dateClone(start);
  const timeslotEnd = dateClone(start);
  dateExtend(timeslotEnd, timespan);
  const eventOverlapFn = eventOverlap.bind(null, timeslotStart);
  const availArray = [];
  while (timeslotStart < end) {
    const found = eventsArray.some(eventOverlapFn);
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
