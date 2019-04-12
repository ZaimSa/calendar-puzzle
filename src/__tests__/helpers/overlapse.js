import { checkOverlapsed, createOverlapsedArray } from '../../helpers/overlapse';
import moment from 'moment';

describe('[Helpers][overlapse]', () => {
  test('[checkOverlapsed] Check overlapsed with undefined array', () => {
    const eventArray = undefined;
    const eventStart = moment('17:20', 'HH:mm');
    const eventEnd = moment('18:00', 'HH:mm');
    expect(checkOverlapsed(eventArray, eventStart, eventEnd)).toBeFalsy();
  })
  test('[checkOverlapsed] Check overlapsed with empty array', () => {
    const eventArray = [];
    const eventStart = moment('17:20', 'HH:mm');
    const eventEnd = moment('18:00', 'HH:mm');
    expect(checkOverlapsed(eventArray, eventStart, eventEnd)).toBeFalsy();
  })
  test('[checkOverlapsed] Check overlapsed event with event bounds between', () => {
    const eventArray = [{
        "id": 1,
        "start": "17:00",
        "duration": 60
    }];
    const eventStart = moment('17:20', 'HH:mm');
    const eventEnd = moment('18:00', 'HH:mm');
    expect(checkOverlapsed(eventArray, eventStart, eventEnd)).toBeTruthy();
  })
  test('[checkOverlapsed] Check overlapsed event with overlapseEvent bounds between', () => {
    const eventArray = [{
        "id": 1,
        "start": "17:00",
        "duration": 60
    }];
    const eventStart = moment('16:00', 'HH:mm');
    const eventEnd = moment('19:00', 'HH:mm');
    expect(checkOverlapsed(eventArray, eventStart, eventEnd)).toBeTruthy();
  })
  test('[checkOverlapsed] Check not overlapsed event', () => {
    const eventArray = [{
        "id": 1,
        "start": "09:00",
        "duration": 60
    }];
    const eventStart = moment('17:20', 'HH:mm');
    const eventEnd = moment('18:00', 'HH:mm');
    expect(checkOverlapsed(eventArray, eventStart, eventEnd)).toBeFalsy();
  })
  test('[createOverlapsedArray] Create overlapsed array with undefined events array', () => {
    const eventArray = undefined;
    expect(createOverlapsedArray(eventArray)).toEqual([]);
  })
  test('[createOverlapsedArray] Create overlapsed array with empty array', () => {
    const eventArray = [];
    expect(createOverlapsedArray(eventArray)).toEqual([]);
  })
  test('[createOverlapsedArray] Create overlapsed array with one event', () => {
    const eventArray = [{
        "id": 1,
        "start": "09:00",
        "duration": 60
    }];
    expect(createOverlapsedArray(eventArray)).toEqual([
      [{
        "id": 1,
        "start": "09:00",
        "duration": 60
      }]
    ]);
  })
  test('[createOverlapsedArray] Create overlapsed array with multiple event and no overlapse', () => {
    const eventArray = [
      {
        "id": 1,
        "start": "09:00",
        "duration": 60
      },
      {
        "id": 2,
        "start": "11:00",
        "duration": 60
      },
      {
        "id": 2,
        "start": "13:00",
        "duration": 60
      }];
    expect(createOverlapsedArray(eventArray)).toEqual([
      [
        {
          "id": 1,
          "start": "09:00",
          "duration": 60
        },
        {
          "id": 2,
          "start": "11:00",
          "duration": 60
        },
        {
          "id": 2,
          "start": "13:00",
          "duration": 60
        }
      ]
    ]);
  })
  test('[createOverlapsedArray] Create overlapsed array with multiple event and one level overlapse', () => {
    const eventArray = [
      {
        "id": 1,
        "start": "09:00",
        "duration": 60
      },
      {
        "id": 2,
        "start": "11:00",
        "duration": 60
      },
      {
        "id": 2,
        "start": "11:20",
        "duration": 60
      },
      {
        "id": 2,
        "start": "13:00",
        "duration": 60
      }];
    expect(createOverlapsedArray(eventArray)).toEqual([
      [
        {
          "id": 1,
          "start": "09:00",
          "duration": 60
        },
        {
          "id": 2,
          "start": "11:00",
          "duration": 60
        },
        {
          "id": 2,
          "start": "13:00",
          "duration": 60
        }
      ],
      [
        {
          "id": 2,
          "start": "11:20",
          "duration": 60
        }
      ]
    ]);
  })
  test('[createOverlapsedArray] Create overlapsed array with multiple event and two level overlapse', () => {
    const eventArray = [
      {
        "id": 1,
        "start": "09:00",
        "duration": 60
      },
      {
        "id": 2,
        "start": "11:00",
        "duration": 60
      },
      {
        "id": 2,
        "start": "11:20",
        "duration": 60
      },
      {
        "id": 2,
        "start": "11:10",
        "duration": 60
      },
      {
        "id": 2,
        "start": "13:00",
        "duration": 60
      }];
    expect(createOverlapsedArray(eventArray)).toEqual([
      [
        {
          "id": 1,
          "start": "09:00",
          "duration": 60
        },
        {
          "id": 2,
          "start": "11:00",
          "duration": 60
        },
        {
          "id": 2,
          "start": "13:00",
          "duration": 60
        }
      ],
      [
        {
          "id": 2,
          "start": "11:20",
          "duration": 60
        }
      ],
      [
        {
          "id": 2,
          "start": "11:10",
          "duration": 60
        }
      ]
    ]);
  })
})
