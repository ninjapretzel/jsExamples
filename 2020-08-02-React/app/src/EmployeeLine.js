import React from 'react';

class EmployeeLine extends React.Component {
	render() {
		return <div>
			<div className="col s1">{this.props.picture}</div>
			<div className="col s3">{this.props.name}</div>
			<div className="col s2">{this.props.cell}</div>
			<div className="col s4">{this.props.email}</div>
			<div className="col s2">{this.props.dob}</div>
		</div>
	}
}

export default EmployeeLine;
