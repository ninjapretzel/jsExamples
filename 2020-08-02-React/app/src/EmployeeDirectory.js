import React from 'react';

class EmployeeDirectory extends React.Component {
	render() {
		return <div className="row">
			<div className="col s12 center">
				<input id="searchField"></input>
			</div>
			
			<div className="col s1">Image</div>
			<div className="col s3">Name</div>
			<div className="col s2">Phone</div>
			<div className="col s4">Email</div>
			<div className="col s2">DOB</div>
			
		
		</div>;
	}
}

export default EmployeeDirectory;
