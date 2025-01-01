import ExpensesOutput from "@/components/ExpensesOutput/ExpensesOutput";
import ErrorOverlay from "@/components/UI/ErrorOverlay";
import LoadingOverlay from "@/components/UI/LoadingOverlay";
import { setExpenses } from "@/store/redux/actions";
import { getDateMinusDays } from "@/util/date";
import { fetchExpenses } from "@/util/http";
import { useEffect, useState } from "react";
import { Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";

interface expense {
  id: string;
  amount: number;
  date: Date;
  description: string;
}

const RecentExpenses = () => {
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const dispatch = useDispatch();
  const expensesDetails = useSelector(
    (state: any) => state.expensesReducer.expenses
  );
  // const [fetchedExpenses, setFetchedExpenses] = useState<expense[]>([]);

  // console.log("fetched", fetchedExpenses);

  useEffect(() => {
    async function getExpenses() {
      setIsFetching(true);
      try {
        const expenses = await fetchExpenses();
        dispatch(setExpenses(expenses));
      } catch (error) {
        setError("Could not fetch expenses!");
      }
      setIsFetching(false);
      // setFetchedExpenses(expenses);
    }
    getExpenses();
  }, []);

  const recentExpenses: any = expensesDetails
    .filter((expense: any) => {
      const today = new Date();
      const date7DaysAgo = getDateMinusDays(today, 7);
      const expenseDate = expense?.date.toISOString().split("T")[0];
      return expense.date >= date7DaysAgo && expense.date <= today;
    })
    .sort((firstObject: any, secondObject: any) => {
      firstObject = new Date(firstObject?.date.toISOString().split("T")[0]);
      secondObject = new Date(secondObject?.date.toISOString().split("T")[0]);
      return secondObject - firstObject;
    });

  if (isFetching) {
    return <LoadingOverlay />;
  }

  const errorHandler = () => {
    setError("")
  };

  if (error && !isFetching) {
    return <ErrorOverlay message={error} onConfirm={errorHandler} />;
  }
  return (
    <ExpensesOutput
      expensesPeriod="Last 7 days"
      expenses={recentExpenses}
      fallbackText="No Recent Expenses"
    />
  );
};

export default RecentExpenses;
