import { GlobalStyles } from "@/constants/Styles";
import { getFormattedDate } from "@/util/date";
import { useNavigation } from "@react-navigation/native";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface Props {
  id: string;
  description: string;
  date: Date;
  amount: number;
}

const ExpenseItem: React.FC<Props> = ({ id, description, date, amount }) => {
  const navigation = useNavigation<any>();
  const pressHandler = () => {
    navigation.navigate("ManageExpense", {
      expenseId: id,
    });
  };
  return (
    <Pressable
      onPress={pressHandler}
      style={({ pressed }) => pressed && Styles.pressed}
    >
      <View style={Styles.expenseItem}>
        <View>
          <Text style={[Styles.textBase, Styles.description]}>
            {description}
          </Text>
          <Text style={Styles.textBase}>{getFormattedDate(date)}</Text>
        </View>
        <View style={Styles.amountContainer}>
          <Text style={Styles.amount}>{amount.toFixed(2)}</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default ExpenseItem;

const Styles = StyleSheet.create({
  pressed: {
    opacity: 0.75,
  },
  expenseItem: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: GlobalStyles.colors.primary500,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 6,
    elevation: 3,
    shadowColor: GlobalStyles.colors.gray500,
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
  },
  textBase: {
    color: GlobalStyles.colors.primary50,
  },
  description: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: "bold",
  },
  amountContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    minWidth: 80,
  },
  amount: {
    color: GlobalStyles.colors.primary500,
  },
});
