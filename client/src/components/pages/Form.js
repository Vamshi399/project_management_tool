/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import Cookies from 'js-cookie';
import React, { component } from 'react';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.props = {
      Pname: "",
      title: "",
      Mname: "",
      complete: "Work Assigned",
      details: "",
      finish_date: "",
    }
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    if (name === "Pname") {
      this.setState((props) => ({

        Pname: value,
      }))
    }

    if (name === "title") {
      this.setState((props) => ({
        title: value,
      }))
    }
    if (name === "Mname") {
      this.setState((props) => ({
        Mname: value,
      }))
    }
    if (name === "complete") {
      this.setState((props) => ({
        complete: value,
      }))
    }
    if (name === "details") {
      this.setState((props) => ({
        details: value,
      }))
    }
    if (name === "finish_date") {
      this.setState((props) => ({
        finish_date: value,
      }))
    }

  }
  handleTaskSubmit = (event) => {
    // alert('A form was submitted: ' + this.state.username);

    console.log(JSON.stringify(this.props));

    fetch('http://localhost:8000/details/tasks', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-Type': 'application/json;charset=UTF-8'
      },
      // We convert the React state to JSON and send it as the POST body
      body: JSON.stringify(this.props)
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
  render() {
    return (
      <div id="Form">

        <form onSubmit={this.props.handleFormSubmit}>
          <label htmlFor="Pname">
            Project Name:<br />
            <input id="Pname" value={this.props.newPname}
              type="text" name="Pname"
              onChange={this.props.handleInputChange} />

          </label><br /><br />
          <label htmlFor="taskname">
            Title:<br />
            <input id="title" value={this.props.title}
              type="text" name="title"
              onChange={this.props.handleInputChange} />
          </label><br /><br />
          <label htmlFor="taskname">
            Description:<br />
            <input id="description" value={this.props.details}
              type="text" name="details"
              onChange={this.props.handleInputChange} />
          </label><br /><br />

          <label htmlFor="MName ">
            Team Member Name :<br />
            <input id="MName" value={this.props.newMname}
              type="text" name="MName"
              onChange={this.props.handleInputChange} />
          </label><br /><br />
          <label htmlFor="complete">
            Status :<br />
            <select className='select' id="complete" name="complete" onChange={this.props.handleInputChange} value={this.props.value} defaultValue="Work Assigned">

              <option value="Work Assigned">Work Assigned</option>
              <option value="Completed">Completed</option>


            </select>
          </label><br /><br />
          <label htmlFor="taskname">
            Finished By:<br />
            <input id="finish_date" value={this.props.finish_date}
              type="text" name="finish_date"
              onChange={this.props.handleInputChange} />
          </label><br /><br />
          <button className="button1" type="submit" value="Submit" onClick={this.handleTaskSubmit}>Add Item</button>
        </form>
      </div>
    );
  }
}

export default Form;