





import "./../scss/homelist1.scss"
import React from "react";
import ReactDOM from "react-dom";
import Ajax from "./../MyAjax.js";
import {hashHistory} from "react-router"





export default 
class Homelist2 extends React.Component{
	constructor(props){
		super(props)
		this.state={
            list:[]
        }
		
    }
    
    componentWillMount(){
        var url="http://w.lefeng.com/api/neptune/special_brands/v3?page=1&labelType=1"
        var arr=[];
        var that = this
        Ajax.fetch(url,function(data){
            
            for(var i of data.data){
				arr.push(i)
            };
            that.setState({
                list:arr
            })
           
        },function(err){})
   
    }
     zhuan(bannerId,pictitle,num){
    
        hashHistory.push({
            pathname:"/listlist",
            query:{
               bannerId:bannerId ,
               pictitle:pictitle,
               num:num
            }
        })
    }
    render(){
        var arr=this.state.list;
        var arr1=[];
        var shu=this.props.shu
        
        var arr= arr.concat(shu);
        // console.log(arr)
        for(var i in arr){
           
            if(arr[i].starProductList){
                var ar=[]
                for(var j in arr[i].starProductList){
                    ar.push(<div data-brandId={arr[i].starProductList[j].starProductList} className="swiper-slide" key ={j}>
                       <div className="img1" data-brandId={arr[i].starProductList[j].brandId}>
                       <img src={arr[i].starProductList[j].image}/>
                       <div className="qian">￥{arr[i].starProductList[j].vipshopPrice}</div>
                        </div>


                    </div>)
                }

                 arr1.push(<div className="ls1tu" data-bid={arr[i].bid} key={i} onClick={this.zhuan.bind(this,arr[i].bid,arr[i].name,0)}>
                     <img src={arr[i].brandImage}/>
                     <div className="swiper-container" className="holi2">
                        <div className="swiper-wrapper">
                           {ar}
                           
                        </div>
                    </div> 
                    </div>)

            }else{
                    arr1.push(<div onClick={this.zhuan.bind(this,arr[i].bid,arr[i].name,0)} className="ls1tu" data-bid={arr[i].bid} key={i}><img src={arr[i].brandImage}/>
                        <p><span>{arr[i].agio}</span>{arr[i].name}</p>
                    </div>)
            }
            
        }
       
        
        return(
            <div className="homelist2">
                {arr1}
            </div>
        )
    }
     componentDidUpdate(){
         var swiper = new Swiper('.holi2', {
                slidesPerView: 4,
                paginationClickable: true,
                spaceBetween: 0,
                freeMode: true
            });
     }
}