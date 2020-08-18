import React from 'react';

class Contact extends React.Component {
	constructor(props) {
		super(props);
		
	}
	
	render() {
		return <div>
			<h2>Contact</h2>
			<h4>Cell: 555-555-5555</h4>
			<h4>Email: <a href="mailto:bgartdu@gmail.com"> bgartdu@gmail.com</a></h4>
			<h4>Linkedin: <a href="paste">paste</a></h4>
		</div>	
	}
	
}

export default Contact;
