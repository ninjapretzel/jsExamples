import React from 'react';
import logo from './logo.svg';
import './App.css';

import Header from "./components/Header"
import Footer from "./components/Footer"

import FourOhFour from "./pages/FourOhFour";
import Home from "./pages/Home";
import Portfolio from './pages/Portfolio';
import Contact from './pages/Contact';

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

class App extends React.Component {
	
	
	render() {
		return (
			<Router>
				<div>
					<Header />
					<Switch>
						<Route exact path="/" component={Home} />
						<Route exact path="/portfolio" component={Portfolio} />
						<Route exact path="/contact" component={Contact} />
						<Route component={FourOhFour} />
					</Switch>
					<Footer />
				</div>
			</Router>
		);
	}
}

export default App;
