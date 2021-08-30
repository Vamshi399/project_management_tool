import React, { Component } from 'react';
import * as emailjs from 'emailjs-com';
class Mail extends Component{
    constructor(props) {
        super(props);
    this.state= {
        name:'',
        email:'',
        phone:'',
        message:''
    }
}

handleChangeName=(event)=>{
    this.setState({
        name:event.target.value,
    });
    
}
handleChangeEmail=(event)=>{
    this.setState({
        email:event.target.value,
    });
}
handleChangePhone=(event)=>{
    this.setState({
        phone:event.target.value,
    });
}
handleChangeMessage=(event)=>{
    this.setState({
        message:event.target.value,
    });
}
sendMail=()=>{
    

    var template_params = {
        "name": this.state.name,
        "email": this.state.email,
        "phone": this.state.phone,
        "message":this.state.message,
     }
     
     var service_id = "service_1zh1tbf";
     var template_id = "template_kcvvpud";
     emailjs.send(service_id,template_id,template_params,'user_MBhXua0JdEsQKP3VTrVmq')
     .then(function(response) {
       alert('SUCCESS!');
    }, function(err) {
       console.log('FAILED...', err);
    });
};
render(){
    return(
        <div>
            <fieldset className="form-group">
                <label> Name: </label>
                <input type="text" name="name" onChange={this.handleChangeName} className="form-control" />
            </fieldset>
            <fieldset className="form-group">
                <label> Email: </label>
                <input type="text"  name="email" ref="email" onChange={this.handleChangeEmail} className="form-control" />
            </fieldset>
            <fieldset className="form-group">
                <label> Subject: </label>
                <textarea type="textarea" name="message" ref="message" onChange={this.handleChangeMessage} className="form-control" style={{minWidth: "290px"}}/>
            </fieldset>
            <button type="submit" onClick={this.sendMail}>Send Email</button>
        </div>
    );
}
}
export default Mail;
