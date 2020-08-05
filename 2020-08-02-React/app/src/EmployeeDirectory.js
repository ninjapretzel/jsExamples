import React from 'react';
import EmployeeLine from './EmployeeLine'

class EmployeeDirectory extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			error: null,
			isLoaded: false,
			items: []
		};
	}
	
	async componentDidMount() {
		try {
			let res = await fetch("https://randomuser.me/api/?results=50")
			let result = await res.json();
			let employees = result.results.map(it => {
				return {
					name: it.name.first + " " + it.name.last,
					email: it.email,
					dob: it.dob.date,
					cell: it.cell,
					picture: it.picture.thumbnail,
				}
			});
			
			
			this.setState({
				isLoaded: true,
				items: employees
			});
			
		} catch (error) {
			this.setState({
				isLoaded: true,
				error,
			})
		}
	}
	
	
	render() {
		const { error, isLoaded, items } = this.state;
		
		if (error) {
			return <div>Error: {error.message}</div>;
		} else if (!isLoaded) {
			return <div>Loading...</div>
		}
		
		return <div className="row">
			<div className="col s12 center">
				<input id="searchField"></input>
			</div>
			{/* <div className="col s12 white-text"><h5>spacer</h5></div> */}
			
			<div className="col s1">Image</div>
			<div className="col s3">Name</div>
			<div className="col s2">Phone</div>
			<div className="col s4">Email</div>
			<div className="col s2">DOB</div>
			
			<div className="col s12 white-text"><h5>spacer</h5></div>
			
			{items.map(item => (
				<EmployeeLine picture={item.picture}
								name={item.name}
								cell={item.cell}
								email={item.email}
								dob={item.dob}
				/>
			))}
			
		</div>;
	}
}

export default EmployeeDirectory;
