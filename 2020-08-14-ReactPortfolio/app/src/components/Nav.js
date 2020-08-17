import React from "react"

class Nav extends React.Component {
	render() {
		return <div className="pushDown col s4">
			<a className="btn" href="/">Home</a> 
			<a className="btn" href="/portfolio">Portfolio</a> 
			<a className="btn" href="/contact">Contact</a> 
		</div>	
	}
}
export default Nav;
