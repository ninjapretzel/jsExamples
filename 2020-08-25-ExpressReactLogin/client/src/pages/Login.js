import React from 'react';
import Global from "../Global.js";
import axios from "axios";

class Login extends React.Component {
	static contextType = Global;
	
	constructor() {
		super();
		this.state = {
			username: "",
			password: "",
			message: ""
		}
	}
	
	captureInput = (event) => {
		const varName = event.target.id;
		const value = event.target.value;
		
		const payload = {}
		payload[varName] = value;
		
		this.setState(payload);
	}
	
	doLogin = async () => {
		const { username, password } = this.state;
		console.log(this.context);
		
		const result = await axios.post("http://localhost:3001/login", {
			username, password
		})
		
		const { success, token, message } = result.data;
		
		if (success) {
			this.context.onLogin({ username, token });
		} else {
			this.setState({ message });
		}
		
	}
	
	render() {
		return <div className="row">
			<h1>Login!</h1>
			<div className="input-field col s12">
				<input onChange={this.captureInput} id="username" type="text" className="validate" />
				<label for="username">Username</label>
			</div>
			
			<div className="input-field col s12">
				<input onChange={this.captureInput} id="password" type="password" className="validate" />
				<label for="password">Password</label>
			</div>
			
			<a onClick={this.doLogin} id="loginButton" className="waves-effect waves-light btn">login!</a>
			
			<div className="red-text">{this.state.message}</div>
		</div>
			
	}
}

export default Login;
