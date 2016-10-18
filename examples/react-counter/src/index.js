// main.js
var React = require('react');
var ReactDOM = require('react-dom');

/*-------------------------------------------------------------
 * COMPONENT
 *-------------------------------------------------------------
 */
var Counter = React.createClass({
    
    getInitialState: function() {
        return {counter: 0};
    },
    
    componentWillMount: function() {
        setInterval(this.minus, 1000, this);
        
        document.addEventListener('click', this.add);
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
        return <div>{this.state.counter}</div>;
    }
});

ReactDOM.render(
  <Counter />,
  document.getElementById('example')
);
