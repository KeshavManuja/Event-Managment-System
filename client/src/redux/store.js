import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { init, rootReducer } from "./reducer";

const persistedState = localStorage.getItem("reduxState")
    ? JSON.parse(localStorage.getItem("reduxState"))
    : init;

export const store = createStore(rootReducer, persistedState, applyMiddleware(thunk));

store.subscribe(() => {
    console.log("Called subscribe");
    console.log("current state is : ", store.getState());
    localStorage.setItem("reduxState", JSON.stringify(store.getState()));
});
