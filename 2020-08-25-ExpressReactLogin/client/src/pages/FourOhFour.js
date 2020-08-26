import React from 'react';
import Global from "../Global.js";

class FourOhFour extends React.Component {
	static contextType = Global;
	
	// constructor() {
	// 	super();
	// }
	
	render() {
		return <div>
			<h1>404 - Page Not Found</h1>
		</div>
	}	
}

export default FourOhFour;
