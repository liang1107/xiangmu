



import "./../scss/search.scss"
import React from "react";
import ReactDOM from "react-dom";
import Ajax from "./../MyAjax.js";
import {hashHistory} from "react-router"



import List from "./list.js"

export default 
class App extends React.Component{
	constructor(props){
		super(props)
		this.state={
			search:[],
			list:[],
			inp:[],
			key:''
		}
		
	}
	componentWillMount(){
		var that=this
		var url="http://w.lefeng.com/api/neptune/search/hot_keywords/v1?count=10&highlight=1"
		Ajax.fetch(url,function(data){
			
			var arr =[]
			var date=data.data
		
			for (var i = 0; i < date.length; i++) {
				arr.push(date[i])
			}
			that.setState({
				search:arr
			})
		},function(err){console.log(err)})
	}
	back(){
		window.history.go(-1)
	}
	detail(gid,bannerId){
		//  console.log("点击了")
        hashHistory.push({
            pathname:"/detail",
            query:{
                gid:gid,
                bannerId:bannerId
            }
        })
    }
	chack(){
		var that=this
		console.log(this.refs.chack.value)
		var val = this.refs.chack.value;

		var url ="http://w.lefeng.com/api/neptune/search/suggestion/v1?keyword="+val+"&count=15"
		if(val==" "){
			that.refs.hot.style.display="block";
			
			that.refs.list.style.display="none";
		}
		Ajax.fetch(url,function(data){
			that.refs.hot.style.display="none";
			
			that.refs.list.style.display="block";
			// console.log(data)
			var list1=data.data
			// console.log(list1)
			that.setState({
				list:list1
			})
		},function(err){})
	}

	list(event){
		var that=this
		console.log(event.target.innerHTML)
		this.refs.list.style.display="none";
		this.refs.list1.style.display="block";
		this.refs.cat2.style.display="block";
		that.refs.hot.style.display="none";
		this.refs.chack.value="";
		this.refs.chack.disabled="disabled"
		var key=event.target.innerHTML

		that.setState({
			key:key
		})	 
		// console.log(key,"aaaaa")
        var url="http://w.lefeng.com/api/neptune/search/search_by_keyword/v1?keyword="+key+"&page=1";
       
		Ajax.fetch(url,function(data){
             var arr=that.state.inp;
           var obg=data.data
            // console.log(obg)
            for(var i in obg){
                arr.push(<div key={i} className="wu" onClick={that.detail.bind(that,obg[i].goods.gid,obg[i].goods.brandId)} >
                    <img src={obg[i].goods.image}/>
                    <div className="right">
                     <p>{obg[i].goods.brandStoreName}</p>
                     <p>{obg[i].goods.productName}</p>
                     <p>{obg[i].goodsStock.saled+"人购买"}</p>
                     <p>￥{obg[i].goods.vipshopPrice}<span>￥{obg[i].goods.marketPrice}</span>
				 <i className="iconfont cat" data-gid={obg[i].goods.gid} data-brandId={obg[i].goods.brandId}
                onClick={that.even.bind(this)}>&#xe604;</i> </p>
                    </div>
                </div>)
			}
			console.log(arr)
			that.setState({
					inp:arr,
					key1:arr.length
				})
				// console.log(that.state.inp)
			
		},function(err){})
	


		
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
    //    })
       






        

    }
	 
	top(even){
		// console.log(even.target)
		var that=this
		var top=even.target.scrollTop;
		var height=even.target.scrollHeight;
		var height1=document.getElementsByTagName("body")[0].clientHeight;
		// console.log(top,height,height1)
		var  num=1
		var key=this.state.key
		var key1=Number(this.state.key1)+1
		// console.log(key1)
		if(height1==height-top){
			// console.log(111111111111111111111111)
			num++
			var url="http://w.lefeng.com/api/neptune/search/search_by_keyword/v1?keyword="+key+"&page="+num;

			Ajax.fetch(url,function(data){
             var arr=that.state.inp;
           var obg=data.data
            // console.log(obg)
            for(var i in obg){
                arr.push(<div key={key1+i} className="wu" onClick={that.detail.bind(that,obg[i].goods.gid,obg[i].goods.brandId)}>
                    <img src={obg[i].goods.image}/>
                    <div className="right">
                     <p>{obg[i].goods.brandStoreName}</p>
                     <p>{obg[i].goods.productName}</p>
                     <p>{obg[i].goodsStock.saled+"人购买"}</p>
                     <p>￥{obg[i].goods.vipshopPrice}<span>￥{obg[i].goods.marketPrice}</span>
				 <i className="iconfont cat" data-gid={obg[i].goods.gid} data-brandId={obg[i].goods.brandId}
                onClick={that.even.bind(this)}>&#xe604;</i> </p>
                    </div>
                </div>)
			}
			// console.log(arr)
			that.setState({
					inp:arr,
					key1:arr.length
				})
				// console.log(that.state.inp)
			
		},function(err){})



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
	render(){
		var arr1=[];
		var search = this.state.search;
		
		for (var i = 1; i < search.length; i++) {
			
		arr1.push(<span className={'light'+search[i].ishighlight} key={i} onClick={this.list.bind(this)}>{search[i].word}</span>)
		}

	
		var arr2=[];
		var list = this.state.list;
		for (var i = 0; i < list.length; i++) {
			arr2.push(<li key={i} onClick={this.list.bind(this)}>{list[i]}</li>)
		}

		return(
			<div className="type" onScroll={this.top.bind(this)} ref="top">
				<hender id="hender">
					<div className="searchHeader">
						<div className="goods">
							<input ref="chack" onChange={this.chack.bind(this)} type="text" placeholder="搜索商品" />
						</div>
						<div className="title">
							<span onClick={this.back.bind(this)} className="xiao">取消</span>
						</div>
						<div onClick={this.back.bind(this)} className="moreInfo iconfont">&#xe621;</div>
					</div> 
				</hender>
          		<div  ref="hot" id="content">
          			<p>
          				大家都在搜
          			</p>
          			<p>
						{arr1}
          			</p>
          		
          		</div>

          		<div ref="list" className="list">
	          		<ul>
						{arr2}
	          		</ul>
          		</div>
				
				<div ref ="list1" className="dlist1">
					<List  inp={this.state.inp} />
				</div>
				  <div className="dong1" ref="dong">1</div>
				  <div className="cat2" ref="cat2">
						<div className="iconfont cat1" onClick={this.goods.bind(this)}>&#xe604;</div>
						<div className="iconfont dong" onClick={this.hui.bind(this)}>
							&#xe665;
								<br/>
							顶部
						</div>
				  </div>
				
			</div>


			)
	}
	componentDidMount(){
		$(".cat2").css({
			display:"none"
		})
	}

	
	
}