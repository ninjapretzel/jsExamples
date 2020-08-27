import React from 'react';
import Global from "../Global.js";

class ChangePassword extends React.Component {
	static contextType = Global;
	
	constructor() {
		super();
		this.state = {
			oldPassword: "",
			newPassword: "",
			confirmPassword: "",
		}
	}
	
	captureInput = (event) => {
		const varName = event.target.id;
		const value = event.target.value;
		
		const payload = {}
		payload[varName] = value;
		
		this.setState(payload);
	}
	
	doChangePassword = async (event) => {
		
	}
	
	render() {
		return <div>
			<div className="input-field col s12">
				<input onChange={this.captureInput} id="oldPassword" type="password" className="validate" />
				<label for="oldPassword">Old Password</label>
			</div>
			
			<div className="input-field col s12">
				<input onChange={this.captureInput} id="newPassword" type="password" className="validate" />
				<label for="newPassword">New Password</label>
			</div>
			
			<div className="input-field col s12">
				<input onChange={this.captureInput} id="confirmPassword" type="password" className="validate" />
				<label for="confirmPassword">Confirm New Password</label>
			</div>
			
			<a onClick={this.doChangePassword} id="changePasswordButton" className="waves-effect waves-light btn">Change Password</a>
			
			
		</div>
	}	
}

export default ChangePassword;
