import React from 'react';
import Nav from './Nav'

class Header extends React.Component {
	constructor(props) {
		super(props);
		
	}
	
	render() {
		return <div>
			<h1> Brandon's Portfolio </h1>
			<br />
			<Nav />
		</div>	
	}
	
}

export default Header;
