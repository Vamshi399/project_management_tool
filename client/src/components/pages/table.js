import React from 'react';
import Cookies from 'js-cookie';
import Switch from "react-switch";


class Table extends React.Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }
 

  handleDropdown = (event, item) => {
    var item1 = item;
    item1.complete = event.target.value;
    fetch('http://localhost:8000/details/tasks/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-Type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify(item1)
    }).then(response => response.json()).then(function (response) {
      alert("Task status updated successfully");
    });
  }

  render() {
    const items = this.props.items;
    var roles = Cookies.get('roles');
    var username = Cookies.get('username');

    return (
      <div id="Table">
        <table>
          <tbody>
            <tr>
              <th className="th">Project Name</th>
              <th className="th">Title</th>
              <th className="th">Description</th>
              <th className="th">Assigned To</th>
              <th className="th">Status</th>
              <th className="th">Deadline</th>
            </tr>
            {items.map(item => {
              if (roles === 'teammember') {
                if(username===item.assignee){
                  return (
                    <tr>
                      <td className="td">{item.project}</td>
                      <td className="td">{item.title}</td>
                      <td className="td">{item.details}</td>
                      <td className="td">{item.assignee}</td>
                      <td className="td"> 
                      <select name="status" id="status" onChange={(event) => this.handleDropdown(event, item)} defaultValue={item.complete}>
                          <option value="false">Work Assigned</option>
                          
                          <option value="true">Completed</option>
  
                        </select>  
                      </td>
                      <td className="td">{item.finish_date}</td>
                    </tr>
                  );
                }
              } //
              else{
                return (
                  // <form id="postTask" name="PostName" action="http://localhost:8000/details/tasks/" method="POST">
                  <tr>
                    <td className="td">{item.project}</td>
                    <td className="td">{item.title}</td>
                    <td className="td">{item.details}</td>
                    <td className="td">{item.assignee}</td>
                    <td className="td">
                    <select name="status" id="status" onChange={(event) => this.handleDropdown(event, item)} defaultValue={item.complete}>
                          <option value="false">Work Assigned</option>
                          
                          <option value="true">Completed</option>
  
                        </select>  

                        </td>
                    <td className="td">{item.finish_date}</td>
                  </tr>
                  // </form>
                );
              }
            })}
          </tbody>
        </table>
      </div>     
    );
  }
}

export default Table;