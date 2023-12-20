import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducer"
import  ThunkAction  from "redux-thunk";

const composeEnhancers =
(typeof window !== "undefined" &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(ThunkAction))
);

export default store;