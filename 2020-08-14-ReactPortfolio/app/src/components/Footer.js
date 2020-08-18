import React from 'react';
import Nav from "./Nav"

class Footer extends React.Component {
	constructor(props) {
		super(props);
		
	}
	
	render() {
		const now = new Date().getFullYear();
		
		return <div className="row card-panel blue darken-4">
			<div className="col s8 pushDown left">
				<br/>
				Copyright {now}
			</div>
			<Nav />
		</div>
	}
	
}

export default Footer;
