// main.js
var React = require('react');
var ReactDOM = require('react-dom');
var {createStore} = require("redux");

/*-------------------------------------------------------------
 * ACTIONS
 *-------------------------------------------------------------
 */
const INCREMENT_ACTION_TYPE = 'INCREMENT';
const DECREMENT_ACTION_TYPE = 'DECREMENT';
const incrementAction = {type: INCREMENT_ACTION_TYPE};
const decrementAction = {type: DECREMENT_ACTION_TYPE};

/*-------------------------------------------------------------
 * REDUCERS
 *-------------------------------------------------------------
 */
function counterReducer (state = 0, action) {
	if (typeof state == 'undefined') {
	    state = 0;
    }
  
    switch (action.type) {
  	    case INCREMENT_ACTION_TYPE:
    	    state++;
            break;
        case DECREMENT_ACTION_TYPE:
    	    state--;
            break;
    }
    return state;
}

/*-------------------------------------------------------------
 * STORE
 *-------------------------------------------------------------
 */
var store = createStore(counterReducer);

/*-------------------------------------------------------------
 * COMPONENT
 *-------------------------------------------------------------
 */
var Counter = React.createClass({
    
    componentWillMount: function() {
        setInterval(this.minus, 1000);
        
        document.addEventListener('click', this.add);
    },
    
    add: function() {
        store.dispatch(incrementAction);
    },
    
    minus: function() {
        store.dispatch(decrementAction);
    },

    render: function() {
        return <div>{store.getState()}</div>;
    }
});

var render = () => ReactDOM.render(
      <Counter />,
      document.getElementById('example')
);

render();
store.subscribe(render);