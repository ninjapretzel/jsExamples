import React from 'react';
import Global from "../Global";
import axios from "axios";


class NewUser extends React.Component {
	static contextType = Global;
	
	constructor() {
		 super();
		 this.state = {
			 username: "",
			 password: "",
			 message: "",
		 }
	}

	captureInput = (event) => {
		const varName = event.target.id;
		const value = event.target.value;
			
		const payload = {}
		payload[varName] = value;
		
		this.setState(payload);
	}
	
	doNewUser = async () =>{
		console.log("createNewUser")
		const { username, password } = this.state;

		const result = await axios.post("http://localhost:3001/newuser", {
			username, password
		})

		const { success, token, message } = result.data

		if (success) {
			this.context.onLogin({username, token});
		} else {
			this.setState({ message });
		}
	}
	
	render() {
		if (this.context.token || this.context.username) {
			window.location = "/";
			return <div />;
		}
		return <div className = "row">
			<h1>Sign Up</h1>
			<div className="input-field col s12">
				<input onChange ={this.captureInput} id="username" type="text" className="validate" />
				<label for="username">Username</label>
			</div>
			<div className="input-field col s12">
				<input onChange ={this.captureInput} id="password" type="password" className="validate" />
				<label for="password">Password</label>
			</div>

			<a onClick ={this.doNewUser} id= "loginButton" className="waves-effect waves-light btn">Sign Up</a>

			<div className="red-text">{this.state.message}</div>
		</div>
	}	
}

export default NewUser;
