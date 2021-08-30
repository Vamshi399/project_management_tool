import React from 'react';

class Table1 extends React.Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }
  handleChange(e){
    alert(this.setState({selectValue:e.target.value}));
    this.setState({selectValue:e.target.value});
  }
  

  render() {
    const items = this.props.items;

    return (
      <div id="Table2">
        <table>
          <tbody>
            <tr>
              <th className="th">Project Name</th>
              <th className="th">Title</th>
              <th className="th">Assigned To</th>
              <th className="th">Status</th>

            </tr>
            {items.map(item => {  
                  return (
                    <tr>
                      <td className="td">{item.project}</td>
                      <td className="td">{item.title}</td>
                      <td className="td">{item.assignee}</td>
                      <td className="td"> {item.complete?"Completed":"Work Assigned"} </td>
              
                    </tr>
                    
                  );
 
            })
            }
          </tbody>
        </table>
      </div>     
    );
  }
}

export default Table1;