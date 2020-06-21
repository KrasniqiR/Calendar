import { splitChunks } from "./util";
export type timestamp = number;

const dayMs = 86400000;
export const weekDayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
export const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

/**
 * Returns a calender grid and timestamps of the first and last days of the month for the given month and year with Monday as the first day in each week
 * @param year * @param month 
 */
export function buildCalendarData(year: number, month: number): [Array<Array<timestamp>>, timestamp, timestamp] {
  const daysInMonth: number[] = [31, isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const daysInSelectedMonth = daysInMonth[month];
  const monthDay1Date = new Date(Date.UTC(year, month));
  const monthDay1Weekday = zeroMondayMap(monthDay1Date.getUTCDay());

  const calendarDays = [];

  // If month starts mid-week, prepend timestamps to Monday 
  if (monthDay1Weekday > 0) {
    let timestampToReverse = monthDay1Date.getTime();
    for (let i = monthDay1Weekday; i > 0; i--) {
      timestampToReverse -= dayMs;
      calendarDays.unshift(timestampToReverse);
    }
  }

  let timestamp = monthDay1Date.getTime();
  calendarDays.push(timestamp);

  for (let i = 1; i < daysInSelectedMonth; i++) {
    timestamp += dayMs;
    calendarDays.push(timestamp);
  }

  const endOfMonthDate = new Date(timestamp);
  const finalDayOfMonth = zeroMondayMap(endOfMonthDate.getUTCDay());

  if (finalDayOfMonth < 6) {
    for (let i = finalDayOfMonth; i < 6; i++) {
      timestamp += dayMs;
      calendarDays.push(timestamp)
    }
  }

  return [splitChunks(calendarDays, 7), monthDay1Date.getTime(), endOfMonthDate.getTime()];
}


export function isLeapYear(year: number): boolean {
  if (year % 4 !== 0 || (year % 100 == 0 && year % 400 !== 0)) return false;
  return true;
}


/**
 * Remaps weekday index Sunday0 to Monday0 index
 * @param i Sunday0 index
 */
export function zeroMondayMap(i: number) {
  const mappedIndexes = [6, 0, 1, 2, 3, 4, 5];
  return mappedIndexes[i];
}