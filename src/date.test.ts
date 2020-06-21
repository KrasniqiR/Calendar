import { isLeapYear, buildCalendarData, zeroMondayMap } from "./date";

test("Confirm the following are valid leap years", () => {
  const validLeapYears = [2000, 2004, 2400];
  validLeapYears.forEach((year) => expect(isLeapYear(year)).toBe(true));
});

test("Confirm the following are NOT valid leap years", () => {
  const invalidLeapYears = [2001, 2100];
  invalidLeapYears.forEach((year) => expect(isLeapYear(year)).toBe(false));
});

test("Zero monday map correctly maps Monday to index 0 and Sunday to index 6", () => {
  expect(zeroMondayMap(1)).toBe(0);
  expect(zeroMondayMap(0)).toBe(6);
});

test("Confirm the calendar grid contains the correct cells for the months 06/2020 and 02/2020", () => {
  const juneDesiredCells = [
    [1, 2, 3, 4, 5, 6, 7],
    [8, 9, 10, 11, 12, 13, 14],
    [15, 16, 17, 18, 19, 20, 21],
    [22, 23, 24, 25, 26, 27, 28],
    [29, 30, 1, 2, 3, 4, 5]
  ];

  const febDesiredCells = [
    [27, 28, 29, 30, 31, 1, 2],
    [3, 4, 5, 6, 7, 8, 9],
    [10, 11, 12, 13, 14, 15, 16],
    [17, 18, 19, 20, 21, 22, 23],
    [24, 25, 26, 27, 28, 29, 1]
  ];

  expect(buildCalendarData(2020, 5)[0].map(i => i.map(j => new Date(j).getUTCDate()) )).toEqual(juneDesiredCells);
  expect(buildCalendarData(2020, 1)[0].map(i => i.map(j => new Date(j).getUTCDate()))).toEqual(febDesiredCells);
})
