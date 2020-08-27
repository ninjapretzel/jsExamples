import React from 'react';
import Global from "../Global.js";
import axios from "axios";

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
		const { oldPassword, newPassword, confirmPassword } = this.state;
		const { token } = this.context;
		
		const result = await axios.post("http://localhost:3001/changePassword", {
			oldPassword, newPassword, confirmPassword, token
		});
		
		const { success, message, err } = result;
		
		if (success) {
			window.M.toast({ html: "Password changed successfully!", classes: "green" });
		} else {
			window.M.toast({ html: "Password change failed: " + message + " err: " + err, classes: "red" });
		}
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
