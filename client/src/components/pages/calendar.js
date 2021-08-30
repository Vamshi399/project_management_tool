/* eslint-disable no-unused-vars */
import React, {useState} from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import AddToCalendar from 'react-add-to-calendar';


let textInput = React.createRef();

function CalendarF() {
  const [text, setText] = useState('');
  const [value, onChange] = useState(new Date());
  function handleClick(e) {
    e.preventDefault();
    console.log(textInput.current.value);
    var text=textInput.current.value;
    
  }
  return (
    
    <div className="cal">
      <h2>Calendar:</h2>
    <Calendar
      onChange={onChange}
      value={value}
    /><br/><br/>
    <div><h3>Notes:</h3>
    <textarea className="area" ref={textInput}>
    Enter text here
    </textarea>
    <button className="button" onClick={handleClick}>Add Note</button>
    </div>
    <h4>{text}</h4>
  </div>
  
  
  );
}

export default CalendarF;


