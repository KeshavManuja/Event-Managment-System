import { applyMiddleware, createStore } from "redux";
import { rootReducer } from "./reducer";
import ThunkMiddleware  from "redux-thunk";

export const store = createStore(rootReducer, applyMiddleware(ThunkMiddleware));
