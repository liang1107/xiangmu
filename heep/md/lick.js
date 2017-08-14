





import "./../scss/lick.scss"
import React from "react";
import ReactDOM from "react-dom";
import Ajax from "./../MyAjax.js";
import {hashHistory,Link} from "react-router"





export default 
class Lick extends React.Component{
	constructor(props){
		super(props)
		this.state={
            goods:[]
        }
		
    }
    
    componentWillMount(){
        var arr=[]
        var that=this
        if(localStorage.getItem("shou")){
            var obg=JSON.parse(localStorage.getItem("shou"))
            var arr=[1]
            this.setState({
                goods:arr
            })
            // console.log(obg);
            var id=0
            for(let i in obg){
                    var key=obg[i].gid;
                     var   word=obg[i].brandId;
                 var url="http://w.lefeng.com/api/neptune/goods/detail_with_stock/v1?needBrandInfo=true&gid="+key+"&brandId="+word
                 var goods=[1]
            
             Ajax.fetch(url,function(data){
                //  console.log(data.data.goods)
                
                var obg1=data.data.goods
                var godobg={
                    src:obg1.verticalImage,
                    name:obg1.productName,
                    vip:obg1.vipshopPrice,
                    num:obg[i].num,
                    id:obg[i].gid,
                    index:id
                } 
                id++
                var arr=that.state.goods
                    arr.push(godobg);
                     that.setState({
                        goods:arr
                    })

             },function(){})
            
            
            
                }

        }else{
            var goods=[];//货物的id
            // console.log("qqqq")
             this.setState({
                goods:arr
            })
        }
       
       
       
       
       
    }
    back(){
        window.history.back()
    }
    
    delete(id,index){
         var arr=JSON.parse(localStorage.getItem("shou"));
         for(let i in arr){
                // console.log(id)
                    if(id==arr[i].gid){
                        console.log("删除商品", arr[i].num)
                        // console.log($(".goodslist li").eq(index))
                        $(".goodslist li").eq(index).css({
                            display:"none"
                        })
                    arr.splice(i,1);
                    // console.log(arr);
                    if(arr.length==0){
                        this.setState({
                            goods:[]
                        })
                    }
                    localStorage.setItem("shou",JSON.stringify(arr))
                    }
            }
    }
    render(){
        var arr=this.state.goods;
        // console.log(arr)
        var arr2=[]
        var arr1=[]
        console.log(arr,"货物")
       if(arr.length==1){
            arr2.push(
                <div className="mei" key={1}>没有任何收藏</div>
            )
       }else{
            for(var i=1;i<arr.length;i++){
            
                arr2.push(<li key={i} data-index={arr[i].id}>
                    <img src={arr[i].src}/>
                    <div className="right">
                        <p>{arr[i].name}</p>
                        <p>￥{arr[i].vip}</p>
                        <div className="jia">
                            
                            
                        
                            <i className="right" onClick={this.delete.bind(this,arr[i].id,arr[i].index)}>X</i>
                        </div>
                    </div>
                </li>)
            }
        
         }   //在上面获取goodsID进行ajax请求 ，
            arr1.push(<div key="1" className="goods">
                <h1>乐蜂</h1>
                <ul className="goodslist">
                   {arr2}
                </ul>
                
                 
            </div>)
       
        return(
            <div className="lick">
                <div className="lickhead">
                    <div className="back iconfont" onClick={this.back.bind(this)}>&#xe600;</div>
                    我的收藏
                </div>
              
              {arr1}
             
            </div>
        )
    }
}