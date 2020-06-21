import React, { useState } from 'react';
import { buildCalendarData, weekDayNames, timestamp, monthNames } from './date';
import { cls } from './util';
import './Calendar.scss';

interface ICalendarProps {
  miniature?: boolean; //Sets base font to 12px for miniature view
}

export const Calendar = (props: ICalendarProps) => {
  const now = new Date();
  const today = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
  const [selected, setSelected] = useState(today.getTime());
  const [year, month] = [today.getUTCFullYear(), today.getUTCMonth()];
  const [calendarGridCells, startOfMonthTimestamp, endOfMonthTimestamp] = buildCalendarData(year, month);

  return (
    <div className="calendar" style={props.miniature ? {fontSize: `${12}px`} : {} }>
      <div className="calendar-month-header">{monthNames[today.getUTCMonth()] + " " +today.getUTCFullYear()}</div>
        {weekDayNames.map(i =>
          <div className="calendar-dayname-cell" key={i}>
            {i}
          </div>
        )}

      {
        calendarGridCells.map((i : Array<timestamp>)  => (
            i.map((j: timestamp) => 
                <CalendarCell
                setSelected={(j) => setSelected(j)}
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
  notInMonth: boolean;
  date: timestamp;
  setSelected: (i: timestamp) => void;
}

const CalendarCell = (props: ICalendarCellProps) => {
  const { date, notInMonth, selected, setSelected } = props;
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (notInMonth) return;
    setSelected(date);
  }

  return <div onClick={handleClick} className={cls("calendar-cell", selected && "selected", notInMonth && "not-in-month")}>
    <span>{new Date(date).getUTCDate()}</span>
  </div>
}