import { DUMMY_EXPENSES } from "@/constants/Constants";

const initalState = {
  expenses: [],
};

const reducer = (state: any = initalState, action: any) => {
  switch (action.type) {
    case "ADD":
      return {
        ...state,
        expenses: [...action.payload, ...state.expenses],
      };

    case "UPDATE":
      const updatableExpenseIndex = state.expenses.findIndex(
        (expense: any) => expense.id === action.payload.id
      );
      const updatableExpense = state.expenses[updatableExpenseIndex];
      const updatedItem = { ...updatableExpense, ...action.payload.data };
      const updatedExpense = [...state.expenses];
      updatedExpense[updatableExpenseIndex] = updatedItem;
      return {
        ...state,
        expenses: updatedExpense,
      };

    case "DELETE":
      const filteredExpenses = state.expenses.filter(
        (expense: any) => expense.id !== action.payload
      );
      return {
        ...state,
        expenses: filteredExpenses,
      };

    case "SET_DATA":
      return {
        ...state,
        expenses: [...action.payload]
      };

    default:
      return state;
  }
};

export default reducer;
