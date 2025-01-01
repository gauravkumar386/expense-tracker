import { ADD, DELETE, SET_DATA, UPDATE } from "./types";

export const addExpense = (payload: any) => {
  return {
    type: ADD,
    payload,
  };
};

export const deleteExpense = (payload: any) => {
  return {
    type: DELETE,
    payload,
  };
};

export const updateExpense = (payload: any) => {
  return {
    type: UPDATE,
    payload,
  };
};

export const setExpenses = (payload: any) => {
  return {
    type: SET_DATA,
    payload,
  };
};
