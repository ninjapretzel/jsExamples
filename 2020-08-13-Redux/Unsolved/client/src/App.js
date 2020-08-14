import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";
import FavoritesList from "./pages/FavoritesList";
import { createStore } from 'redux'
import { Provider } from 'react-redux';

/**
 * This is a reducer, a pure function with (state, action) => state signature.
 * It describes how an action transforms the state into the next state.
 *
 * The shape of the state is up to you: it can be a primitive, an array, an object,
 * or even an Immutable.js data structure. The only important part is that you should
 * not mutate the state object, but return a new object if the state changes.
 *
 * In this example, we use a `switch` statement and strings, but you can use a helper that
 * follows a different convention (such as function maps) if it makes sense for your
 * project.
 */
function counter(state = 0, action) {
	console.log(`Counter reacting to ${JSON.stringify(action)}`);
	switch (action.type) {
		case 'INCREMENT':
			return state + 1
		case 'DECREMENT':
			return state - 1
		default:
			return state
	}
}

const defaultState = {
	posts: [
		{ id: "test", title: "Test Title", content: "test content", author: "testName" }
	],
	selectedPost: ""
}
function update(state = {...defaultState}, action) {
	return {...state, ...action};
}
const store = createStore(update)

store.subscribe(() => console.log(store.getState()))

function App() {
	
	// Create a Redux store holding the state of your app.
	// Its API is { subscribe, dispatch, getState }.
	

	// You can use subscribe() to update the UI in response to state changes.
	// Normally you'd use a view binding library (e.g. React Redux) rather than subscribe() directly.
	// However it can also be handy to persist the current state in the localStorage.


	return (
		<Provider store={store}> 	
			<Router>
				<div>
					<Nav />
					<Switch>
						<Route exact path="/" component={Home} />
						<Route exact path="/home" component={Home} />
						<Route exact path="/favorites" component={FavoritesList} />
						<Route exact path="/posts/:id" component={Detail} />
						<Route component={NoMatch} />
					</Switch>
				</div>
			</Router>
		</Provider>
	);
}

export default App;
