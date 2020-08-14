import React from 'react';
import logo from './logo.svg';
import './App.css';

import FourOhFour from "./pages/FourOhFour";
import Home from "./pages/Home";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

class App extends React.Component {
	
	
	render() {
		return (
			<Router>
				<div>
					<Switch>
						<Route exact path="/" component={Home} />
						<Route component={FourOhFour} />
					</Switch>
				</div>
			</Router>
		);
	}
}

export default App;
