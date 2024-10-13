import { DUMMY_EXPENSES } from "@/constants/Constants";
import { FlatList, Text } from "react-native";
import ExpenseItem from "./ExpenseItem";

interface Props {
  expenses: any[];
}

function renderExpenseItem(itemData: any) {
  return <ExpenseItem {...itemData.item} />;
}

const ExpensesList: React.FC<Props> = ({ expenses }) => {
  return (
    <FlatList
      data={expenses}
      renderItem={renderExpenseItem}
      keyExtractor={(item) => item.id}
    />
  );
};

export default ExpensesList;
