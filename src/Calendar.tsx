import React, { useState } from 'react';
import { buildCalendarData, weekDayNames, timestamp, monthNames, setZeroTime } from './date';
import { cls } from './util';
import './Calendar.scss';

interface ICalendarProps {
  miniature?: boolean; //Sets base font to 12px for miniature view
}

export const Calendar = (props: ICalendarProps) => {
  const today = setZeroTime(new Date());
  const [selected, setSelected] = useState(today.getTime());
  const [year, month] = [today.getFullYear(), today.getMonth()];
  const [calendarGridCells, startOfMonthTimestamp, endOfMonthTimestamp] = buildCalendarData(year, month);

  return (
    <div className="calendar" style={props.miniature ? { fontSize: `${12}px` } : {}}>
      <div className="calendar-month-header">{monthNames[today.getMonth()] + " " + today.getFullYear()}</div>
      {weekDayNames.map(i =>
        <div className="calendar-dayname-cell" key={i}>
          {i}
        </div>
      )}

      {
        calendarGridCells.map((i: Array<timestamp>) => (
          i.map((j: timestamp) =>
            <CalendarCell
              setSelected={(j) => setSelected(j)}
              today={j == today.getTime()}
              date={j}
              key={j}
              selected={selected == j}
              notInMonth={j < startOfMonthTimestamp || j > endOfMonthTimestamp}
            />
          )
        ))
      }
    </div>
  )
}

interface ICalendarCellProps {
  selected: boolean;
  today: boolean;
  notInMonth: boolean;
  date: timestamp;
  setSelected: (i: timestamp) => void;
}

const CalendarCell = (props: ICalendarCellProps) => {
  const { date, today, notInMonth, selected, setSelected } = props;
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (notInMonth) return;
    setSelected(date);
  }

  return <div onClick={handleClick} className={cls("calendar-cell", selected && "selected", notInMonth && "not-in-month", today && "today")}>
    <span>{new Date(date).getDate()}</span>
  </div>
}