/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import Table1 from './table1';
import ProjectTable from './projecttable';
import Form from './Form';
import Modal from './Modal';
// eslint-disable-next-line no-unused-vars
import Cookies from 'js-cookie';
import Marquee from 'react-text-marquee';


import { FaPlusCircle } from "react-icons/fa";
class team extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        username: "",
        password: "",
        email: "",
      },
      Pname: '',
      taskname: '',
      MName: '',
      Status: '',
      complete: false,
      items: null,
      projects: null,
      roles: ''
    }
    
  }
  async componentWillMount() {
    // GET request using fetch with async/await
    var requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },

    };
    var response = await fetch('http://localhost:8000/tasks', requestOptions);
    var data = await response.json();
    this.setState({ items: data });
  }



  render() {
      
    var isFetching;
    if (this.state.items == null ) {
      isFetching = true;
    }
    else {
      isFetching = false;
    }

    
      return (
        <div className="team">
            <div style={{color: "black"}}><b><h4>Team members with their current assignments:</h4></b></div>
          {isFetching ? (
            <div>Loading...</div>
          ) : (
              <div className="Project">
                <div className="Project1">
                  <Table1 items={this.state.items} />
                 
                </div>
              </div>)}
        </div>
      )
    
  }
}

export default team;