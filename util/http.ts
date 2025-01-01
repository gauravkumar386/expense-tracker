import axios from "axios";

const BACKEND_URL = "https://expensetracker-93ea2-default-rtdb.firebaseio.com";

export async function storeExpense(expenseData: any) {
  const response = await axios.post(
    BACKEND_URL + "/expenses.json",
    expenseData
  );
  const id = response.data.name;
  return id;
}

export async function fetchExpenses() {
  const response = await axios.get(BACKEND_URL + "/expenses.json");
  const expenses = [];
  for (const key in response.data) {
    const expenseObj = {
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description,
    };
    expenses.push(expenseObj);
  }
  return expenses;
}

export function updateExpenses(id: string, expenseData: any) {
  return axios.put(BACKEND_URL + `/expenses/${id}.json`, expenseData);
}

export async function deleteExpenses(id: string) {
  return axios.delete(BACKEND_URL + `/expenses/${id}.json`);
}
