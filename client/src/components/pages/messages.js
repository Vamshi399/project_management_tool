/* eslint-disable no-unused-vars */
import React, {component} from 'react';
import GooglePicker from 'react-google-picker';

function Messages() {
    function onSubmit() {
       
        // alert('Repository under construction!!');
        window.open('http://localhost:8000/chat/5/');
    
        
      }
  return (
    <div className="faq1">
       <button className="button"  onClick={onSubmit}><img src={process.env.PUBLIC_URL+'messages.png'} alt='repository' style={{height:'15em'}}/>
       </button>
    </div>
  );
}

export default Messages;
