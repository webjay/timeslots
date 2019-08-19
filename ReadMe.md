# timeslot-availability

Find availability around events

    npm install timeslot-availability

Given events, which it will merge, it will find availability in a timeframe.


    const availability = require('./');

    const start = new Date('2019-08-08T08:00:00.000Z');
    const end = new Date('2019-08-08T16:00:00.000Z');
    const timespan = 30 * 60; // 30 minutes

    const siestas = [
      {
        start: '2019-08-08T09:00:00.000Z',
        end: '2019-08-08T12:00:00.000Z',
      },
      {
        start: '2019-08-08T10:00:00.000Z',
        end: '2019-08-08T12:00:00.000Z',
      },
      {
        start: '2019-08-08T13:00:00.000Z',
        end: '2019-08-08T14:00:00.000Z',
      },
    ];

    const bookable = availability(start, end, timespan, siestas);

    // eslint-disable-next-line no-console
    console.log(bookable);

    [ 
      { start: 2019-08-08T08:00:00.000Z,
        end: 2019-08-08T08:30:00.000Z },
      { start: 2019-08-08T08:30:00.000Z,
        end: 2019-08-08T09:00:00.000Z },
      { start: 2019-08-08T12:00:00.000Z,
        end: 2019-08-08T12:30:00.000Z },
      { start: 2019-08-08T12:30:00.000Z,
        end: 2019-08-08T13:00:00.000Z },
      { start: 2019-08-08T14:00:00.000Z,
        end: 2019-08-08T14:30:00.000Z },
      { start: 2019-08-08T14:30:00.000Z,
        end: 2019-08-08T15:00:00.000Z },
      { start: 2019-08-08T15:00:00.000Z,
        end: 2019-08-08T15:30:00.000Z },
      { start: 2019-08-08T15:30:00.000Z,
        end: 2019-08-08T16:00:00.000Z } 
    ]
