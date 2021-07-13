import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import Root from "./Redux/reducers/Root";


// Initial State for Store
const initialState = {};

// MiddleWare for Store
const middleWare = [thunk, logger];

// Store
const store = createStore(Root, initialState, applyMiddleware(...middleWare));

export default store;
