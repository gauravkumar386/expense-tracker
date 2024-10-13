import { StyleSheet, View } from "react-native";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";
import { DUMMY_EXPENSES } from "@/constants/Constants";
import { GlobalStyles } from "@/constants/Styles";

interface Props {
  expenses: any[];
  expensesPeriod: string;
}

const ExpensesOutput: React.FC<Props> = ({ expenses, expensesPeriod }) => {
  return (
    <View style={Styles.container}>
      <ExpensesSummary expenses={DUMMY_EXPENSES} periodName={expensesPeriod} />
      <ExpensesList expenses={DUMMY_EXPENSES} />
    </View>
  );
};

export default ExpensesOutput;

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700,
  },
});
