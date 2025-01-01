import ExpensesOutput from "@/components/ExpensesOutput/ExpensesOutput";
import { Text } from "react-native";
import { useSelector } from "react-redux";

const AllExpenses = () => {
  const expensesDetails = useSelector(
    (state: any) => state.expensesReducer.expenses
  );
  const allExpenses = expensesDetails.sort(
    (firstObject: any, secondObject: any) => {
      firstObject = new Date(firstObject?.date.toISOString().split("T")[0]);
      secondObject = new Date(secondObject?.date.toISOString().split("T")[0]);
      return secondObject - firstObject;
    }
  );
  return (
    <ExpensesOutput
      expensesPeriod="Total"
      expenses={expensesDetails}
      fallbackText="No Expenses Found"
    />
  );
};

export default AllExpenses;
