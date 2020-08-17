import React from 'react';
import Nav from './Nav'

class Header extends React.Component {
	constructor(props) {
		super(props);
		
	}
	
	render() {
		return <div className="row card-panel">
			<div className="col s8">
				<h1> Brandon's Portfolio </h1>
			</div>
			<Nav />
		</div>
	}
	
}

export default Header;
