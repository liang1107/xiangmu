import React from "react";
import ReactDOM from "react-dom";
import Ajax from "./../MyAjax.js";

export default 
class Listhead extends React.Component{
	constructor (props){
		super(props)
		
    }
    shai(){

    }
    render(){
        return(
            <ul>
                <li>价格</li>
                <li>销量</li>
                <li onClick={this.shai.bind(this)}>筛选</li>
            </ul>
        )
    }
}