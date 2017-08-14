





import "./../scss/homelist1.scss"
import React from "react";
import ReactDOM from "react-dom";
import Ajax from "./../MyAjax.js";
import {hashHistory} from "react-router"





export default 
class Homelist1 extends React.Component{
	constructor(props){
		super(props)
		this.state={
            list:[]
        }
		
    }
    
    componentWillMount(){
        var url="http://w.lefeng.com/api/neptune/brand/ad/v3?zoneId=943%2C478%2C496%2C693%2C724%2C725%2C726%2C727%2C728&resolution=320x568&appName=lefeng_android&version=4.1.1"
        var arr=[];
        var that = this
        Ajax.fetch(url,function(data){
            // console.log(data.data["725"])
            for(var i of data.data["725"]){
				arr.push(i)
            };
            that.setState({
                list:arr
            })
            // console.log(arr)
        },function(err){})
   
    }
    zhuan(bannerId,pictitle){
    
        hashHistory.push({
            pathname:"/listlist",
            query:{
               bannerId:bannerId ,
               pictitle:pictitle,
               num:0
            }
        })
    }
    render(){
        var arr=this.state.list;
        var arr1=[];
        for(var i in arr){
            arr1.push(<div key={i} onClick={this.zhuan.bind(this,arr[i].adlink,arr[i].pictitle)}><img src={arr[i].filename}/></div>)
        }
        return(
            <div className="homelist1">
                {arr1}
            </div>
        )
    }
}