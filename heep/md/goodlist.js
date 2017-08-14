import React from "react";
import ReactDOM from "react-dom";
import Ajax from "./../MyAjax.js";
import "./../scss/listheade.scss"
export default 
class Goodlist extends React.Component{
	constructor (props){
        super(props)
        
		
    }
    componentWillMount(){
        
    }
    render(){
        
        
      
        
       
        return(
            <div ref="key" className="goods">
                
                 {this.props.list} 
                
                {/* <div className="wu">
                    <img src=""/>
                    <div className="right">
                        <p>幻术</p>
                         <p>幻术</p>
                          <p>幻术</p>
                           <p>￥25<span></span> <i className="iconfont">&#xe604;</i> </p>
                    </div>
                </div> */}






            </div>
        )
    }
    componentDidUpdate(){
        //  console.log(this.refs.key.getAttribute('data-key1'))
    }
}