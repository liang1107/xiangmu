





import "./../scss/homelist1.scss"
import React from "react";
import ReactDOM from "react-dom";
import Ajax from "./../MyAjax.js";
import {hashHistory} from "react-router"





export default 
class Banner1 extends React.Component{
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
            // console.log(data.data)
            for(var i of data.data["728"]){
				arr.push(i)
            };
            that.setState({
                list:arr
            })
            // console.log(arr)
        },function(err){})
   
    }
    render(){
        var arr=this.state.list;
        var arr1=[];
        for(var i in arr){
            if(i%5==4){
                arr1.push(<div key={i}  className="swiper-slide">
                    <img className="img" src={arr[i-4].filename}/>
                    <div className="imgs">
                        <img src={arr[i-3].filename}/>
                        <img src={arr[i-2].filename}/>
                        <img src={arr[i-1].filename}/>
                        <img src={arr[i].filename}/>
                    </div>
                    </div>)
            }
            
        }
        return(
            <div className="banner5">
              <div className="swiper-container" id="beebanner">
                    <div className="swiper-wrapper">
                        {arr1}
                      
                    </div>
                   
                    <div className="swiper-pagination" id="piont"></div>
                </div>
            </div>
        )
    }
    componentDidUpdate(){
         var swiper = new Swiper('#beebanner', {
            pagination: '#piont',
            paginationType : 'progress',
            paginationClickable: true

            
        });
    }
}