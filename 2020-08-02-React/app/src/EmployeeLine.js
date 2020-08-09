import React from 'react';

class EmployeeLine extends React.Component {
	render() {
		const classes = "col s12 row tight valign-wrapper brown " 
			+ ((this.props.index % 2) ? "lighten-5" : "lighten-4")
		
		return <div className={classes}>
			<div className="col s1"><img src={this.props.picture}></img></div>
			<div className="col s3">{this.props.name}</div>
			<div className="col s2">{this.props.phone}</div>
			<div className="col s4">{this.props.email}</div>
			<div className="col s2">{this.props.dob}</div>
		</div>
	}
}

export default EmployeeLine;
