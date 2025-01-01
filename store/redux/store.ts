import { combineReducers, createStore } from "@reduxjs/toolkit";
import reducer from "./reducer";

const rootReducer = combineReducers({
  expensesReducer: reducer,
});

export const configureStore = () => {
  return createStore(rootReducer);
};
