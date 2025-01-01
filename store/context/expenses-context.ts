// import { DUMMY_EXPENSES } from "@/constants/Constants";
// import { createContext, ReactNode, useReducer } from "react";

// interface Expense {
//   id: string;
//   description: string;
//   amount: number;
//   date: string;
// }

// interface ExpensesState {
//   expenses: Expense[];
// }

// interface AddExpensePayload {
//   description: string;
//   amount: number;
//   date: string;
// }

// interface UpdateExpensePayload {
//   id: string;
//   data: Partial<AddExpensePayload>;
// }

// type Action =
//   | { type: "ADD"; payload: AddExpensePayload }
//   | { type: "UPDATE"; payload: UpdateExpensePayload }
//   | { type: "DELETE"; payload: string };

// interface ExpensesContextProps {
//   expenses: Expense[];
//   addExpense: (expenseData: AddExpensePayload) => void;
//   deleteExpense: (id: string) => void;
//   updateExpense: (id: string, expenseData: Partial<AddExpensePayload>) => void;
// }

// export const ExpensesContext = createContext<ExpensesContextProps>({
//   expenses: [],
//   addExpense: () => {},
//   deleteExpense: () => {},
//   updateExpense: () => {},
// });

// function expensesReducer(state: Expense[], action: Action): Expense[] {
//   switch (action.type) {
//     case "ADD": {
//       const id = new Date().toString() + Math.random().toString();
//       return [{ ...action.payload, id: id }, ...state];
//     }
//     case "UPDATE": {
//       const updatableExpenseIndex = state.findIndex(
//         (expense) => expense.id === action.payload.id
//       );
//       const updatableExpense = state[updatableExpenseIndex];
//       const updatedItem = { ...updatableExpense, ...action.payload.data };
//       const updatedExpense = [...state];
//       updatedExpense[updatableExpenseIndex] = updatedItem;
//       return updatedExpense;
//     }
//     case "DELETE": {
//       return state.filter((expense) => expense.id !== action.payload);
//     }
//     default:
//       return state;
//   }
// }

// interface ExpensesContextProviderProps {
//   children: ReactNode;
// }

// const ExpensesContextProvider = ({
//   children,
// }: ExpensesContextProviderProps) => {
//   const [expensesState, dispatch] = useReducer<any>(
//     expensesReducer,
//     DUMMY_EXPENSES
//   );

//   const addExpense = (expenseData: AddExpensePayload) => {
//     dispatch({ type: "ADD", payload: expenseData });
//   };

//   const deleteExpense = (id: string) => {
//     dispatch({ type: "DELETE", payload: id });
//   };

//   const updateExpense = (
//     id: string,
//     expenseData: Partial<AddExpensePayload>
//   ) => {
//     dispatch({ type: "UPDATE", payload: { id: id, data: expenseData } });
//   };

//   const value = {
//     expenses: expensesState,
//     addExpense: addExpense,
//     deleteExpense: deleteExpense,
//     updateExpense: updateExpense,
//   };

//   return (
//     <ExpensesContext.Provider value={value}>
//       {children}
//     </ExpensesContext.Provider>
//   );
// };

// export default ExpensesContextProvider;
