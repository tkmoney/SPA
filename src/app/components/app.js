'use strict';

var React = require('react');
var App = React.createClass({
    render: function() {
        return (
            <div className="wrapper">{this.props.children}</div>
        );
    }
});

module.exports = App;