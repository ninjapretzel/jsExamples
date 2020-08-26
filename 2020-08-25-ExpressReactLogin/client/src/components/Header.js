import React from 'react';
import Global from "../Global.js";

class Header extends React.Component {
	static contextType = Global;
	
	// constructor() {
	// 	super();
	// }
	
	render() {
		return <div className="row">
			<div className="col s8"><h2>Login Example</h2></div>
			<div className="col s4 ">
				{ 
					this.context.username ? this.context.username : <a href="/login"> go to login </a>
				}
			</div>
		</div>
	}	
}

export default Header;
