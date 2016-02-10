'use strict';

var React = require('react');
var Menu = React.createClass({
    render: function() {

        console.log(this.props);
        return (
            <div className="menu">{this.props.children}</div>
        );
    }
});

module.exports = Menu;