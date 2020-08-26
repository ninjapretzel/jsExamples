import React from 'react';
import Global from "../Global.js";

class Home extends React.Component {
	static contextType = Global;
	
	// constructor() {
	// 	super();
	// }
	
	render() {
		return <div>
			<h1>Homepage</h1>
		</div>
	}	
}

export default Home;
