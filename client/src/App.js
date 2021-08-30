/* eslint-disable no-unused-vars */

import './App.css';
import './Assets/default.css';
import './Assets/logo.png';
//Component
import Header from './components/headerComponent/header';
import Login from './components/login/login';
//import HomePage from './components/pages/homePage';
import Navbar from './components/Navbar';
import Footer from './components/footerComponent/footer';
import Faq from './components/pages/faq';
import CalendarF from "./components/pages/calendar";
import Logout from './components/logout/logout';
import SettingsPane from './components/pages/setting';
import App1 from './components/pages/App1';
import Repository1 from './components/pages/repository';
import Messages from './components/pages/messages';
import Cookies from 'js-cookie';
import Calendar from './components/pages/bigcalendar';
import team from './components/pages/team';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import React from "react";
import "./App.scss";
import HomePage from './components/pages/homePage';

import Chatbot from "react-chatbot-kit";

// import ActionProvider from "./ActionProvider";
// import MessageParser from "./MessageParser";
// import config from "./config";
//import React from 'react';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        username: "",
        password: "",
        email: "",
      },
      roles: "manager",
      isUserActive: false
    }
  }

  

  // componentDidMount() {
  //   //Add .right by default
  //   this.rightSide.classList.add("right");
  // }

  // changeState() {
  //   const { isLogginActive } = this.state;

  //   if (isLogginActive) {
  //     this.rightSide.classList.remove("right");
  //     this.rightSide.classList.add("left");
  //   } else {
  //     this.rightSide.classList.remove("left");
  //     this.rightSide.classList.add("right");
  //   }
  //   this.setState(prevState => ({ isLogginActive: !prevState.isLogginActive }));
  // }

  render() {
    const isUserActive = Cookies.get('access_token')!=null && Cookies.get('access_token')!=="";
    // const isUserActive = true;
    return (
      
      <div className="App">
        <Router>
          <Header className="App-header">
          
          </Header>
      {/* <header className="App-header">
        <Chatbot
          config={config}
          actionProvider={ActionProvider}
          messageParser={MessageParser}
        />
      </header> */}
          {!isUserActive ? (<Login />) : (
            <div>
              <Navbar />
              <Switch>
                <Route path='/' exact component={App1} />
                <Route path='/faq' exact component={Faq} />
                <Route path='/calendar' exact component={Calendar} />
                <Route path='/setting' exact component={SettingsPane} />
                <Route path='/App1' exact component={App1} />
                <Route path='/repository' exact component={Repository1} />
                <Route path='/messages' exact component={Messages} />
                <Route path='/team' exact component={team} />
                <Route path='/logout' exact component={Logout} />
              </Switch>
              
            {/* <App1></App1> */}
            </div>
          )}
          
          <Footer> </Footer>
        </Router>
      </div>
    );
  }
}
// eslint-disable-next-line no-unused-vars
const RightSide = props => {
  return (
    
    <div
      className="right-side"
      ref={props.containerRef}
      onClick={props.onClick}
    >
      
      <div className="inner-container">
        <div className="text">{props.current}</div>
      </div>
    </div>
  );
};
export default App;
