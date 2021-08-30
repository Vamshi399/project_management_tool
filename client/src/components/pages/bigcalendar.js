  import React, { Component } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);
//const axios = require('axios');
// myEventsList = {}
//const {cal_events} = this.state

class BigCalendar extends Component {
    constructor(props){
        super(props)
    this.state = {
        cal_events: [],
    }
       }
       componentDidMount(){
   
        axios.get('http://127.0.0.1:8000/details/view/task')
      .then(response => {
        
        let appointments = response.data;
        
        for (let i = 0; i < appointments.length; i++) {
          appointments[i].start =    moment.utc(appointments[i].finish_date);
          appointments[i].end = moment.utc(appointments[i].finish_date);
          console.log(appointments[i])
        }
        this.setState({
            cal_events:appointments
        })
  
      })
      .catch(function (error) {
        console.log(error);
      });
       }
 /* state = {
    events: [
      {
        start: moment().toDate(),
        end: moment().add(1, "days").toDate(),
        title: "Some title",
      },
      {
        start: ('2021-03-11'),
        end: ('2021-03-11'),
        title: "task discription",
      },
    ],
  };*/

  onEventResize = (data) => {
    const { start, end } = data;

    this.setState((state) => {
      state.events[0].start = start;
      state.events[0].end = end;
      return { events: [...state.events] };
    });
  };

  onEventDrop = (data) => {
    console.log(data);
  };

  render() {
    const { cal_events } = this.state;
    return (
      <div>
        <DnDCalendar
          defaultDate={moment().toDate()}
          defaultView="month"
         // events={this.state.events}
          events={cal_events}
          localizer={localizer}
          onEventDrop={this.onEventDrop}
          onEventResize={this.onEventResize}
          resizable
          style={{  height: "90vh",width: "180vh",paddingTop:"30vh" ,paddingLeft:"50vh"}}
          
        />
      </div>
    );
  }
}

export default BigCalendar;

