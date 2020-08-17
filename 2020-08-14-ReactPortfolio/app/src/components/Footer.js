import React from 'react';
import Nav from "./Nav"

class Footer extends React.Component {
	constructor(props) {
		super(props);
		
	}
	
	render() {
		const now = new Date().getFullYear();
		
		return <div>
			<Nav />
			<br />
			<div className="pushDown left">
				Copyright {now}
			</div>
		</div>
	}
	
}

export default Footer;
