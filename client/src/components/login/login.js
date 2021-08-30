/* eslint-disable eqeqeq */
/* eslint-disable react/no-direct-mutation-state */
/* eslint-disable no-unused-vars */
import React, { component } from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import "./style.scss";
import Cookies from 'js-cookie';
import { Redirect } from 'react-router-dom';
import { BrowserRouter, Route } from 'react-router-dom'
import $ from 'jquery';
import { Tooltip, OverlayTrigger, Overlay } from 'react-bootstrap';
import { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import DjangoCSRFToken from 'django-react-csrftoken';
// import csrf from django.middleware;
import axios from "axios";
import cookie from "react-cookies";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";

const propTypes = {
  propValues: PropTypes.shape({
    isValidEmail: PropTypes.bool,
  }).isRequired,
  addDangerToast: PropTypes.func.isRequired,
};

class Login extends React.Component {
  // _renderCounter = () => () => {
  //   // const [count, setCount] = useState(0);
  //   const [show, setShow] = useState(false);
  // const target = useRef(null);

  //   // return <div>{ count }</div>
  // }

  constructor(props) {
    super(props);
    this.state = {
      user: {
        username: "",
        password: "",
        email: "",
      },
      roles: "manager",
      isUserActive: false,
      isValidEmail: false
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmitLogin = this.handleSubmitLogin.bind(this);
  }
  componentDidMount() {
    console.log("inside componentDidMount");
    if (Cookies.get('access_token') != null && Cookies.get('access_token') != "") {
      this.state.isUserActive = true;///changes here
    }
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    if (name === "username") {
      this.setState((state) => ({
        user: {
          username: value,
          email: state.user.email,
          password: state.user.password
        },
        roles: state.roles
      }))
    }
    if (name === "email") {
      this.setState((state) => ({
        user: {
          username: state.user.username,
          email: value,
          password: state.user.password
        },
        roles: state.roles
      }))
    }
    if (name === "password") {
      this.setState((state) => ({
        user: {
          username: state.user.username,
          email: state.user.email,
          password: value
        },
        roles: state.roles
      }))
    }
    if (name === "roles") {
      this.setState((state) => ({
        user: {
          username: state.user.username,
          email: state.user.email,
          password: state.user.password
        },
        roles: value
      }))
    }
  }

  handleSubmitLogin = (event) => {
    console.log(JSON.stringify(this.state.user));
    this.state.user.roles = "";
    // eslint-disable-next-line react/no-direct-mutation-state
    this.state.user.email = "";
    var uname = this.state.user.username;
    fetch('http://localhost:8000/tasks/role', {
      method: 'GET',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-Type': 'application/json;charset=UTF-8'
      }
    }).then(response => response.json()).then(function (response) {
      console.log(response);
      response.forEach(element => {
        if (element.user.username == uname) {
          Cookies.set('roles', element.roles);
        }
      });
    });
    //http://localhost:8000/token-auth/
    //http://127.0.0.1:8000/
    fetch('http://127.0.0.1:8000/token-auth/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-Type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify(this.state.user)
    }).then(response => response.json()).then(function (response) {
      console.log(response.token)
      if (typeof response.token != 'undefined' && !response.token == "") {
        window.isUserLoggedIn = true;
        Cookies.set('access_token', response.token);
        Cookies.set('username', response.user.username);
        console.log("User loggedin successfully");
        let form = document.forms[0];
        form.submit();
      }
      else {
        alert("Please enter a valid Username or Password");
        window.location.reload();
      }
      return response;
    });
    
    event.preventDefault();
  }
  handleSubmitRegister = (event) => {
    console.log(JSON.stringify(this.state));
    if (this.state.roles === "") {
      this.state.roles = "manager";
    }
    fetch('http://localhost:8000/accounts/api/users/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-Type': 'application/json;charset=UTF-8'
      },
      // We convert the React state to JSON and send it as the POST body
      body: JSON.stringify(this.state)
    }).then(function (response) {
      console.log(response)
      if (response.ok) {
        // <Redirect to="/dashboard.jsx"/>;
        window.location.reload();
      }
      return response.json();
    });

    event.preventDefault();
  }
  saveEmail(event) {
    const emailRegex = new RegExp("^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$");
    if (emailRegex.test(event.state.user.email)) {
      Cookies.set("isValidEmail", "true");
    }
    else {
      Cookies.set("isValidEmail", "false");
    }
  }
  savePassword(event) {
    const passRegex = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$");
    if (passRegex.test(event.state.user.password)) {
      Cookies.set("isValidPassword", "true");
    }
    else {
      Cookies.set("isValidPassword", "false");
    }
  }
  render() {
    function tooltipEmail(props) {
      console.log(props);
      if (Cookies.get("isValidEmail") == "false") {
        return (
          <Tooltip id="button-tooltip" {...props}>
            <h6>Please enter valid email</h6>
          </Tooltip>
        );
      }
      else if (Cookies.get("isValidEmail") == "true") {
        props.show = true;
        return (
          <Tooltip id="button-tooltip" {...props}>
            A Valid Email
          </Tooltip>
        );
      }

    }
    function tooltipPassword(props) {
      console.log(props);

      if (Cookies.get("isValidPassword") == "false") {
        return (
          <Tooltip id="button-tooltip" {...props}>
            <h6>Password must contain:</h6>
            <ul>
              <li><b>One digit</b></li>
              <li><b>One upper letter</b></li>
              <li><b>One special symbol</b></li>
              <li><b>Min 8 characters</b></li>
            </ul>
          </Tooltip>
        );
      }
      else if (Cookies.get("isValidPassword") == "true") {
        return (
          <Tooltip id="button-tooltip" {...props}>
            A Valid password
          </Tooltip>
        );
      }

    }
    return (
      <login className="login">
        <Tabs defaultActiveKey="login" id="login" >
          <Tab eventKey="login" title="Login" onClick={this.handleTab}>
            <form action="http://localhost:8000/accounts/login/" method="POST">
              {/* <form> */}
              <input type="hidden" name="_csrf" value={cookie.load("csrftoken")} />
              <DjangoCSRFToken />
              <div className="Modal">
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input type="text" name="username" placeholder="Username" value={this.state.user.username} onChange={this.handleInputChange} />
                </div>
                <br></br>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input type="password" name="password" placeholder="Password" value={this.state.user.password} onChange={this.handleInputChange} />
                </div>
                <div className="footer">
                  <button type="button" className="btn" onClick={this.handleSubmitLogin} >
                    Login
          </button>
                  {/* <div type='submit'/> */}
                </div>
              </div>
              {/* </form> */}
            </form>
          </Tab>
          <Tab eventKey="register" title="Register" onClick={this.handleTab}>
            <div className="Modal">
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input type="text" name="username" placeholder="Username" value={this.state.user.username} onChange={this.handleInputChange} />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <OverlayTrigger
                  rootClose={true}
                  onEnter={this.saveEmail(this)}
                  placement="bottom-end"
                  show={true}
                  overlay={tooltipEmail}>
                  <input type="email" name="email" placeholder="Email" value={this.state.user.email} onChange={this.handleInputChange} />
                </OverlayTrigger>
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <OverlayTrigger
                  rootClose={false}
                  onEnter={this.savePassword(this)}
                  placement="bottom-end"
                  show={true}
                  overlay={tooltipPassword}>
                  <input type="password" name="password" placeholder="Password" value={this.state.user.password} onChange={this.handleInputChange} />
                </OverlayTrigger>
              </div>
              <div className="form-group">
                <label htmlFor="userrole">User Role</label>
                <select name="roles" placeholder="User Role" value={this.state.roles} onChange={this.handleInputChange}>
                  <option value="manager">Manager</option>
                  <option value="client">Client</option>
                  <option value="teammember">Team Member</option>
                </select>
              </div>
              <div className="footer">
                <button type="button" className="btn" onClick={this.handleSubmitRegister}>
                  Register
          </button>
              </div>
            </div>
          </Tab>
        </Tabs>
      </login>
    );
  }
}

export default Login;
