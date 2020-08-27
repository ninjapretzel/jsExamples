
import React from 'react';
import Global from "../Global.js";
import ChangePassword from '../components/ChangePassword.js';

class ControlPanel extends React.Component {
	static contextType = Global;
	
	// constructor() {
	// 	super();
	// }
	
	render() {
		return <div className="row">
			<ChangePassword />
		</div>
	}	
}

export default ControlPanel;
