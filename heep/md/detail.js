





import "./../scss/detail.scss"
import React from "react";
import ReactDOM from "react-dom";
import Ajax from "./../MyAjax.js";
import {hashHistory,Link} from "react-router"


import Listhead from "./listhead.js"


export default 
class Listlist extends React.Component{
	constructor(props){
        super(props)
        this.time=null
		this.state={
            goods:[],
            key:"",
            num:1,
            kai:0,
            ji:0
        }
		
    }
    
    componentWillMount(){
        var that = this
        
            var word=this.props.location.query.bannerId;
            var key=this.props.location.query.gid;
       
        
      console.log(localStorage.getItem("shou"))
         if(localStorage.getItem("shou")){
             console.log("进入")
             var arr=JSON.parse(localStorage.getItem("shou"));
               
                for(var i in arr){
                    
                    if(key==arr[i].gid){
                        this.setState({
                            kai:1
                           
                        })
                    
                    }
                }
               
            

         }
        
          this.setState({
            key:key,
            word:word
        })
    
      var url="http://w.lefeng.com/api/neptune/goods/detail_with_stock/v1?needBrandInfo=true&gid="+key+"&brandId="+word
      Ajax.fetch(url,function(data){
        //   console.log(data)
          var arr=data.data
          that.setState({
            goods:arr
        })
        // console.log(that.state.goods)
      },function(){})
    //   this.time1()
    }
    time1(){
        var that=this
        this.time=setInterval(function(){
           var ji= that.state.ji;
           ji++;
            that.setState({
                ji:ji
            })
        },1000)
    }
    back(){
        window.history.back()
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
    more(){
        this.refs.imgs1.style.display="block";
        this.refs.imgs2.style.display="none";
       
    }
    tap(){
        this.refs.tap1.style.display="block";
        this.refs.tap2.style.display="none";
        this.refs.g1.style.color="red";
        this.refs.g1.style.borderColor="red";
        this.refs.g2.style.color="#000";
        this.refs.g2.style.borderColor="#fff";
    }
     tap1(){
        this.refs.tap2.style.display="block";
        this.refs.tap1.style.display="none";
        this.refs.g2.style.color="red";
        this.refs.g2.style.borderColor="red";
        this.refs.g1.style.color="#000";
        this.refs.g1.style.borderColor="#fff";
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
          
         $("body").remove(dong)
       })



