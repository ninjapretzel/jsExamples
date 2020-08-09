import React from 'react';
import EmployeeLine from './EmployeeLine'

class EmployeeDirectory extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			search: "",
			sort: "",
			sortAsc: false,
			error: null,
			isLoaded: false,
			items: []
		};
		
		this.employeeMatchesSearch = (employee) => {
			let search = this.state.search.toLowerCase();
			
			return search === "" 
				|| (employee.name.toLowerCase().includes(search))
				|| (employee.email.toLowerCase().includes(search))
				|| (employee.dob.toLowerCase().includes(search))
				|| (employee.phone.toLowerCase().includes(search));
			
		}
		
	}
	
	
	async componentDidMount() {
		try {
			let res = await fetch("https://randomuser.me/api/?results=50&nat=us")
			let result = await res.json();
			let employees = result.results.map(it => {
				return {
					name: it.name.first + " " + it.name.last,
					email: it.email,
					dob: it.dob.date.substring(0, 10),
					phone: it.cell,
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
	
	handleSearch = (event) => {
		this.setState({search: event.target.value});
	}
	
	changeSortMode = (event) => {
		const currentMode = this.state.sort;
		const currentAsc = this.state.sortAsc;
		
		const clickedThing = event.target.innerText.toLowerCase();
		
		if (currentMode === clickedThing) {
			if (!currentAsc) { // Clicked once, toggle sort direction
				this.setState({sortAsc: true});
			} else { // Clicked twice, revert to "default"/unsorted
				this.setState({sort: "", sortAsc: false});
			}
			
		} else { // Not clicked yet, sort by the clicked criteria 
			this.setState({sort: clickedThing, sortAsc: false});
		}
		
		
		
		
	}
	
	render() {
		const { error, isLoaded, items, sort, sortAsc } = this.state;
		
		if (error) {
			return <div>Error: {error.message}</div>;
		} else if (!isLoaded) {
			return <div>Loading...</div>
		}
		
		// make a copy of items, and filter/sort the copy as needed.
		const sorted = [...items].filter(this.employeeMatchesSearch);
		
		if (sort !== "") {
			sorted.sort( (a,b) => {
				if (a.hasOwnProperty(sort) && b.hasOwnProperty(sort)) {
					return a[sort].localeCompare(b[sort]);
				}
				
				return 0;
			} );
			
			if (sortAsc) {
				sorted.reverse();
			}
		}
		
		// ▲ ▼
		
		return <div className="row">
			<div className="col s4 white white-text">.</div>
			<div className="input-field col s4 center">
				<input id="searchField" onChange={this.handleSearch} type="text" className="validate"></input>
				
				<label for="searchField">Search:</label>
			</div>
			<div className="col s4 white white-text">.</div>
			
			<div className="card col s12 row tight strong">
				<div className="col s12 white white-text">.</div>
				
				<div className="col s1 fakeLink">Image</div>
				<div className="col s3"> {this.state.sort === "name" && (this.state.sortAsc ? "▲" : "▼") } <a href="#" onClick={this.changeSortMode}>Name</a>  </div>
				<div className="col s2"> {this.state.sort === "phone" && (this.state.sortAsc ? "▲" : "▼") } <a href="#" onClick={this.changeSortMode}>Phone</a>  </div>
				<div className="col s4"> {this.state.sort === "email" && (this.state.sortAsc ? "▲" : "▼") } <a href="#" onClick={this.changeSortMode}>Email</a>  </div>
				<div className="col s2"> {this.state.sort === "dob" && (this.state.sortAsc ? "▲" : "▼") } <a href="#" onClick={this.changeSortMode}>DOB</a>  </div>
				
				<div className="col s12 white white-text">.</div>
			</div>
			
			
			{sorted
				.map( (item, index) => (
				<EmployeeLine index={index}
								picture={item.picture}
								name={item.name}
								phone={item.phone}
								email={item.email}
								dob={item.dob}
				/>
			))}
			
		</div>;
	}
}

export default EmployeeDirectory;
