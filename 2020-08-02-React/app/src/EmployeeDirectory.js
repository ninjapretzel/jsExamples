import React from 'react';
import EmployeeLine from './EmployeeLine'

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
			
			<EmployeeLine name="bob" cell="303-808-2312" email="bob@cool.dude" dob="4-20-1999" picture="nothing.jpg"/>
			<EmployeeLine name="bob" cell="303-808-2312" email="bob@cool.dude" dob="4-20-1999" picture="nothing.jpg"/>
			<EmployeeLine name="bob" cell="303-808-2312" email="bob@cool.dude" dob="4-20-1999" picture="nothing.jpg"/>
			<EmployeeLine name="bob" cell="303-808-2312" email="bob@cool.dude" dob="4-20-1999" picture="nothing.jpg"/>
			<EmployeeLine name="bob" cell="303-808-2312" email="bob@cool.dude" dob="4-20-1999" picture="nothing.jpg"/>
			<EmployeeLine name="bob" cell="303-808-2312" email="bob@cool.dude" dob="4-20-1999" picture="nothing.jpg"/>
			<EmployeeLine name="bob" cell="303-808-2312" email="bob@cool.dude" dob="4-20-1999" picture="nothing.jpg"/>
			<EmployeeLine name="bob" cell="303-808-2312" email="bob@cool.dude" dob="4-20-1999" picture="nothing.jpg"/>
			
		</div>;
	}
}

export default EmployeeDirectory;
