// main.js
var React = require('react');
var ReactDOM = require('react-dom');
var FluxDispatcher = require('flux').Dispatcher;
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

/*-------------------------------------------------------------
 * DISPATCHER
 *-------------------------------------------------------------
 */
var Dispatcher = new FluxDispatcher();

/*-------------------------------------------------------------
 * ACTIONS
 *-------------------------------------------------------------
 */
const INCREMENT_ACTION_TYPE = 'INCREMENT';
const DECREMENT_ACTION_TYPE = 'DECREMENT';
const incrementAction = function() {
    Dispatcher.dispatch({
        type: INCREMENT_ACTION_TYPE
    });
};
const decrementAction = function() {
    Dispatcher.dispatch({
        type: DECREMENT_ACTION_TYPE
    });
};
/*-------------------------------------------------------------
 * STORE
 *-------------------------------------------------------------
 */

var counter = 0;
var store = assign({}, EventEmitter.prototype, {
    getAll: function() {
        return {counter: counter};
    },

    emitChange: function() {
        this.emit('change');
    },
    
    addChangeListener: function(callback) {
        this.on('change', callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener('change', callback);
    },
    
    dispatcherIndex: Dispatcher.register(function(action) {
        switch(action.type) {
            case INCREMENT_ACTION_TYPE:
        	    counter++;
        	    store.emitChange();
                break;
            case DECREMENT_ACTION_TYPE:
        	    counter--;
        	    store.emitChange();
                break;
    
            default:
                // no op
                break;
        }
    })
});

/*-------------------------------------------------------------
 * COMPONENT
 *-------------------------------------------------------------
 */
var Counter = React.createClass({
    
    getInitialState: function() {
        return store.getAll();
    },
    
    componentWillMount: function() {
        store.addChangeListener(this._onChange);
        setInterval(this.minus, 1000);
        document.addEventListener('click', this.add);
    },

    componentWillUnmount: function() {
        store.removeChangeListener(this._onChange);
    },
    
    _onChange: function() {
        this.setState(store.getAll());
    },
    
    add: function() {
        incrementAction();
    },
    
    minus: function() {
        decrementAction();
    },

    render: function() {
        return <div>{this.state.counter}</div>;
    }
});

var render = () => ReactDOM.render(
      <Counter />,
      document.getElementById('example')
);

render();
store.subscribe(render);