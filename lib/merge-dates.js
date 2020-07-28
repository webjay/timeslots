// eslint-disable-next-line max-len
/* eslint no-param-reassign: ["error", { "props": true, "ignorePropertyModificationsFor": ["intervals"] }] */

function toDate(val) {
  // return new Date(val);
  return val;
}

function reducer(intervals, { start: startInput, end: endInput }) {
  const startDate = toDate(startInput);
  const endDate = toDate(endInput);
  function someCallback({ start, end }, index) {
    // no overlap?
    if (endDate < start) {
      return false;
    }
    let extended = false;
    // extend after?
    if (startDate < end && endDate > end) {
      intervals[index].end = endDate;
      extended = true;
    }
    // extend before?
    if (startDate < start && endDate > start) {
      intervals[index].start = startDate;
      extended = true;
    }
    return extended;
  }
  const found = intervals.some(someCallback);
  if (found === false) {
    // intervals.push({ start: startDate, end: endDate });
    intervals.push({ start: startInput, end: endInput });
  }
  return intervals;
}

function mergeDates(dateStringsArray) {
  return dateStringsArray.reduce(reducer, []);
}

module.exports = mergeDates;
