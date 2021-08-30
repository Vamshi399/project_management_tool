/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import Table from './table';
import ProjectTable from './projecttable';
import Form from './Form';
import Modal from './Modal';
// eslint-disable-next-line no-unused-vars
import Cookies from 'js-cookie';
import Marquee from 'react-text-marquee';


import { FaPlusCircle } from "react-icons/fa";

import ActionProvider from "./ActionProvider";
import MessageParser from "./MessageParser";
import config from "./config";
import Chatbot from "react-chatbot-kit";
class App1 extends Component {
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
    this.props = {
      Pname: '', item: []
    }
    this.onSubmit = this.onSubmit.bind(this);
    // document.getElementById("chatBot").firstChild.innerText="Vamshi";
    // document.getElementsByClassName("App1").
    // document.querySelector(".react-chatbot-kit-chat-header").innerText="Vamshi";
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


    requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },

    };
    response = await fetch('http://localhost:8000/tasks/project', requestOptions);
    data = await response.json();
    this.setState({ projects: data });
    this.state.roles = Cookies.get('roles');
  }



  onSubmit = (e) => {
    const Pname = prompt('Please enter Project name')
    this.setState({ enteredName: Pname });
    // addProject();

    var request = {
      name: Pname,
      creator: Cookies.get("username")
    }
    console.log(JSON.stringify(request));
    fetch('http://localhost:8000/details/project', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-Type': 'application/json;charset=UTF-8'
      },
      // We convert the React state to JSON and send it as the POST body
      body: JSON.stringify(request)
      
    }).then(function (response) {
      console.log(response)
      if (response.ok) {
        // <Redirect to="/dashboard.jsx"/>;
        alert('New Project Added!!');
        console.log(Pname);
        window.location.reload();
      }
      return response.json();
    });

    // event.preventDefault();


    // let item = [...this.state.item];
    // item.push({
    //   Pname: this.state.Pname});


  }

  openModalHandler = () => {
    this.setState({
      isShowing: true
    });
  }

  closeModalHandler = () => {
    this.setState({
      isShowing: false
    });
  }


  handleFormSubmit = (e) => {
    e.preventDefault();

    let items = [...this.state.items];

    items.push({
      Pname: this.state.Pname,
      taskname: this.state.taskname,
      MName: this.state.MName,
      Status: this.state.Status
    });

    this.setState({
      items,
      Pname: "",
      taskname: "",
      MName: "",
      Status: ""
    });
  };

  handleInputChange = (e) => {
    let input = e.target;
    let name = e.target.name;
    let value = input.value;

    this.setState({
      [name]: value
    })
  };



  render() {
    var isFetching;
    if (this.state.items == null || this.state.projects == null) {
      isFetching = true;
    }
    else {
      isFetching = false;
    }

    // const { isFetching } = this.state;
    console.log("vamshi");
    var roles = Cookies.get('roles');
    var uname = Cookies.get('username');
    if (roles === 'client') {
      return (
        <div className="App1">
          {isFetching ? (
            <div>Loading...</div>
          ) : (
              <div className="Project">
                <div className="Project1">
                  <Table items={this.state.items} />
                  <Modal
                    className="modal"
                    show={this.state.isShowing}
                    close={this.closeModalHandler}>
                    <Form
                      handleFormSubmit={this.handleFormSubmit}
                      handleInputChange={this.handleInputChange}
                      project={this.state.Pname}
                      title={this.state.title}
                      assignee={this.state.MName}
                      details={this.state.details}
                      finish_date={this.state.finish_date}
                      complete={this.state.complete}
                      assigned_by={Cookies.get("username")}
                    //newStatus={ this.state.Status } 
                    />
                  </Modal>
                </div>
              </div>)}<div className="bot"><Chatbot
          config={config}
          actionProvider={ActionProvider}
          messageParser={MessageParser}
        />
        </div>
        </div>
      )
    }
    else if(roles==='manager'){
      return (
        <div className="App1">
         
          {isFetching ? (
            <div>Loading...</div>
          ) : (
              <div className="Project">
                <ProjectTable projects={this.state.projects} ></ProjectTable>
                <form className="add"><b>Add New Project : </b>
                  <button className="button" onClick={this.onSubmit}> <FaPlusCircle size="2em" /></button>
                </form>
                <div className="Project1">
                  <Table items={this.state.items} />
                  <button className="open-modal-btn" onClick={this.openModalHandler}>Add task</button>
                  <Modal
                    className="modal"
                    show={this.state.isShowing}
                    close={this.closeModalHandler}>
                    <Form
                      handleFormSubmit={this.handleFormSubmit}
                      handleInputChange={this.handleInputChange}
                      project={this.state.Pname}
                      title={this.state.title}
                      assignee={this.state.MName}
                      details={this.state.details}
                      finish_date={this.state.finish_date}
                      complete={this.state.complete}
                      assigned_by={Cookies.get("username")}
                    //newStatus={ this.state.Status } 
                    />
                  </Modal>
                  <div className="bot">
              <Chatbot
          config={config}
          actionProvider={ActionProvider}
          messageParser={MessageParser}
          id="chatBot"
        /></div>
                </div>
              </div>)}
              
        </div>
      )
    }
    else if(roles==='teammember'){
      return (
        <div className="App1">
         
          {isFetching ? (
            <div>Loading...</div>
          ) : (
              <div className="Project">
                <div className="Project1">
                <Table items={this.state.items} />
                  <Modal
                    className="modal"
                    show={this.state.isShowing}
                    close={this.closeModalHandler}>
                    <Form
                      handleFormSubmit={this.handleFormSubmit}
                      handleInputChange={this.handleInputChange}
                      project={this.state.Pname}
                      title={this.state.title}
                      assignee={this.state.MName}
                      details={this.state.details}
                      finish_date={this.state.finish_date}
                      complete={this.state.complete}
                      assigned_by={Cookies.get("username")}
                    />
                  </Modal>
                  <div className="bot"><Chatbot
          config={config}
          actionProvider={ActionProvider}
          messageParser={MessageParser}
        />
        </div>
                </div>
              </div>)} </div>
      )
    }
    else{
      return (<div></div>);
    };
  }
}

export default App1;