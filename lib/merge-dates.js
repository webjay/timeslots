function dateStrToDateObj(startStr, endStr) {
  return {
    start: new Date(startStr),
    end: new Date(endStr),
  };
}

function reducer(intervals, { start: startStr, end: endStr }) {
  const { start, end } = dateStrToDateObj(startStr, endStr);
  const found = intervals.some(({ start: iStart, end: iEnd }, index) => {
    // no overlap?
    if (end < iStart) {
      return false;
    }
    let extended = false;
    // extend after?
    if (start < iEnd && end > iEnd) {
      // eslint-disable-next-line no-param-reassign
      intervals[index].end = end;
      extended = true;
    }
    // extend before?
    if (start < iStart && end > iStart) {
      // eslint-disable-next-line no-param-reassign
      intervals[index].start = start;
      extended = true;
    }
    return extended;
  });
  if (found === false) {
    intervals.push({ start, end });
  }
  return intervals;
}

function mergeDates(dateStringsArray) {
  return dateStringsArray.reduce(reducer, []);
}

module.exports = mergeDates;
