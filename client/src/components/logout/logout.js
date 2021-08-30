/* eslint-disable no-unused-vars */
import React, { component } from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
// import "./style.scss";
import Cookies from 'js-cookie';
import { Redirect } from 'react-router-dom';
import { BrowserRouter, Route } from 'react-router-dom'
import $ from 'jquery';
class Logout extends React.Component {
  
  constructor(props) {
      console.log("inside constructor");
    super(props);
    this.state = {
      user: {
        username: "",
        password: "",
        email: "",
        access_token: ""
      },
      roles: "manager",
      isUserActive: true
    }
  }
  componentDidMount() {
    console.log("componentDidUpdate");
    this.state.user.roles = "";
    // eslint-disable-next-line react/no-direct-mutation-state
    this.state.user.email = "";
    this.state.user.username = Cookies.get('username');
    this.state.user.access_token = Cookies.get('access_token');
    //https://testapi.io/api/vamshi399/login
    //http://localhost:8000/token-auth/
    //https://testapi.io/api/Akhila/task
    fetch('https://testapi.io/api/vamshi399/project', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-Type': 'application/json;charset=UTF-8'
      },
      body: JSON.stringify(this.state.user)
    }).then(function (response) {
        console.log(response)
        if (response.ok) {
            window.isUserLoggedIn = false;
            Cookies.remove('access_token');
            Cookies.remove('username');
            Cookies.remove('user');
            Cookies.remove('token');
            Cookies.remove('roles');
            //Cookies.set('refresh_token', tokens.refresh_token)
            console.log("User loggedout successfully");
            console.log(window.location.href);
            // window.location.href='http://localhost:3000; return false';
            alert('User loggedout successfully!!');
            window.location.href='http://'+ window.location.host;
            // console.log(window.location.href);
            // window.location.reload();
            
            // <Redirect to="/"/>;
            // this.props.history.push("/")
        }
        return response.json();
      });

    // event.preventDefault();
  }

  render() {
    return (
      <logout className="login">LoggedOut Successfully</logout>
    );
  }
}

export default Logout;
