import React, { Component } from 'react';
import { AppRegistry, Text } from 'react-native';

var Counter = React.createClass({
    getInitialState: function() {
        return {counter: 0};
    },

    componentWillMount: function() {
        setInterval(this.minus, 1000, this);
    },

    add: function() {
        let counter = this.state.counter;
        this.setState({counter: counter + 1});
    },

    minus: function() {
        let counter = this.state.counter;
        this.setState({counter: counter - 1});
    },

   render: function() {
        return (
            <Text onPress={this.add}>{this.state.counter}</Text>
        );
   }
});

AppRegistry.registerComponent('Counter', () => Counter);
