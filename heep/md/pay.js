





import "./../scss/pay.scss"
import React from "react";
import ReactDOM from "react-dom";
import Ajax from "./../MyAjax.js";
import {hashHistory,Link} from "react-router"
import Alert from "./console";




export default 
class Pay extends React.Component{
	constructor(props){
		super(props)
		this.state={
            add:[]
        }
		
    }
    
    componentWillMount(){
        if(localStorage.getItem("add")){
            var add=localStorage.getItem("add").split(",")
            console.log(add)
            this.setState({
                add:add
            })
        }else{
             Alert.alert(200,50,"地址必须填写")
           setTimeout(function(){
                hashHistory.push({
                    pathname:"/add"
                })
           },1000)
        }
        
    }
    back(){
        window.history.back()
    }
    sao(){
        $(".sao").animate({
            height:"33%"
        },2000)
        $(".saoma").css({
            display:"block"
        })
    }
    render(){
        console.log(this.props.location.query.pay)
        var add=this.state.add
       var arr=[]
       arr.push(<div key={1} className="xinxi">
           收货信息 <span>姓名：{add[0]},电话:{add[1]}</span>
       </div>)
        return(
            <div className="pay">
                <div className="payhead">
                    <div className="back iconfont" onClick={this.back.bind(this)}>&#xe600;</div>
                    支付
                    <div className="iconfont right" ><Link to="/">&#xe621;</Link></div>
                </div>
                <div className="xian"></div>
              {arr}
             <div className="xian"></div>
              <div className="xinxi ">费用详情</div>
              <div className="xinxi mag">商品总金额：<span>￥{this.props.location.query.pay}元</span></div>
               <div className="xinxi mag">运费免费：<span>￥0元</span></div>
              <div className="xian"></div>
               <div className="xinxi">支付方式<span onClick={this.sao.bind(this)}>扫一扫</span></div>
               <div className="sao">
                   <img src="./img/zhifu.png" alt="支付" title="支付"/>
               </div>
               <div className="saoma">请扫描上二维码进行支付</div>
            </div>
        )
    }
}