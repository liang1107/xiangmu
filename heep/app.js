import React from "react";
import ReactDOM from "react-dom";
import {Router ,Route ,hashHistory, IndexRoute} from "react-router";

import "./scss/main.scss";


import App from "./md/App.js"
import home from "./md/home.js"
import search from "./md/search.js"
import cart from "./md/cart.js"
import account from "./md/account.js"
import login from "./md/login.js"
import Signup from "./md/Signup.js"
import listlist from "./md/listlist.js"
import detail from "./md/detail.js"
import lick from "./md/lick.js"
import pay from "./md/pay.js"
import add from "./md/add.js"
ReactDOM.render((
	<Router history={hashHistory}>
		<Route path="/" component={App}>
			<IndexRoute  components={{home:home}}/>
			<Route path="/search" components={{home:search}}/>
			<Route path="/account" components={{home:account}}/>
			<Route path="/cart" components={{home:cart}}/>
			<Route path="/login" components={{home:login}}/>
			<Route path="/Signup" components={{home:Signup}}/>
			<Route path="/listlist" components={{home:listlist}}/>
			<Route path="/detail" components={{home:detail}}/>
			<Route path="/lick" components={{home:lick}}/>
			<Route path="/pay" components={{home:pay}}/>
			<Route path="/add" components={{home:add}}/>
		</Route>
	</Router>
	),document.getElementById('app'))