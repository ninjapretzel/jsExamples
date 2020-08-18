import React from 'react';

class Project extends React.Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		const { name, repo, site, image, desc } = this.props.data;
		//.row .col.s12
		//.row .col.m12
		//.row .col.l12
		
		return <div className="card large col s12 xl6 blue darken-2">
			<div className="card-image">
				<img src={image}></img>
				<span className="card-title">{name}</span>
			</div>
			<div className="card-content">{desc}</div>
			<div className="card-action">
				{repo && <a href={repo}>Repository</a>}
				{site && <a href={site}>Live Site</a>}
			</div>
		</div>	
	}
}

export default Project;
