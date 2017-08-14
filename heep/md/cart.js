





import "./../scss/cart.scss"
import React from "react";
import ReactDOM from "react-dom";
import Ajax from "./../MyAjax.js";
import {hashHistory,Link} from "react-router"





export default 
class Cart extends React.Component{
	constructor(props){
		super(props)
		this.state={
            goods:[],
            ji:0,
          
        }
		
    }
    
    componentWillMount(){
        var arr=[]
        var that=this
        if(localStorage.getItem("goods")){
            var obg=JSON.parse(localStorage.getItem("goods"))
            var arr=[1]
            this.setState({
                goods:arr
            })
            console.log(obg);
            var id=0
            for(let i in obg){
                    var key=obg[i].gid;
                     var   word=obg[i].brandId;
                 var url="http://w.lefeng.com/api/neptune/goods/detail_with_stock/v1?needBrandInfo=true&gid="+key+"&brandId="+word
                 var goods=[1]
            
             Ajax.fetch(url,function(data){
                 console.log(data.data.goods)
                
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
            console.log("qqqq")
             this.setState({
                goods:arr
            })
        }
       
       
       
       
       
    }
    back(){
        window.history.back()
    }
    jia(id,index){
        // console.log(index,id);
        
       var num= Number($(".goodslist li").eq(index).find(".tian").html())+1
       $(".goodslist li").eq(index).find(".tian").html(num)
       var arr=JSON.parse(localStorage.getItem("goods"));
       for(let i in arr){
            if(id==arr[i].gid){
                console.log(111111, arr[i].num)
                arr[i].num++
                console.log(arr[i])
                this.setState({
                    ji:1,
                    index:index+1

                })
            }
       }
        localStorage.setItem("goods",JSON.stringify(arr))
        // console.log(localStorage.getItem("goods"))
         
    
    }
    jian(id,index){
        console.log(index,id);
        console.log($(".goodslist li").eq(index).find(".tian").html())
        this.setState({
                    ji:-1,
                    index:index+1

                })
       var num= Number($(".goodslist li").eq(index).find(".tian").html())-1;
       var arr=JSON.parse(localStorage.getItem("goods"));
       console.log(typeof num)
          if(num ==0){
              console.log("aaaaa")
            for(let i in arr){
                console.log(id)
                    if(id==arr[i].gid){
                        console.log("删除商品", arr[i].num)
                        console.log($(".goodslist li").eq(index))
                        $(".goodslist li").eq(index).css({
                            display:"none"
                        })

                    arr.splice(i,1);
                    console.log(arr)
                     
                    localStorage.setItem("goods",JSON.stringify(arr))
                    }
            }
       }
       $(".goodslist li").eq(index).find(".tian").html(num)
       
    
       for(let i in arr){
            if(id==arr[i].gid){
                console.log(2222222, arr[i].num)
                arr[i].num--
            }
       }
        localStorage.setItem("goods",JSON.stringify(arr))
        console.log(localStorage.getItem("goods"))
        
    }
    delete(id,index){
         var arr=JSON.parse(localStorage.getItem("goods"));
         for(let i in arr){
                console.log(id)
                    if(id==arr[i].gid){
                        
                        console.log("删除商品", arr[i].num)
                         this.setState({
                                ji:-arr[i].num,
                                index:index+1

                            })
                        console.log($(".goodslist li").eq(index))
                        $(".goodslist li").eq(index).css({
                            display:"none"
                        })
                    arr.splice(i,1);
                    console.log(arr);
                    if(arr.length==0){
                        this.setState({
                            goods:[]
                        })
                    }
                    localStorage.setItem("goods",JSON.stringify(arr))
                    }
            }
    }
    jiesuan(){
       var pay= $(".pay").eq(0).html()
       console.log(pay);
       hashHistory.push({
           pathname:"/pay",
           query:{
               pay:pay
           }
       })
    }
    render(){
        var arr=this.state.goods;
        console.log(arr)
        var arr2=[]
        var arr1=[]
        console.log(arr,"货物")
        var money=0
        for(var i=1;i<arr.length;i++){
            money=money+arr[i].vip*arr[i].num
            arr2.push(<li key={i} data-index={arr[i].id}>
                <img src={arr[i].src}/>
                <div className="right">
                    <p>{arr[i].name}</p>
                    <p>￥<span className="vip">{arr[i].vip}</span></p>
                    <div className="jia">
                        <span onClick={this.jian.bind(this,arr[i].id,arr[i].index)}>-</span>
                        <span className="tian">{arr[i].num}</span>
                        <span onClick={this.jia.bind(this,arr[i].id,arr[i].index)}>+</span>
                        <i className="right" onClick={this.delete.bind(this,arr[i].id,arr[i].index)}>X</i>
                    </div>
                </div>
            </li>)
        }
       
        console.log(money,this.state.ji)
        if(arr.length==0||localStorage.getItem("goods")=="[]"){
            arr1.push(<div key="1" className="nogoods">
                <p className="iconfont"> &#xe604;</p>
                <p> 购物车为空哦~</p>
                <p> 赶紧抢点东西犒劳自己吧~~</p>
                <div className="guang"><Link to="/">去首页逛逛</Link></div>
                
                </div> )
        }else{
            //在上面获取goodsID进行ajax请求 ，
            arr1.push(<div key="1" className="goods">
                <h1>乐蜂</h1>
                <ul className="goodslist">
                   {arr2}
                </ul>
                <p>商品合计：<span className="right ">￥<span className="pay">{money}</span></span></p>
                 <div className="xia">
                      <span className="iconfont pay" >待支付：￥{money}</span>
                      <div className="right" onClick={this.jiesuan.bind(this)} >结算</div>
                  </div>
            </div>)
        }
        return(
            <div className="cart">
                <div className="carthead">
                    <div className="back iconfont" onClick={this.back.bind(this)}>&#xe600;</div>
                    购物车
                </div>
              
              {arr1}
             
            </div>
        )
    }
    componentDidUpdate(){
        console.log(this.state.index,this.state.ji);
        if(this.state.index){
           var a=Number($(".vip").eq(this.state.index-1).html())
            console.log(a)
           var pay= Number($(".pay").eq(0).html())+a*this.state.ji
           console.log(Number($(".pay").eq(0).html()),a*this.state.ji)
           $(".pay").eq(0).html(pay)
           $(".pay").eq(1).html("待支付：￥"+pay)
        }
    }
}