import { StyleSheet, Text, View } from "react-native";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";
import { DUMMY_EXPENSES } from "@/constants/Constants";
import { GlobalStyles } from "@/constants/Styles";

interface Props {
  expenses: any[];
  expensesPeriod: string;
  fallbackText: string;
}

const ExpensesOutput: React.FC<Props> = ({
  expenses,
  expensesPeriod,
  fallbackText,
}) => {
  let content = <Text style={Styles.infoText}>{fallbackText}</Text>;
  if (expenses.length > 0) {
    content = <ExpensesList expenses={expenses} />;
  }
  return (
    <View style={Styles.container}>
      <ExpensesSummary expenses={expenses} periodName={expensesPeriod} />
      {content}
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
  infoText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    marginTop: 32,
  },
});
