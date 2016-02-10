'use strict';

var React = require('react');
var Timer = React.createClass({
    getInitialState: function(){
        return {
            minRemain: 0,
            secRemain: 0
        };
    },
    tick: function(){
        console.log('tick!');
        var now = new Date();
        var endDate = this.props.time;
        console.log(now, endDate);
        var diff = endDate - now;
        console.log('diff:' , diff);
        var sec = 1000;
        var min = sec * 60;
        var hour = min * 60;

        if(diff < 0){
            clearInterval(this.interval);
            alert('time expired');
            return;
        }

        this.setState({
            minRemain: Math.floor((diff % hour) / min),
            secRemain: Math.floor((diff % min) / sec)
        });
    },
    stopAndResetTimer: function(){
        clearInterval(this.interval);
        this.setState({
            minRemain: 0,
            secRemain: 0
        });
    },
    startInterval: function(){
        if(this.interval){
            clearInterval(this.interval);
        }
        if(!((this.props.time - new Date()) < 0)){
            this.interval = setInterval(this.tick, 1000);
        }
    },
    render: function() {
        return (
            <div className="timeRemaining">
                <label>{this.state.minRemain}:{this.state.secRemain}</label>
            </div>
        );
    }
});

module.exports = Timer;
