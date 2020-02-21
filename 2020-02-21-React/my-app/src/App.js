import React from 'react';
import logo from './logo.svg';
import './App.css';
import Welcome from './Welcome';

console.log("This is before App()");

function App() {
	console.log("This is the beginning of app!");
	return (
		<div className="App">
			 {this.props.children}
		</div>
	);
}

export default App;






