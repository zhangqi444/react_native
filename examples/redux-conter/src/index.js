// main.js
var React = require('react');
var ReactDOM = require('react-dom');
var Redux = require("redux");

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
function counterReducer (state, action) {
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
var store = Redux.createStore(counterReducer);
store.subscribe(counterApplication);

/*-------------------------------------------------------------
 * APPLICATION
 *-------------------------------------------------------------
 */
 
function counterApplication() {
    ReactDOM.render(
        <h1>{store.getState()}</h1>,
        document.getElementById('example')
    );
}

setInterval(function() {
	store.dispatch(decrementAction);
}, 1000);

document.addEventListener('click', function() {
    store.dispatch(incrementAction);
});
