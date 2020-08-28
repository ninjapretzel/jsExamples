import React from 'react';
import logo from './logo.svg';
import './App.css';

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Global from './Global.js';

import Header from "./components/Header"
import Footer from "./components/Footer"

import FourOhFour from "./pages/FourOhFour";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ControlPanel from './pages/ControlPanel';
import NewUser from './pages/NewUser';


class App extends React.Component {
	constructor() {
		super();
		this.state = {
			username: null,
			token: null,
			onLogin: (creds) => {
				localStorage["userLogin"] = JSON.stringify(creds);
				this.setState(creds);
				window.location = "/"
			},
			logout: () => {
				localStorage["userLogin"] = "";
				this.setState({ username: null, token: null });
				window.location = "/"
			}
			
		}
		
	}
	
	async componentDidMount() {
		if (localStorage["userLogin"]) {
			const userLogin = JSON.parse(localStorage["userLogin"]);
			const {username, token} = userLogin;
			
			// TODO: Verify token is still valid
			this.setState({username, token});
			
		}
	}
	
	render() {
		return (
			<Global.Provider value={this.state}>
				<div className="App">
					<Router>
						<div className="row">
							<div className="col s12">
								<Header />
							</div>
							<div className="col s12">
								<Switch>
									<Route exact path="/" component={Home} />
									<Route exact path="/login" component={Login} />
									<Route exact path="/controlPanel" component={ControlPanel} />
									<Route exact path="/newUser" component={NewUser} />
									<Route component={FourOhFour} />
								</Switch>
							</div>
							<div className="col s12">
								<Footer />
							</div>
						</div>
					</Router>
				</div>
			</Global.Provider>
		);
	}
}

export default App;
