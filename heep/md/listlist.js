





import "./../scss/listlist.scss"
import React from "react";
import ReactDOM from "react-dom";
import Ajax from "./../MyAjax.js";
import {hashHistory,Link} from "react-router"


import Listhead from "./listhead.js"


export default 
class Listlist extends React.Component{
	constructor(props){
		super(props)
		this.state={
            goods:[],
            key:"",
            num:1,
            search:[],
            index:0,
            xuan:{}
        }
		
    }
    
    componentWillMount(){
        var that = this
        var num=this.props.location.query.num;
        console.log(num,this.props.location.query.bannerId,this.props.location.query.pictitle)
        if(num==0){
             console.log(this.props.location.query.bannerId.split("="))
            var arr=this.props.location.query.bannerId.split("=")
            var key=this.props.location.query.pictitle.split(" ")[0]
            var word=arr[arr.length-1]
            // console.log(key);
        }else{
            var word=this.props.location.query.bannerId;
            var key=this.props.location.query.pictitle;
        }
       
      
        
          this.setState({
            key:key,
            word:word
        })
        localStorage.setItem("index",this.state.index)
        console.log("bbbbbbb",this.state.xuan)
        localStorage.setItem("xuan",JSON.stringify(this.state.xuan))

      var url="http://w.lefeng.com/api/neptune/goods/list_with_stock/v1?brandId="+word+"&start=1"
      Ajax.fetch(url,function(data){
        //   console.log(data)
          var arr=data.data
          that.setState({
            goods:arr
        })
        // console.log(that.state.goods)
      },function(){})

      var url1="http://w.lefeng.com/api/neptune/goods/get_thirdcat_size/v1?brandId="+word
      Ajax.fetch(url1,function(data){
          console.log(data)
          var ar=data.data
          that.setState({
            search:ar
        })
        // console.log(that.state.goods)
      },function(){})



    
    }
    back(){
        window.history.back()
    }
    top(even){
        var that=this
		var arr=this.state.arr
		var top=even.target.scrollTop;
		
		var height=even.target.scrollHeight;
		var height1=document.getElementsByTagName("body")[0].clientHeight;
		var num =this.state.num;
        var word=this.state.word;
        if(top>=500){
		
		that.refs.don.style.display="block"
        }else{
            that.refs.don.style.display="none"
        }
		if(height1==height-top){
			console.log("加载数据")
            num++;
            that.setState({
                num:num
            })
            if(JSON.parse(localStorage.getItem("xuan"))){
                 var arr=JSON.parse(localStorage.getItem("xuan"))
                    var str="";
                    for(var i in arr){
                    
                            str=str+i+"="+arr[i]+"&";
                    }
                    str= str.split("")
                    str.pop()
                    str=str.join("")
                    console.log(str)
                    console.log(num)
            var url="http://w.lefeng.com/api/neptune/goods/list_with_stock/v1?brandId="+this.state.word+"&start="+num+"&"+str
                console.log(url)
            }else{
                var url="http://w.lefeng.com/api/neptune/goods/list_with_stock/v1?brandId="+word+"&start="+num
             
            }
             Ajax.fetch(url,function(data){
                 console.log(data,"加载更多")
                 var arr=that.state.goods;
               
                var arr=arr.concat(data.data)
                that.setState({
                    goods:arr
                })
                
            },function(){})
        
         }
    }
    	hui(){
		var top=this.refs.top;
		
		
		top.scrollTop=0
		
	}
	goods(){
		hashHistory.push({
			pathname:"/cart",
			query:{
				goods:""
			}
		})
    }
    detail(gid,bannerId){
        hashHistory.push({
            pathname:"/detail",
            query:{
                gid:gid,
                bannerId:bannerId
            }
        })
    }
    even(e){
        e.stopPropagation();
        var cart =e.target;
        var gid=cart.getAttribute("data-gid")
        var brandId=cart.getAttribute("data-brandId")
        console.log(!localStorage.getItem("goods"))
        if(!localStorage.getItem("goods")){
            var obg=[{
                gid:gid,
                brandId,brandId,
                num:1
            }]
            localStorage.setItem("goods",JSON.stringify(obg))
        }else{
            var arr=JSON.parse(localStorage.getItem("goods"));
            var guo=0
            for(var i in arr){
                
                if(gid==arr[i].gid){
                  arr[i].num=  Number(arr[i].num)+1
                  guo=1;
                }
            }
            if(guo==0){
                var obg={
                    gid:gid,
                    brandId,brandId,
                    num:1
                }
                arr.push(obg);
            }
             
            localStorage.setItem("goods",JSON.stringify(arr))
        }
        console.log("点击了",gid)



        //动态；
        var dong=$("<div class='dong1'>1</div>")
        $("body").append(dong)



         dong.css({
           display:"block"
       });
      dong.animate({
           bottom:"10%",
           left:"20px",
           opacity:0
       },1000,function(){
          
         $(".dong1").remove()
       })

    //    $(".dong1").css({
    //        display:"block"
    //    });
    //    $(".dong1").animate({
    //        bottom:"10%",
    //        left:"20px",
    //        opacity:0
    //    },1000,function(){
          
    //         $(".dong1").css({
    //         display:"none",
    //         bottom:"50%",
    //         left:"50%",
    //         opacity:1
    //     })
    //       $("body").remove(dong)
    //    })
          

    }
     shai(){
        $(".ce").animate({
            left:"0"
        },500)
    }
    shai1(){
        $(".ce").animate({
            left:"100%"
        },500)
        
    }
    xuan(n){
        console.log(11111)
        var n =n +1
        localStorage.setItem("index",n);
        var xuan= $(".ce ul li").eq(n).html()
         console.log($(".ce ul li").eq(n).html())
         if(n>0){
             
            
             var xuan1={
                catName3:xuan
             }
            
              this.setState({
                    xuan:xuan1
                })
             
             
           
         }
        this.setState({
            index:n
        })
    }
    que(){
        var that=this;
       var obg=JSON.parse(localStorage.getItem("xuan"));
        obg.catName3=this.state.xuan.catName3;
        localStorage.setItem("xuan",JSON.stringify(obg));
        var arr=JSON.parse(localStorage.getItem("xuan"))
        console.log("aaaaa",arr)
        console.log(this.state.word)
        var str="";
        for(var i in arr){
           
                str=str+i+"="+arr[i]+"&";
        }
           str= str.split("")
           str.pop()
           str=str.join("")
        console.log(str)
        var url="http://w.lefeng.com/api/neptune/goods/list_with_stock/v1?brandId="+this.state.word+"&start=1&"+str
        console.log(url)
         Ajax.fetch(url,function(data){
            
                 var arr=[];
                console.log(arr)
                var arr=arr.concat(data.data)
                that.setState({
                    goods:arr
                })
                
            },function(err){console.log(err)})

        console.log(this.state.xuan)
        this.shai1()
    }
    xu(sort){
       var that =this
        console.log(localStorage.getItem("xuan"));
        var obg=JSON.parse(localStorage.getItem("xuan"));
        obg.sort=sort;
        console.log(obg)
        localStorage.setItem("xuan",JSON.stringify(obg));
        var arr=JSON.parse(localStorage.getItem("xuan"))
        console.log("aaaaa",arr)
        console.log(this.state.word)
        var str="";
        for(var i in arr){
           
                str=str+i+"="+arr[i]+"&";
        }
           str= str.split("")
           str.pop()
           str=str.join("")
        console.log(str)
        var url="http://w.lefeng.com/api/neptune/goods/list_with_stock/v1?brandId="+this.state.word+"&start=1&"+str
        console.log(url)
         Ajax.fetch(url,function(data){
            
                 var arr=[];
                console.log(arr)
                var arr=arr.concat(data.data)
                that.setState({
                    goods:arr
                })
                
            },function(err){console.log(err)})
    }
    render(){
        //  console.log($(".ce ul li").eq(this.state.index))
         console.log(this.state.xuan)
        var arr1=this.state.goods
    //   console.log(arr1)
        var arr =[]
        for(var i=0;i< arr1.length ;i++){
           
            arr.push(<div key={i} className="good" onClick={this.detail.bind(this,arr1[i].goods.gid,arr1[i].goods.brandId)}>
                <img src={arr1[i].goods.image}/>
                <p><b>{arr1[i].goods.brandStoreName}</b>{arr1[i].goods.name.replace(arr1[i].goods.brandStoreName,"",1)}</p>
                <p><b>￥{arr1[i].goods.vipshopPrice}</b><span className="xi">￥{arr1[i].goods.marketPrice}</span>
                <span className="iconfont right" data-gid={arr1[i].goods.gid} data-brandId={arr1[i].goods.brandId}
                onClick={this.even.bind(this)}
                > &#xe604;</span></p>
            
            </div>)
        }


        // li列表
        var ar =this.state.search;
        var ar1=[];
        if(ar.length>20){
            ar1=[]
        }else{
            for(var n=0;n<ar.length;n++){
            
                ar1.push(<li key={n} onClick={this.xuan.bind(this,n)}>{ar[n].thirdCatName}</li>)
            }
       }
        return(
            <div className="listlist" ref="top" onScroll={this.top.bind(this)}>
                <div className="listlisthead">
                   <div className="back iconfont" onClick={this.back.bind(this)}>&#xe600;</div>
                    {this.state.key}
                    <div className="iconfont right" ><Link to="/">&#xe621;</Link></div>
                </div>
                 <div className="listhead">
                        <ul>
                            <li onClick={this.xu.bind(this,"'%7B'vipshopPrice'%3A'asc'%7D'")}>价格</li>
                            <li onClick={this.xu.bind(this,"'%7B'sale'%3A'asc'%7D'")}>销量</li>
                            <li onClick={this.shai.bind(this)}>筛选</li>
                           
                        </ul>
                 </div>
                 <div className="goods">
                    {arr}
                </div>

                <div className="dibu">
                    <div className="shang">
                        <a href="#/">首页</a>
                        <a href="#/cart">购物车</a>
                        <a>客户端</a>
                    </div>
                    <p>联系客服400-000-1818</p>
                    <p>Copyright © 2008-2017 Lefeng.com All Rights Reserved</p>
                </div>

                 <div className="cat2">
						<div className="iconfont cat1" onClick={this.goods.bind(this)}>&#xe604;</div>
						<div className="iconfont dong" ref="don" onClick={this.hui.bind(this)}>
							&#xe665;
								<br/>
							顶部
						</div>
				  </div>
                  {/* <div className="dong1" ref="dong">1</div> */}

                   <div className="ce">
                        <div className="left"></div>
                        <div className="right">
                            <div className="cehead">
                                <span  onClick={this.shai1.bind(this)}>取消</span>
                                筛选
                            </div>
                            <div className="xian"></div>
                            <h3>分类</h3>
                            <ul>
                                <li onClick={this.xuan.bind(this,-1)}>全部</li>
                                {ar1}
                            </ul>
                            <div className="xian"></div>
                            <div className="cefooter" onClick={this.que.bind(this)}>确定</div>
                        </div>
                    </div>
              
            </div>
        )
    }
    componentDidUpdate(){
        // console.log("aaaaa")
        $(".ce ul li").eq(localStorage.getItem("index")).css({
            borderColor:"red"
        }).siblings().css({
            borderColor:"#eee"
        })
      
    }
}