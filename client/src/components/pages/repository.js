/* eslint-disable no-unused-vars */
import React, {component} from 'react';
import GooglePicker from 'react-google-picker';

function Repository1() {
    function onSubmit() {
       
        // alert('Repository under construction!!');
        window.open('https://drive.google.com/drive/folders/1JD-2MU0x-rW23mLOuxDVTqRY4BHnoOfb?usp=sharing');
    
        
      }
  return (
    <div className="faq1">
       <button className="button"  onClick={onSubmit}><img src={process.env.PUBLIC_URL+'repository.png'} alt='repository' style={{height:'15em'}}/>
       </button>
    </div>
  );
}

export default Repository1;
