





import "./../scss/pay.scss"
import React from "react";
import ReactDOM from "react-dom";
import Ajax from "./../MyAjax.js";
import {hashHistory,Link} from "react-router"
import Alert from "./console";




export default 
class Add extends React.Component{
	constructor(props){
		super(props)
		this.state={
            goods:[]
        }
		
    }
    
    componentWillMount(){
        
        
    }
    componentDidMount(){
       
         var $distpicker = $('#distpicker');

            $distpicker.distpicker({
                province: '福建省',
                city: '厦门市',
                district: '思明区'
            });
             $('#reset').click(function () {
                $distpicker.distpicker('reset');
            });

            $('#reset-deep').click(function () {
                $distpicker.distpicker('reset', true);
            });

            $('#destroy').click(function () {
                $distpicker.distpicker('destroy');
            });

            $('#distpicker1').distpicker();

            $('#distpicker2').distpicker({
                province: '---- 所在省 ----',
                city: '---- 所在市 ----',
                district: '---- 所在区 ----'
            });

            $('#distpicker3').distpicker({
                province: '浙江省',
                city: '杭州市',
                district: '西湖区'
            });

            $('#distpicker4').distpicker({
                placeholder: false
            });

            $('#distpicker5').distpicker({
                autoSelect: false
            });

  
    }
    back(){
        window.history.back()
    }
    save(){
        // console.log($("input").eq(0).val())
        if(!$("input").eq(0).val()==""&&!$("input").eq(1).val()==""){
            var  str=$("input").eq(0).val()+","+$("input").eq(1).val()
            var sel=$("select").eq(1).val()
            // console.log(sel)
            localStorage.setItem("add",str)
            window.history.back()
            // hashHistory.push({
            //     pathname:"/pay"
            // })
        }else{
            Alert.alert(200,50,"内容不能为空")
         }
    }
    render(){
       
       
        return(
            <div className="pay">
                <div className="payhead">
                    <div className="back iconfont" onClick={this.back.bind(this)}>&#xe600;</div>
                    新增地址
                    <div className="iconfont right" ><Link to="/">&#xe621;</Link></div>
                </div>
              
                <div className="addcontent">
                    <div className="xian"></div>
                    <div className="people">
                        收货人
                        <input type="text"/>
                    </div>
                    <div className="people">
                        电话号码
                        <input type="text"/>
                    </div>
                    <div className="people">
                        收货时间
                        <select name="time" id="time">
                            <option value="收货时间不限">收货时间不限</option>
                            <option value="节假日">节假日</option>
                            <option value="周一到周五">周一到周五</option>
                        </select>
                    </div>
                     <div className="xian"></div>
                     <div className="add">
                         {/* 选择地区 */}
                         <form className="form-inline">
                            <div data-toggle="distpicker" id="distpicker">
                                <div className="form-group">
                                <label className="sr-only left" htmlFor="province2">Province</label>
                                省份
                                <select className="form-control right" id="province2" data-province="---- 选择省 ----"></select>
                                </div>
                                <div className="form-group">
                                <label className="sr-only left" htmlFor="city2">City</label>
                                 城市
                                <select className="form-control right" id="city2" data-city="---- 选择市 ----"></select>
                                </div>
                                <div className="form-group">
                                <label className="sr-only left" htmlFor="district2">District</label>
                                 县/区
                                <select className="form-control right" id="district2" data-district="---- 选择区 ----"></select>
                                </div>
                            </div>
                            </form>
                        <div className="people1">
                        详细地址
                            <textarea rows="2" cols="3" type="text" name="address" id="address" placeholder="填写路名，门牌号，请勿重复填写省市区"></textarea>
                        </div>

                     </div>
                </div>
                <div className="dibu">
                    <div className="save" onClick={this.save.bind(this)}>保存</div>
                </div>
                
             
            </div>
        )
    }
}