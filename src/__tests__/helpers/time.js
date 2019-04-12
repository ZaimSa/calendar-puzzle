import { timeToMinute } from '../../helpers/time';

describe('[Helpers][time]', () => {
  test('[timeToMinute] Convert time with undefined value', () => {
    expect(timeToMinute).toThrow();
  })
  test('[timeToMinute] Convert time with correct value', () => {
    expect(timeToMinute('17:20')).toEqual(500);
  })
})
