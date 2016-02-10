'use strict';

var React = require('react');
var Widget = React.createClass({

    classNameforWidget: function(){
        return (this.props.isLoggedIn ? 'widget loggedin' : 'widget loggedout');
    },

    render: function() {
        return (
            <div className={this.classNameforWidget()}>
                {this.props.children}
            </div>
        );
    }
});

module.exports = Widget;
