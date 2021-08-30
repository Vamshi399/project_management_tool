// eslint-disable-next-line no-unused-vars
import React, { component } from 'react';

class Form1 extends React.Component {
  constructor(props) {
    super(props);
    this.props = {
        Pname: ""
    }
    this.handleInputChange1 = this.handleInputChange1.bind(this);
  }
  handleInputChange1 = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    if (name === "Pname") {
      this.setState((props) => ({
        
        Pname: value
      
        
      }))
    }

  }
  handleTaskSubmit1 = (event) => {
    // alert('A form was submitted: ' + this.state.username);
 
    console.log(JSON.stringify(this.props));

    fetch('http://localhost:8000/accounts/tasks', {
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
      <div id="Form1">
         
        <form onSubmit={this.props.handleFormSubmit}>
        <label htmlFor="Pname">
          Project Name:<br/>
          <input id="Pname" value={this.props.newPname} 
            type="text" name="Pname"
            onChange={this.props.handleInputChange} />
            
          </label><br/><br/>
         
        
          <button type="submit" value="Submit" onClick={this.handleTaskSubmit1}>Add Project</button>
        </form>
      </div>
    );
  }
}

export default Form1;