import React from 'react';

class EmployeeLine extends React.Component {
	render() {
		return <div className="col s12 row">
			<div className="col s1"><img src={this.props.picture}></img></div>
			<div className="col s3">{this.props.name}</div>
			<div className="col s2">{this.props.cell}</div>
			<div className="col s4">{this.props.email}</div>
			<div className="col s2">{this.props.dob.substring(0, 10)}</div>
		</div>
	}
}

export default EmployeeLine;
