import React from 'react';
// import is similar to require-
// const React = require('react').React;
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Home from './Home';
import About from './About';
import Contact from './Contact';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
  } from "react-router-dom";
import Welcome from './Welcome';


ReactDOM.render(<Router>
	Soup!
	
	<div>
		<Welcome name="Jonathan" />
	</div>
	<Switch>
		<Route exact path="/"> <Home /> </Route>
		<Route path="/about"> <About /> </Route>
		<Route path="/contact"> <Contact /> </Route>
	</Switch>
 </Router>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
