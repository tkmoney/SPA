'use strict';

var React = require('react'),
    App = require('./app.js'), //eslint-disable-line no-unused-vars
    Widget = require('./widget.js'), //eslint-disable-line no-unused-vars
    Menu = require('./menu.js'), //eslint-disable-line no-unused-vars
    Timer = require('./timer.js'); //eslint-disable-line no-unused-vars

var Parent = React.createClass({
    componentWillMount: function(){

        if(window.localStorage.spaUser){
            var u = JSON.parse(window.localStorage.spaUser);
            this.setState({userData: u.userData, isLoggedIn: u.isLoggedIn});
        }
        if(window.localStorage.spaTime){
            this.setState({
                timer: new Date(JSON.parse(window.localStorage.spaTime))
            });
        }

    },
    componentDidMount: function(){
        if(this.state.timer){
            this.refs.timer.startInterval();
        }
    },
    getInitialState: function(){
        return {
            userData: {
                name: 'guest',
                id: 0,
                img: 'http://i.imgur.com/M8I9onf.png'
            },
            isLoggedIn: false
        }; 
    },
    doAuth: function(){
        var u;

        if(this.state.isLoggedIn){ //if logged in, log out, reset timer and clear time localstorage
            u = this.getInitialState();
            this.refs.timer.stopAndResetTimer();
            delete window.localStorage.spaTime;
        }else{
            //call web service here and get back data
            //set test data
            u = {
                userData: {
                    name: 'Tyler',
                    id: 871239,
                    img: 'http://pbs.twimg.com/profile_images/1254568768/eightbit-f89ad462-87b7-4023-b7e4-aea4d1f40a0a.png' 
                },
                isLoggedIn: true
            };
        };
        this.setState(u);
        window.localStorage.spaUser = JSON.stringify(u);
    },
    onTimerInputChange: function(){
        var endDate = new Date(new Date().getTime() + this.refs.timeInput.value * 60000);
        this.setState({
            timer: endDate
        });
        this.refs.timer.startInterval();
        window.localStorage.spaTime = JSON.stringify(endDate.toGMTString());
    },
    loginText: function(){
        if(this.state.isLoggedIn){
            return 'logout';
        }else{
            return 'login';
        }
    },
    render: function() {
        var backgroundProfilePic = {backgroundImage: 'url('+ this.state.userData.img +')'};
        return (
            <App>
                <Menu>
                    <div className="profilepic" style={backgroundProfilePic}></div>
                    <div>
                        <p>Hello, {this.state.userData.name}</p>
                        <button onClick={this.doAuth}>{this.loginText()}</button>
                    </div>
                </Menu>
                <div className="parent">
                    <Widget isLoggedIn={this.state.isLoggedIn}>
                        <div className="loggedout_content">
                            <div>Logged out!</div>
                        </div>
                        <div className="loggedin_content">
                            <div>Logged in!</div>
                        </div>
                    </Widget>
                    <Widget isLoggedIn={this.state.isLoggedIn}>
                        <div>
                            <div className="timer">
                                <Timer time={this.state.timer} ref="timer" />
                                <div className="timeInput">
                                    Set alarm for 
                                     <input type="number" min="1" max="60" ref="timeInput" onChange={this.onTimerInputChange} />
                                    minutes
                                </div>
                            </div>
                        </div>
                    </Widget>
                    <Widget isLoggedIn={this.state.isLoggedIn}>
                        <div className="loggedout_content">
                            <div>Logged out!</div>
                        </div>
                        <div className="loggedin_content">
                            <div>Logged in!</div>
                        </div>
                    </Widget>
                </div>
            </App>
        );
    }
});

module.exports = Parent;
