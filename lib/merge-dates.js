// eslint-disable-next-line max-len
/* eslint no-param-reassign: ["error", { "props": true, "ignorePropertyModificationsFor": ["intervals"] }] */

function reducer(intervals, { start: startInput, end: endInput }) {
  function someCallback({ start, end }, index) {
    // no overlap?
    if (endInput < start) {
      return false;
    }
    let extended = false;
    // extend after?
    if (startInput < end && endInput > end) {
      intervals[index].end = endInput;
      extended = true;
    }
    // extend before?
    if (startInput < start && endInput > start) {
      intervals[index].start = startInput;
      extended = true;
    }
    return extended;
  }
  const found = intervals.some(someCallback);
  if (found === false) {
    intervals.push({ start: startInput, end: endInput });
  }
  return intervals;
}

function mergeDates(eventsArray) {
  return eventsArray.reduce(reducer, []);
}

module.exports = mergeDates;
