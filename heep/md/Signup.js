





import "./../scss/login.scss"
import React from "react";
import ReactDOM from "react-dom";
import Ajax from "./../MyAjax.js";
import {hashHistory,Link} from "react-router"





export default 
class Signup extends React.Component{
	constructor(props){
		super(props)
		this.state={
            kai:1
        }
		
    }
    
    componentWillMount(){
      
    }
    back(){
        window.history.back()
    }
    zhuce(){
                 var nameid=this.refs.user.value;
                  var kai=this.state.kai
                  console.log(kai)
                 if(kai==1){
                     var password=this.refs.mi1.value;
                 }else if(kai==0){
                     var password=this.refs.mi2.value;
                 }
				    
				console.log(nameid,password)
				if(localStorage.getItem("user")){
					var bu=0
					var user=JSON.parse(localStorage.getItem("user"));
					for (var it of user) {
						if(nameid==it.nameid){
							alert("用户名已经存在")
							bu=1
						}
					}
					if(bu==0){
						user.push({"nameid":nameid,"password":password});
                        localStorage.setItem("user",JSON.stringify(user))
                        hashHistory.push({  
                                        pathname:"login"
                                     
                                    })
						
					}
				}else{
					var user=[];
					var users={"nameid":nameid,"password":password}
					user.push(users)
					localStorage.setItem("user",JSON.stringify(user));
                    hashHistory.push({  
                                        pathname:"login"
                                     
                                    })
					
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
                    注册
                    <div className="iconfont right" ><Link to="/">&#xe621;</Link></div>
                </div>
                <div className="content">
                    <div className="name">
                        <input type="text" ref="user" className="user" placeholder="已验证手机/用户名/邮箱"/>
                        <div className="password" >
                            <input type="password" ref="mi1" placeholder="密码"/>
                            <input type="text" ref="mi2" className="text" placeholder="密码"/>
                            <span onClick={this.jian.bind(this)} className="iconfont">&#xe606;</span>
                        </div>
                    </div>
                     <div className="deng" onClick={this.zhuce.bind(this)}>
                       注册
                    </div>
                   
               
               
               
                </div>
               
              
              
            </div>
        )
    }
}