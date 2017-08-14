import React from "react";
import ReactDOM from "react-dom";

export default 
class App extends React.Component{
	constructor (props){
		super(props)
	}

	render(){
		return (
			<div id="container">
	         {this.props.home}
	          <footer id="footer">
	          </footer>
	       </div>


			)
	}
}