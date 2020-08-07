import React from 'react';
import logo from './logo.svg';
import './App.css';
import EmployeeDirectory from './EmployeeDirectory';

function App() {
	return (
		<div className="App">
			<div className="row">
				<div className="col s12 blue darken-4 white-text">
					<h1>Employee Directory</h1>
					<br/>
					<p>Click in search field and type to narrow results. </p>
					<br/>
				</div>
				<div className="col s12 red red-text">a</div>
			</div>
			
			<EmployeeDirectory />
		</div>
	);
}

export default App;
