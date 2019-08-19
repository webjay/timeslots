const { deepStrictEqual, strictEqual } = require('assert');
const mergeDates = require('../lib/merge-dates');
const availability = require('../lib/availability');

const start = new Date('2019-08-10T08:00:00.000Z');
const end = new Date('2019-08-10T16:00:00.000Z');
const timespan = 30 * 60;

const tests = [
  {
    name: 'date obj',
    input: [
      {
        start: new Date('2019-08-10T12:00:00+02:00'),
        end: new Date('2019-08-10T14:00:00+02:00'),
      },
      {
        start: '2019-08-10T13:00:00+02:00',
        end: '2019-08-10T15:00:00+02:00',
      },
    ],
    expected: [
      {
        start: new Date('2019-08-10T10:00:00.000Z'),
        end: new Date('2019-08-10T13:00:00.000Z'),
      },
    ],
    availabilityCount: (8 * 2) - ((13 - 10) * 2),
  },
  {
    name: 'extend before',
    input: [
      {
        start: '2019-08-10T10:00:00.000Z',
        end: '2019-08-10T12:00:00.000Z',
      },
      {
        start: '2019-08-10T09:00:00.000Z',
        end: '2019-08-10T12:00:00.000Z',
      },
    ],
    expected: [
      {
        start: new Date('2019-08-10T09:00:00.000Z'),
        end: new Date('2019-08-10T12:00:00.000Z'),
      },
    ],
    availabilityCount: (8 * 2) - ((12 - 9) * 2),
  },
  {
    name: 'extend after',
    input: [
      {
        start: '2019-08-10T12:00:00+02:00',
        end: '2019-08-10T14:00:00+02:00',
      },
      {
        start: '2019-08-10T13:00:00+02:00',
        end: '2019-08-10T15:00:00+02:00',
      },
    ],
    expected: [
      {
        start: new Date('2019-08-10T10:00:00.000Z'),
        end: new Date('2019-08-10T13:00:00.000Z'),
      },
    ],
    availabilityCount: (8 * 2) - ((13 - 10) * 2),
  },
  {
    name: 'extend before and after',
    input: [
      {
        start: '2019-08-10T10:00:00.000Z',
        end: '2019-08-10T11:00:00.000Z',
      },
      {
        start: '2019-08-10T09:00:00.000Z',
        end: '2019-08-10T12:00:00.000Z',
      },
    ],
    expected: [
      {
        start: new Date('2019-08-10T09:00:00.000Z'),
        end: new Date('2019-08-10T12:00:00.000Z'),
      },
    ],
    availabilityCount: (8 * 2) - ((12 - 9) * 2),
  },
  {
    name: 'no overlap',
    input: [
      {
        start: '2019-08-10T10:00:00.000Z',
        end: '2019-08-10T11:00:00.000Z',
      },
      {
        start: '2019-08-10T12:00:00.000Z',
        end: '2019-08-10T13:00:00.000Z',
      },
    ],
    expected: [
      {
        start: new Date('2019-08-10T10:00:00.000Z'),
        end: new Date('2019-08-10T11:00:00.000Z'),
      },
      {
        start: new Date('2019-08-10T12:00:00.000Z'),
        end: new Date('2019-08-10T13:00:00.000Z'),
      },
    ],
    availabilityCount: (8 * 2) - ((11 - 10) * 2) - ((13 - 12) * 2),
  },
  {
    name: 'extend after twice',
    input: [
      {
        start: '2019-08-10T12:00:00.000Z',
        end: '2019-08-10T14:00:00.000Z',
      },
      {
        start: '2019-08-10T12:00:00.000Z',
        end: '2019-08-10T15:00:00.000Z',
      },
      {
        start: '2019-08-10T12:00:00.000Z',
        end: '2019-08-10T16:00:00.000Z',
      },
    ],
    expected: [
      {
        start: new Date('2019-08-10T12:00:00.000Z'),
        end: new Date('2019-08-10T16:00:00.000Z'),
      },
    ],
    availabilityCount: (8 * 2) - ((16 - 12) * 2),
  },
  {
    name: 'event end overlap',
    input: [
      {
        start: '2019-08-10T10:00:00.000Z',
        end: '2019-08-10T10:45:00.000Z',
      },
    ],
    expected: [
      {
        start: new Date('2019-08-10T10:00:00.000Z'),
        end: new Date('2019-08-10T10:45:00.000Z'),
      },
    ],
    availabilityCount: (8 * 2) - 2,
  },
];

describe('Merge dates', () => tests.forEach((test) => {
  it(test.name, () => deepStrictEqual(mergeDates(test.input), test.expected));
}));

describe('Availability', () => tests.forEach((test) => {
  it(test.name, () => {
    const availArray = availability(start, end, timespan, mergeDates(test.input));
    // console.log(availArray);
    return strictEqual(availArray.length, test.availabilityCount);
  });
}));
