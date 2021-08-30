/* eslint-disable no-unused-vars */
import React, { component } from 'react';
import { SettingsPane, SettingsPage, SettingsContent, SettingsMenu } from 'react-settings-pane';

import { BrowserRouter as Route } from 'react-router-dom';
import { Button, FormGroup, FormControl } from "react-bootstrap";

import HomePage from './homePage';
import Cookies from 'js-cookie';
import Mail from './mail';
import * as serviceWorker from './serviceWorker';
// import React from 'react';
import ReactDOM from 'react-dom';


function Setting() {
  var username = Cookies.get("username");
  var password = "";
  var email = Cookies.get("email");
  let settings = {
    'mysettings.general.name': username,
    'mysettings.profile.name': username,
    'mysettings.general.color-theme': 'purple',
    'mysettings.general.email': email,
    'mysettings.profile.email': email ? email : username + '@gmail.com',
    'mysettings.profile.password': password,
    'mysettings.general.picture': 'earth',

  };
  const menu = [
    {
      title: 'General',          // Title that is displayed as text in the menu
      url: '/settings/general'  // Identifier (url-slug)
    },
    {
      title: "Profile",
      url: "/settings/profile"
    },
    {
      title: "Notifications",
      url: "/settings/notifications"
    },
    {
      title: "Admin",
      url: "/settings/admin"
    },
    // {
    //   title: "Language",
    //   url: "/settings/language"
    // },
    // {
    //   title: "About",
    //   url: "/settings/about"
    // }
  ];

  const dynamicOptionsForProfilePage = [
    {
      key: 'mysettings.profile.email',
      label: 'E-Mail address',
      type: 'text',
    },
    {
      key: 'mysettings.profile.password',
      label: 'Password',
      type: 'password',
    }
  ];

  // Save settings after close
  const leavePaneHandler = (wasSaved, newSettings, oldSettings) => {
    // "wasSaved" indicates wheather the pane was just closed or the save button was clicked.

    if (wasSaved && newSettings !== oldSettings) {
      // do something with the settings, e.g. save via ajax.
    }
  };
  const settingsChanged = (changedSettings) => {
    // this is triggered onChange of the inputs
  };

  const updateClick = (event) => {
    username = document.getElementById('profile.name').value;
    password = document.getElementById('profile.password').value;
    Cookies.set("username", username);
    Cookies.set("password", password);
    alert('Details updated successfully');
    window.location.reload();
  };

  const submitClick = () => {
    alert('Details submitted successfully');
    // this is triggered onChange of the inputs
  };
  return (
    <SettingsPane items={menu} index="/settings/general" settings={settings} onPaneLeave={leavePaneHandler} >
      <SettingsMenu headline="General Settings" />
      <SettingsContent closeButtonClass="secondary" saveButtonClass="primary" header={true}>
        <SettingsPage handler="/settings/general">
          <fieldset className="form-group">
            <label for="profileName"> Full Name: </label>
            <input id="general.name" type="text" className="form-control" name="mysettings.profile.name" placeholder="FirstName" onChange={settingsChanged} defaultValue={settings['mysettings.profile.name']} />
          </fieldset>
          <fieldset className="form-group">
            <label for="profileName">Email: </label>
            <input id="general.name" type="text" className="form-control" name="mysettings.profile.email" placeholder="email" onChange={settingsChanged} defaultValue={settings['mysettings.profile.email']} />
          </fieldset>
        </SettingsPage>
        <SettingsPage handler="/settings/profile" onPaneLeave={leavePaneHandler}>
          <fieldset className="form-group">
            <label> User Name: </label>
            <input id="profile.name" type="text" name="username" className="form-control" defaultValue={settings['mysettings.profile.name']} />
          </fieldset>
          <fieldset className="form-group">
            <label for="profileName">Password: </label>
            <input id="profile.password" type="password" className="form-control" name="mysettings.profile.password" placeholder="Password" onChange={settingsChanged} defaultValue={settings['mysettings.profile.password']} />
          </fieldset>
          <fieldset className="form-group">
            <label> Email: </label>
            <input id="email" type="text" name="email" className="form-control" defaultValue={settings['mysettings.profile.email']} />
          </fieldset>
          <Button type="submit" class="btn" variant="primary" onClick={updateClick}>Update</Button>
        </SettingsPage>
        <SettingsPage handler="/settings/admin" onPaneLeave={leavePaneHandler}>
          <div style={{ fontSize: "12px" }}>For Any Admin changes, mail the admin using this page</div>
          <div style={{ fontSize: "12px" }}>For creation of New Chat id and joining any Chat groups, contact Admin by raising ticket below</div>
          <div style={{ height: "20px" }}></div>
          <Mail />
          <div style={{ height: "20px" }}></div>
          <div style={{ color: "red", fontSize: "12px" }}>Do Not foget to mention your username and the names of the project groups you need communication/ chat access to</div>
        </SettingsPage>
        <SettingsPage handler="/settings/notifications" onPaneLeave={leavePaneHandler}>
          Enable Alerts
        <label>
            Activity updates:
          <input
              type="checkbox" />
          </label>
          <label>
            Daily summaries:
          <input
              type="checkbox" />
          </label>
        </SettingsPage>
        <SettingsPage handler="/settings/language" onPaneLeave={leavePaneHandler} />
        <SettingsPage handler="/settings/about" onPaneLeave={leavePaneHandler} />
      </SettingsContent>
    </SettingsPane>
  );
}

export default Setting;
