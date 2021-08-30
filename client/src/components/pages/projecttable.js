import React from 'react';

class ProjectTable extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const projects = this.props.projects;
    var serialNo =0;
    return (
      <div id="Table1">
        <table className="table1">
          <tbody>
            <tr>
            <th className="th1">S.No</th>
            <th className="th1">Project Name</th>
            <th className="th1">Creator</th>
            </tr>
            {projects.map(project => {
              return (
                <tr>
                  <td className="td1">{serialNo = serialNo +1}</td>
                  <td className="td1">{project.name}</td>
                  <td className="td1">{project.creator}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default ProjectTable;