    //      $(".dong1").css({
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
    shou(even){
         var word=this.props.location.query.bannerId;
        var key=this.props.location.query.gid;
        console.log(word,key)
        // 将物品信息保存到本地
     console.log(this.state.kai)
        if(this.state.kai==0){
            if(!localStorage.getItem("shou")){
                var obg=[{
                    gid:key,
                    brandId:word
                    
                }]
                localStorage.setItem("shou",JSON.stringify(obg))
            }else{
                var arr=JSON.parse(localStorage.getItem("shou"));
                console.log(arr,"aaaa")
                var guo=0
                for(var i in arr){
                    
                    if(key==arr[i].gid){
                   
                     guo=1;
                    }
                }
                if(guo==0){
                    var obg={
                        gid:key,
                        brandId:word
                       
                    }
                    arr.push(obg);
                }
                
                localStorage.setItem("shou",JSON.stringify(arr))
            }


           
           even.target.innerHTML="&#xe619;"
            even.target.style.color="red" 
            this.setState({
                kai:1
            })
        }else{
             even.target.innerHTML="&#xe668;"
            even.target.style.color="#A3A3A3"

            var key=this.props.location.query.gid;
       
       
         
                var arr=JSON.parse(localStorage.getItem("shou"));
                console.log(arr,"aaaa")
               
                for(var i in arr){
                    
                    if(key==arr[i].gid){
                   
                        arr.splice(i,1)
                      console.log(arr)
                    }
                }
                
                    arr.push(obg);
             var str = JSON.stringify(arr)
                    console.log(str,1)
                  str=  str.replace(",null","")
                    console.log(str,2)
                localStorage.setItem("shou",str)
           this.setState({
                kai:0
            }) 


            
        }
        
    }
    render(){
        var arr1=this.state.goods
     
      if(arr1.goods){
          var arr=[]
          var arr3=[];
        var key=arr1.goods.name;
        var arr2=arr1.goods.descriptions;
        
        // console.log(arr2)
        for(var i in arr2){
           
            arr3.push(<ul key={i}>
                            <li>{arr2[i].name}</li>
                            <li>{arr2[i].value}</li>
                        </ul>)
       
    
    var arr4=arr1.goods.detailImage;
    
    var arr5=[]
    for(var j in arr4){
        arr5.push(<img src = {arr4[j]} key={j} />)
    }
    
    
    
    
    }
// console.log(arr1,"bbbbbb")
        arr.push(<div key="1" className="detail">
                <img className="godimg" src={arr1.goods.middleImage[0]}/>
                <div className="name">{arr1.goods.name}<span className="right iconfont shou" ref="shou" onClick={this.shou.bind(this)}>&#xe668;</span></div>
                <div className="jia">￥<b>{arr1.goods.vipshopPrice} </b> &nbsp;<span> ￥{arr1.goods.marketPrice}</span></div>
                <div className="xian"></div>
                <div className="fen"><span>花粉{this.state.ji}</span>{arr1.goods.pollenTips}</div>
                <div className="xian"></div>
                <ul className="shang">
                    <li onClick={this.tap.bind(this)} ref="g1">商品信息</li>
                    <li onClick={this.tap1.bind(this)} ref="g2">购物说明</li></ul>
                <div className="tap"  ref="tap1">
                    <div className="tap1">
                        <p>该商品均在国外采购</p>
                        <p>预计送达时间：{arr1.goods.expectDeliveryData}</p>
                    </div>
                     <div className="uls">
                         {arr3} 
                    </div> 
                    <div className="imgs" ref="imgs2" onClick={this.more.bind(this)}>点击查看图片详情</div>
                    <div className="imgs1" ref="imgs1">
                            {arr5}
                    </div>
                </div>
                <div className="tap tap3" ref="tap2">
                   <h3>关于商品</h3>
                   <p>乐蜂网上所售卖的商品均经过品牌授权，确保正品，并由中国太平洋财产
                       保险股份有限公司为您购买的每一件商品进行承保。</p>
                    <h3>商品价格说明</h3>
                   <p>乐蜂展示的中间未划横线价格（显示如¥799）为乐蜂销售价，该价格是交易成交价
                       ，是您最终决定是否购买商品的依据。</p>
                    <p>乐蜂展示的中间划横线价格（显示如￥1399）为参考价，采集自品牌专柜标价、商品吊牌价或由品牌供应商提供的正品零售价；由于地区
                        、时间的差异性和市场行情波动，品牌专柜标价、商品吊牌价可能会与您购物时展示的不一致。该价格仅供您参考。</p>
                    <h3>售后说明</h3>
                    <p >在您签收商品之日起的7天之内，乐蜂为您提供七天无理由放心退服务，但以下情形将不能退货：</p>
                    <p> </p><p>1、非乐蜂销售的商品，或有明显使用痕迹影响二次销售的商品；</p>
                    <p>2、法律明确规定不适用七天无理由退货的商品；</p>
                    <p>3、基于安全及健康的考虑，已拆封的食品、药品、保健品、化妆品、贴身用品等；</p>
                    <p>4、已经激活的手机、电脑、数码产品等；</p><p>5、已在线交付的充值类商品；</p>
                    <p>6、未经授权的维修、误用、碰撞、疏忽、滥用、进液、事故、改动、不正确的安装所造成的商品质量问题，或撕毁、涂改标贴、机器序号、防伪标记；</p>
                    <p>7、无法提供商品的发票（如已索要发票）、保修卡等三包凭证或者三包凭证信息与商品不符及被涂改的；</p>
                    <p>8、礼包或套装中的商品不可以部分退换货。上述退货规则，客户一经购买，视为认可。</p>
                    <h3>消费者告知书</h3>
                    <p>尊敬的客户：</p><p>您好！</p>
                    <p >为帮助您更好地选购境外商品，请您在购买前务必认真、详细阅读并完全理解本告知书的全部内容，并对自身风险承担做出客观判断。同意本告知书内容后再下单购买：</p>
                    <p>1. 您在本（公司）网站购买的境外商品等同于原产地直接销售商品，因此商品本身可能无中文标签，如果需要您可以通过网站查看相关商品标签中文翻译或联系客服。</p>
                    <p >2. 根据相关法律政策，您选购的境外商品仅限于个人自用，不得进行再次销售。</p>
                    <p >3.您购买的境外商品符合原产地有关品质、健康、标识的相关标准，与我国产品标准或有所不同，由此可能造成的危害、损失或者其他风险，本（公司）网站不承担责任！</p>
                    <p className="right">谢谢！</p>
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
            </div>)
      }
    //   console.log(key)
           
            
         

        
        return(
            <div className="detaillist" ref="top" >
                <div className="detaillisthead">
                   <div className="back iconfont" onClick={this.back.bind(this)} >&#xe600;</div>
                   {key}
                    <div className="iconfont right" ><Link to="/">&#xe621;</Link></div>
                </div>
               
                 <div className="goods">
                     {arr} 
                </div>


                 <div className="cat2" id="detailcat">
						
						<div className="iconfont dong" onClick={this.hui.bind(this)}>
							&#xe665;
								<br/>
							顶部
						</div>
				  </div>


                  <div className="xia">
                      <span className="iconfont"><a href="#/cart">&#xe604;</a></span>
                      <div className="right" data-gid={this.props.location.query.gid} data-brandId={this.props.location.query.bannerId}
                      onClick={this.even.bind(this)}
                      >加入购物车</div>
                  </div>

                   <div className="dong1" ref="dong">1</div>
              
            </div>
        )
    }
  
    componentDidUpdate(){
        //  this.refs.tap2.style.display="none";
         var key=this.props.location.query.gid;
         if(localStorage.getItem("shou")){
              var arr=JSON.parse(localStorage.getItem("shou"));
               
                for(var i in arr){
                    
                    if(key==arr[i].gid){
                        this.refs.shou.innerHTML="&#xe619;"
                        this.refs.shou.style.color="red"
                    
                    }
                }
               
            

         }


       




      
    }
}