import React from "react";
import ReactDOM from "react-dom";
import Ajax from "./../MyAjax.js";

import "./../scss/listheade.scss"

import Listhead from "./listhead"
import Goodlist from "./goodlist"

export default 
class List extends React.Component{
	constructor (props){
		super(props)
		this.state={
			list:[]
		}
	}
	componentWillMount(){
		var list=this.state.list;
		// console.log(list)
		
		
	}
	render(){
		// console.log(this.props.inp[0]);
		
		var key=this.props.inp;
		// // console.log(key,"aaaaa")
		// var url="http://w.lefeng.com/api/neptune/search/search_by_keyword/v1?keyword="+key+"&page=1";
		// Ajax.fetch(url,function(data){
		// 	// console.log(data)
		// },function(err){console.log(err)})
		
		return (
			<div ref="list" className="list1">
				<div className="listhead">
					<Listhead />
				</div>
				<Goodlist list={key}/>
			</div>



			)

	}

	componentDidMount(){
		// console.log(this.refs.list)
		//  this.refs.list.style.display="none";
	}


}
