import { isLeapYear } from "./date";

test("Confirms valid leap years", () => {
  const validLeapYears = [2000, 2004, 2008, 2012, 2400];
  validLeapYears.forEach((year) => expect(isLeapYear(year)).toBe(true));
});

test("Confirms the following are NOT valid leap years", () => {
  const invalidLeapYears = [2001, 2100];
  invalidLeapYears.forEach((year) => expect(isLeapYear(year)).toBe(false));
});
