import React from 'react';
import Project from '../components/Project';

class Portfolio extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			projects: [
				{
					name: "Employee Directory",
					repo: "https://github.com/bgartdu/employeedirectory",
					site: "",
					image: "",
				},
				{
					name: "Eat Da Burger",
					repo: "https://github.com/bgartdu/burger",
					site: "https://calm-brushlands-76584.herokuapp.com",
					image: "",
				},
				{
					name: "Note Taker",
					repo: "https://github.com/bgartdu/notetaker1",
					site: "https://tranquil-peak-25137.herokuapp.com",
					image: "",
				}
			]
			
			
		};
	}
	
	render() {
		return <div>
			<h2>Portfolio</h2>
			<h3>Github: <a href="https://github.com/bgartdu">bgartdu</a></h3>
			
			<div className="row">
				{this.state.projects.map(item => (
					<Project data={item} />
				))}
			</div>
			
		</div>	
	}
	
}

export default Portfolio;
