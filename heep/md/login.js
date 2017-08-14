





import "./../scss/login.scss"
import React from "react";
import ReactDOM from "react-dom";
import Ajax from "./../MyAjax.js";
import {hashHistory,Link} from "react-router"





export default 
class Login extends React.Component{
	constructor(props){
		super(props)
		this.state={
           
        }
		
    }
    
    componentWillMount(){
      
    }
    back(){
        window.history.back()
    }
    deng1(){
                 var nameid=this.refs.user.value; var kai=this.state.kai
                 if(kai==1){
                     var password=this.refs.mi2.value;
                 }else{
                     var password=this.refs.mi1.value;
                 }
                    console.log(nameid,password)
				if(nameid==""||password==""){
					alert("用户名或密码不能为空")
				}else{
					var arr=JSON.parse(localStorage.getItem("user"))
					var cun=0
					for (var user of arr) {
						if(user.nameid==nameid){
							cun=1
							if(user.password==password){
								console.log(user.nameid)
                                localStorage.setItem("id",user.nameid)
                                 hashHistory.push({  
                                        pathname:"account"
                                     
                                    })        
							}else{
								alert("密码错误")
							}
							
						}
						if(cun==0){
							alert("用户名不存在")
						}
					}
					
				}
    }
     jian(even){
        var kai=this.state.kai
        if(kai==1){
             even.target.innerHTML="&#xe663;"
               
                this.refs.mi2.value= this.refs.mi1.value;
                this.refs.mi1.style.display="none";
                this.refs.mi2.style.display="block";
              
             this.setState({
                  kai:0
             })
        }else{
             even.target.innerHTML="&#xe606;"
             this.refs.mi1.value= this.refs.mi2.value;
                this.refs.mi2.style.display="none";
                this.refs.mi1.style.display="block";
             this.setState({
                  kai:1
             })
        }
       
    }
    render(){
        
        return(
            <div className="login">
                <div className="loginhead">
                   <div className="back iconfont" onClick={this.back.bind(this)}>&#xe600;</div>
                    登录
                    <div className="iconfont right" ><Link to="/">&#xe621;</Link></div>
                </div>
                <div className="content">
                    <div className="name">
                        <input type="text" className="user"  ref="user" placeholder="已验证手机/用户名/邮箱"/>
                        <div className="password" >
                           <input type="password" ref="mi1" placeholder="密码"/>
                            <input type="text" ref="mi2" className="text" placeholder="密码"/>
                           <span onClick={this.jian.bind(this)} className="iconfont">&#xe606;</span>
                        </div>
                    </div>
                     <div className="deng" onClick={this.deng1.bind(this)}>
                        登录
                    </div>
                    <div className="wang">
                         <span> 忘记密码 </span>
                        <span><Link to="/Signup" >立即注册 &nbsp;&nbsp;&nbsp;</Link></span>
                    </div>
               
               
               
                </div>
               
              
              
            </div>
        )
    }
}