





import "./../scss/account.scss"
import React from "react";
import ReactDOM from "react-dom";
import Ajax from "./../MyAjax.js";
import {hashHistory,Link} from "react-router"
import Alert from "./console";




export default 
class Account extends React.Component{
	constructor(props){
		super(props)
		this.state={
            goods:[],
            id:[]
        }
		
    }
    clear(){
        localStorage.removeItem("id");
         var arr=[];
           arr.push(<div key='1'  className="yonhu1"><div className="div"></div><div className="yong"> <span><Link to="/login">登录</Link></span>/
                    <span><Link to="/login">注册</Link></span></div></div>)
        this.setState({
            id:arr
        })
    }
    componentWillMount(){
        console.log(localStorage.getItem("id"))
       if(localStorage.getItem("id")){
             var arr=[];
           arr.push(<div key='1' className="yonhu1"><div className="div"></div><div className="yong"> <span>用户名：{localStorage.getItem("id")} </span>
           
          <span onClick={this.clear.bind(this)}>  <Link to="/account" >注销</Link></span></div></div>)
        this.setState({
            id:arr
        })
       }else{
           var arr=[];
           arr.push(<div key='1'  className="yonhu1"><div className="div"></div><div className="yong"> <span><Link to="/login">登录</Link></span>/
                    <span><Link to="/login">注册</Link></span></div></div>)
        this.setState({
            id:arr
        })
    }
    }
    back(){
        window.history.back()
    }
    shou(){
        if(!localStorage.getItem("id")){
            console.log(100,80,"请先登录")
            Alert.alert(100,80,"请先登录")
            // alert("请先登录")

        }else{
            hashHistory.push({
                pathname:"/lick"
                
            })
        }
    }
    render(){
       var arr=this.state.id
        return(
            <div className="account">
                <div className="accounthead">
                    <div className="back iconfont" onClick={this.back.bind(this)}>&#xe600;</div>
                    我的蜂巢
                    <div className="iconfont right" ><Link to="/">&#xe621;</Link></div>
                </div>
                <div className="pink">
                    {arr}
                   
                </div>
                <div className="ding">
                    <div className="left ">我的订单</div>
                    <div className="right iconfont">全部订单 &#xe6c8;</div>
                </div>
                 <div className="dai">
                    <div><Link to="/cart">待支付</Link></div>
                    <div >待发货</div>
                    <div>待评价</div>
                </div>
                 <div className="fa">
                     <div className="fa1">
                        <Link to="/add"><div className="left ">收货区域</div>
                        <div className="right iconfont"><span>河南</span> &#xe6c8;</div></Link>
                    </div>
                </div>
                <div className="ding">
                    <div className="left ">我的优惠券</div>
                    <div className="right iconfont"> &#xe6c8;</div>
                </div>
                <div className="ding ding0">
                    <div className="left ">我的花粉</div>
                    <div className="right iconfont"> &#xe6c8;</div>
                </div>
                <div className="xian"></div>
                <div className="ding" onClick={this.shou.bind(this)}>
                    <div className="left" >我的收藏</div>
                    <div className="right iconfont"> &#xe6c8;</div>
                </div>
                <div className="ding">
                    <div className="left ">浏览记录</div>
                    <div className="right iconfont"> &#xe6c8;</div>
                </div>
                  <div className="xian"></div>
                 <div className="ding">
                    <div className="left ">意见反馈</div>
                    <div className="right iconfont"> &#xe6c8;</div>
                </div>
                <div className="ding">
                    <div className="left ">在线客服</div>
                    <div className="right iconfont"> &#xe6c8;</div>
                </div>
                <div className="ding">
                    <div className="left ">关于乐蜂</div>
                    <div className="right iconfont"> &#xe6c8;</div>
                </div>
                  <div className="xian"></div>
                <div className="dibu">
                    <div className="shang">
                        <a href="#/">首页</a>
                        <a href="#/cart">购物车</a>
                        <a>客户端</a>
                    </div>
                    <p>联系客服400-000-1818</p>
                    <p>Copyright © 2008-2017 Lefeng.com All Rights Reserved</p>
                </div>



            </div>
        )
    }
}