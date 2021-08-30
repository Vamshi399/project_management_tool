// eslint-disable-next-line no-unused-vars
import React, {component} from 'react';
import { useState }from 'react';
import { FaPlusCircle } from "react-icons/fa";
import Modal from 'react-modal';
import ScrollText from 'react-scroll-text';
 

 
Modal.setAppElement("#root")
function HomePage() {

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalIsOpen1, setModalIsOpen1] = useState(false);

  const handleClose = () => setModalIsOpen(false);
  const handleClose1 = () => setModalIsOpen1(false);
  
  

  return (
 
    
    <div className="home">
      
      <div className="Project">
     
        <div className="AddProject">

            <b >Add New Project: </b>
          <button className='button' onClick={() => setModalIsOpen1(true)}> <FaPlusCircle size="2em" color="black" /></button>
          <br/>
            <br/>
          <Modal isOpen={modalIsOpen1} onRequestClose={() => setModalIsOpen1(false)}
              style= { 
              {
                overlay: {
                  backgroundColor : 'gray',
                  top:'25%',
                  left:'25%',
                  width:'50%',
                  Height:'50%',

                  },
                content: {
                  color: 'Black'
                  }
              }
              }
            >
        
            <div className='text'>
            <label> <b>Project Name :</b> &nbsp; &nbsp;
              <input type="text"/>
              </label> <br/><br/>
              <input className='submit' type="submit" value="submit" onClick={handleClose1}/> &nbsp; &nbsp; 
              <input className='Close' type="submit" value="Close"  data-dismiss="modal" onClick={handleClose1}/>
            </div>
          </Modal>
        </div>
        
   
        <div className='tasks'>

          
          <div className='t1'>
          <table className="table">
            <tr>
              <th>Id</th>
              <th>Task</th>
              <th>Assignee</th>
              <th data-status="{{Status}}" class="status">Status</th>
              
            </tr>
            <tr>
              <td>1</td>
              <td>Login</td>
              <td>Akhila</td>
              <td data-status="{{Status}}" class="status"> Completed</td>
            </tr>

            <tr>
              <td>2
              </td>
              <td>Signup</td>
              <td>Claudia</td>
              <td data-status="{{Status}}" class="status">Completed</td>
            </tr>
            <tr>
              <td>3
              </td>
              <td>Home</td>
              <td>Vamshi</td>
              <td >Pending</td>
            </tr>
            
          </table>
          <button className='button2' onClick={() => setModalIsOpen(true)}> Add task </button>
            <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}
              style= { 
              {
                overlay: {
                  backgroundColor : 'gray',
                  top:'25%',
                  left:'25%',
                  width:'50%',
                  Height:'50%',

                  },
                content: {
                  color: 'Black'
                  }
              }
              }
            >
            
            <div className='taskm'>
            <label> <b>Task Name :</b> &nbsp; &nbsp;
              <input type="text"/>
              </label> <br/>
              <br/>
              <label> <b>Team Member Name :</b> &nbsp; &nbsp;
              <input type="text"/>
              </label> <br/><br/>
              <label> <b>Status:</b> &nbsp; &nbsp;
                <select className='select'>
                <option value="Assigned">Work Assigned</option>
                <option value="Progress">Work in Progress</option>
                <option value="Pending"> Work Pending</option>
                <option value="Completed">Completed</option>

                </select>
              </label> <br/><br/>
              <input className='submit' type="submit" value="submit" onClick={handleClose}/> &nbsp; &nbsp; 
              <input className='Close' type="submit" value="Close"  data-dismiss="modal" onClick={handleClose}/>
            </div>
          </Modal>
          </div>
          <div className='t2'>1</div>
        </div>
      </div>
      
        
      </div>
  

    
  );

}

export default HomePage;