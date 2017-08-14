import React from "react";
import ReactDOM from "react-dom";
import Ajax from "./../MyAjax.js";
import {Link,hashHistory} from "react-router";




import "./../scss/home.scss"



import Homelist1 from "./homelist1";
import Banner5 from "./banner5";
import Homelist2 from "./homelist2";
export default 
class App extends React.Component{
	constructor(props){
		super(props)
		this.state={
			search:[],
			banner:[],
			banner1:[],
			arr:[],
			num:1
		}
		
	}
	
	componentWillMount(){
		var url1="http://w.lefeng.com/api/neptune/search/hot_keywords/v1?count=10&highlight=1"
		Ajax.fetch(url1,function(data){
			
			var arr =[]
			arr.push(data.data[0].word)
				that.setState({
					search:arr
				})
		},function(err){console.log(err)})

		var arr=[]
		var arr1=[]
		var arr7=[]
		var data=[]
		var that=this
		 var url="http://w.lefeng.com/api/neptune/brand/ad/v3?zoneId=943%2C478%2C496%2C693%2C724%2C725%2C726%2C727%2C728&resolution=320x568&appName=lefeng_android&version=4.1.1"
		Ajax.fetch(url,function(data){
			
			for(var i of data.data["478"]){
				// arr.push(i.imgFullPath)
				arr.push(i)
				// data.push(i)
			}
			for(var i of data.data["724"]){
				arr7.push(i.filename)
			}
			
			for(var i of data.data["496"]){
				
				arr1.push(i.filename)
			}
			
			that.setState({
				banner:arr,
				banner1:arr1,
				banner2:arr7,
				data:data
			})
			
		},function(err){console.log(err)})
	}
	top(even){
		var that=this
		var arr=this.state.arr
		var top=even.target.scrollTop;
		
		var height=even.target.scrollHeight;
		var height1=document.getElementsByTagName("body")[0].clientHeight;
		var num =this.state.num;
		var head=$("#hender");
		
	// console.log(top)
	if(top>=500){
		
		that.refs.dong.style.display="block"
	}else{
		that.refs.dong.style.display="none"
	}
	
		if(height1==height-top+44){
			console.log("加载数据")
			num++;
			var url ="http://w.lefeng.com/api/neptune/special_brands/v3?page="+num+"&labelType=1";
			Ajax.fetch(url,function(data){
				for(var it of data.data){
					arr.push(it)

				}
				// console.log(arr,"11111")
				that.setState({
					arr:arr,
					num:num
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
	account(){
		hashHistory.push({
			pathname:"/account"
		})
	}
	bn(pictitle,bannerId){
		// console.log(pictitle,bannerId)
		hashHistory.push({
			pathname:"/listlist",
			query:{
				pictitle:pictitle,
				bannerId:bannerId,
				num:0
			}
		})
	}
	render(){
		var search=this.state.search;
	
		var arr3=[]
		arr3.push(
			<span key="0">{search[0]}</span>
			)

		var data=this.state.banner;
		var arr2=[]
		for(var it in data){
			arr2.push(<div key={it} className="swiper-slide"><img src={data[it].filename}  onClick={this.bn.bind(this,data[it].pictitle,data[it].adlink)}/></div>)
		}	

		var arrw1=this.state.banner2;
		
		var arrw2=[]
		for(var it in arrw1){
			
			arrw2.push(<div key={it} className="swiper-slide"><img src={arrw1[it]} /></div>)
		}	


		var arr5=this.state.banner1;
		var arr4=[]
		for(var it in arr5){
			arr4.push(<img key={it} src={arr5[it]}/>)
		}	
		return(

		<div className="type">
				<hender id="hender">
					<div className="commonHeader" ref="head">
						<div className="back">乐蜂</div>
						<div className="title">
							<span className="iconfont">
							<Link to="/search">
								&#xe642;&nbsp;
								{arr3}
							</Link>
							</span>
						</div>
						<div className="moreInfo iconfont" onClick={this.account.bind(this)}>&#xe617;</div>
					</div> 
				</hender>
          		<div id="homecontent"  ref="top" onScroll={this.top.bind(this)}>
          			<div className="swiper-container" id="banner">
				        <div className="swiper-wrapper">

				       	 {arr2}
				        </div>
				      
				        <div className="swiper-pagination" id="point1"></div>
				    </div>
          		

					<div className="banner1">
						{arr4}
					</div>
					
					<div className="chai">
						<img src="http://b.appsimg.com/2017/07/24/2212/02ca1977901017cf58e883938bd94474.jpg"/>
					</div>
					<div className="chai">
						<img src="http://b.appsimg.com/2017/08/04/6669/57bf8185f9c0c52a9a70998906f95c46.jpg"/>
					</div>
					<div className="chai">
						<img src="http://b.appsimg.com/2017/08/04/5804/1579178138d3397df1bf6163ba7d3387.jpg"/>
					</div>
					<div className="chai">
						<img src="http://b.appsimg.com/2017/08/04/7587/5343cbfd0767f673eac478c90a5ae9c4.jpg"/>
					</div>
					<div className="chai">
						<img src="http://b.appsimg.com/2017/08/04/5095/5343cbfd0767f673eac478c90a5ae9c4.jpg"/>
					</div>
					<div className="chai">
						<img src="http://b.appsimg.com/2017/08/04/5300/5343cbfd0767f673eac478c90a5ae9c4.jpg"/>
					</div>
					<div className="chai">
						<img src="http://b.appsimg.com/2017/08/04/6185/5343cbfd0767f673eac478c90a5ae9c4.jpg"/>
					</div>


					<div className="swiper-container" id="benner3">
						<div className="swiper-wrapper">
							{arrw2}
						</div>
						
					</div>


					<div id="lis1">
						<Homelist1 />
					</div>
					<div className="quan">
						<h1>蜂购全球</h1>
						<img className="quan1" src="http://b.appsimg.com/2016/07/18/7676/146882918395_960x1704_80.jpg" />
						
						<Banner5 />
					</div>

					<div className="quan">
						<h1>品牌专场</h1>
						<Homelist2 shu={this.state.arr} />
						
						
					</div>
          		</div>

{/* 回到顶部 */}
				  <div className="cat2">
						<div className="iconfont cat1" onClick={this.goods.bind(this)}>&#xe604;</div>
						<div className="iconfont dong" ref="dong" onClick={this.hui.bind(this)}>
							&#xe665;
								<br/>
							顶部
						</div>
				  </div>
			</div>
		)
	}
	componentDidUpdate(){
		 var swiper = new Swiper('#banner', {
		        pagination: '#point1',
		        paginationClickable: true,
		        loop:true,
		        autoplay:3000,
		        autoplayDisableOnInteraction:false
			});
		 var swiper = new Swiper('#benner3', {
			
			slidesPerView: '2.8',
			paginationClickable: true,
			spaceBetween: 10
		});
		
	}
}