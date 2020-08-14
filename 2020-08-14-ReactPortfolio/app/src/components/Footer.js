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
			Copyright {now}
		</div>
	}
	
}

export default Footer;
