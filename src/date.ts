const DAY_MS = 86400000;
const today = setZeroTime(new Date());
const currentYear = today.getUTCFullYear();
const currentMonth0 = today.getUTCMonth();
const currentDate = today.getUTCDate();
const currentDay0 = today.getUTCDay();
const year = currentYear;

/* For coherence */
function setZeroTime(date) {
  date.setUTCHours(0);
  date.setUTCMinutes(0);
  date.setUTCSeconds(0);
  date.setUTCMilliseconds(0);
  return date;
}

const daysInMonth = [
  31,
  isLeapYear(year) ? 29 : 28,
  31,
  30,
  31,
  30,
  31,
  31,
  30,
  31,
  30,
  31,
];

function buildDaysInMonth() {
  const today1 = setZeroTime(new Date());
  today1.setUTCDate(1);
  const day0 = today1.getUTCDay();
  const firstDayOfMonth = new Date(
    today1.getUTCFullYear(),
    today1.getUTCMonth(),
    1
  );
  console.log(today1.getUTCDay());
  const calendarDataGrid = day0 > 0 ? [...new Array(day0 + 2)] : [];

  const daysInThisMonth = daysInMonth[currentMonth0];

  let timestamp = firstDayOfMonth.getTime();

  calendarDataGrid.push(timestamp);

  for (let i = 1; i < daysInThisMonth; i++) {
    timestamp += DAY_MS;
    calendarDataGrid.push(timestamp);
  }

  const finalDate = new Date(timestamp);
  const finalDayOfMonth = new Date(timestamp).getDay();
  console.log(finalDate);
  if (finalDayOfMonth !== 6) {
    Array.prototype.push.call(
      calendarDataGrid,
      ...new Array(6 - finalDayOfMonth)
    );
  }

  return calendarDataGrid;
}

console.log(buildDaysInMonth());
const dateMap = buildDaysInMonth().map((i) => new Date(i).getDate());
console.log(dateMap);

const weekNames = ["Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"];

function isLeapYear(year) {
  if (year % 4 !== 0) return false;
  if (year % 100 == 0 && year % 400 !== 0) return false;
  return true;
}

console.log(today);
