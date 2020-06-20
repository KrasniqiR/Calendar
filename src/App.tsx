import React, {useState} from 'react';
import './App.css';
import { buildDaysInMonth, weekDayNames, timestamp } from './date';

const Calendar = () => {
  const now = new Date();
  const today = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
  const [selected, setSelected] = useState(today.getTime())
  const [year, month] = [today.getUTCFullYear(), today.getUTCMonth()];
  const calendarGridCells = buildDaysInMonth(year, month);

  return (
    <div className="calendar">
      <div className="calendar-header-row">
        {weekDayNames.map(i => 
        <div className="calendar-header-cell" key={i}>
          {i}
          </div>
          )}
      </div>

          {
            calendarGridCells.map(i => (
              <div className="calendar-row"> 
                {
                i.map((j : timestamp) => <CalendarCell setSelected={(j) => setSelected(j)} date={j} key={j} isSelected={selected == j}/>)}
              </div>
            ))
          }
    </div>
  )
}

const CalendarCell = (props: { isSelected: boolean, date: number, setSelected: (t: timestamp) => void; }) => {

  const handleClick = (e : any) => {
    e.preventDefault();
    props.setSelected(props.date);
  }
  return <div onClick={handleClick} className={"calendar-cell" + (props.isSelected ? " selected" : "")}>{new Date(props.date).getUTCDate()}</div>
}

function App() {
  return (
    <div className="App">
      <Calendar />
    </div>
  );
}



export default App;
