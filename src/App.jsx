import React, {Component} from "react";
import injectTapEventPlugin from "../node_modules/react-tap-event-plugin";
//import getMuiTheme from '../node_modules/material-ui/styles/getMuiTheme';
import MuiThemeProvider from "../node_modules/material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import FlatButton from "material-ui/FlatButton";

import logo from "./logo.svg";
import "../public/fonts/iconfont.css";
import "./App.css";
import "./animation.css";
import "../node_modules/react-select/dist/react-select.min.css";
import {BrowserRouter as Router, Link, Route} from "react-router-dom";
import Landing from "./routes/Landing.jsx";
import BrowseCountries from "./routes/requests/Countries.js";
import RequestsList from "./routes/requests/List.jsx";


import ProductsList from "./routes/products/List.jsx";
//import ProductView from "./routes/products/View.jsx";
import SignUp from "./routes/SignUp.jsx";
import Login, {GetUserInfo, LoginNavbar} from "./routes/Login.jsx";
import Trip from "./routes/PostTrip";
import PostRequest from "./routes/PostRequest";
import Profile from "./routes/user/Profile.jsx";
import Traveller from "./routes/Traveller";

import history from "./helper/History";
import SnackBar from "./components/SnackBar";
import Utils from "./helper/Utils";
import Footer from "./Footer"

injectTapEventPlugin();

const yuTheme = getMuiTheme({
    fontFamily: 'inherit'
});

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: '',
            snackBar: {open: false, message: ''}
        };
        // get token from cookie and set into state
        this.updateToken = this.updateToken.bind(this);
        this.showSnackBar = this.showSnackBar.bind(this);
        this.closeSnackBar = this.closeSnackBar.bind(this);
    }

    componentWillMount() {
        var token = Utils.getCookie("token");
        if (token !== "") {
            this.setState({token: token});
        }
    }

    updateToken(token) {
        this.setState({token: token});
        Utils.setCookie("token", token, 30);
    }

    showSnackBar(message) {
        this.setState({snackBar: {open: true, message: message}});
    }

    closeSnackBar() {
        this.setState({snackBar: {open: false, message: ''}});
    }

    render() {
        console.log(this.state.token)
        return (
            <Router history={history}>
                <MuiThemeProvider muiTheme={yuTheme}>
                    <div className="App">

                        <div className="header">
                            <div className="overflowFixBeta">
                                <div className="container">
                                    <img src={logo} className="App-logo" alt="logo"/>

                                    <FlatButton label="Home" containerElement={<Link to="/"/>}/>
                                    <FlatButton label="Countries" containerElement={<Link to="/countries"/>}/>
                                    <FlatButton label="Requests" containerElement={<Link to="/post-request"/>}/>
                                    <FlatButton label="Products" containerElement={<Link to="/products"/>}/>
                                    <FlatButton label="Trip" containerElement={<Link to="/trip"/>}/>
                                    <FlatButton label="Traveller" containerElement={<Link to="/traveller"/>} />
                                    <LoginNavbar token={this.state.token}/>
                                    <GetUserInfo token={this.state.token} updateToken={this.updateToken}
                                                 showSnackBar={this.showSnackBar} history={history}/>
                                </div>
                            </div>
                        </div>
                        <Route exact path="/" component={Landing}/>
                        <Route path="/signup" component={SignUp}/>
                        <Route path="/login" component={() => (
                            <Login updateToken={this.updateToken} showSnackBar={this.showSnackBar}/>)}/>
                        <Route path="/countries" component={BrowseCountries}/>
                        <Route path="/requests" component={RequestsList}/>



                        <Route path="/products" component={ProductsList}/>

                        <Route path="/post-request" component={PostRequest}/>

                        <Route path="/profile" component={() => (
                            <Profile token={this.state.token}/>)}/>
                        <Route path="/user/:Id" component={Profile} />

                        <SnackBar open={this.state.snackBar.open} message={this.state.snackBar.message}
                                  close={this.closeSnackBar}/>
                        <Route path="/trip" component={Trip} />
                        <Route path="/traveller" component={Traveller} />

                        <Footer />
                    </div>
                </MuiThemeProvider>
            </Router>
        );
    }
}

export default App;
