import ExpenseForm from "@/components/ManageExpense/ExpenseForm";
import Button from "@/components/UI/Button";
import ErrorOverlay from "@/components/UI/ErrorOverlay";
import IconButton from "@/components/UI/IconButton";
import LoadingOverlay from "@/components/UI/LoadingOverlay";
import { GlobalStyles } from "@/constants/Styles";
import {
  addExpense,
  deleteExpense,
  updateExpense,
} from "@/store/redux/actions";
import { deleteExpenses, storeExpense, updateExpenses } from "@/util/http";
import { useLayoutEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

type expenseData = {
  id?: number;
  amount: number;
  date: Date;
  description: string;
};
interface Props {
  route: any;
  navigation: any;
}

const ManageExpense: React.FC<Props> = ({ route, navigation }) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const allExpenses = useSelector(
    (state: any) => state.expensesReducer.expenses
  );
  const dispatch = useDispatch();
  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;

  const selectedExpense = allExpenses.find((expense: expenseData) => {
    return expense.id == editedExpenseId;
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  async function deleteExpenseHandler() {
    setIsSubmitting(true);
    try {
      dispatch(deleteExpense(editedExpenseId));
      await deleteExpenses(editedExpenseId);
    } catch (error) {
      setError("Could not delete expense!");
    }
    navigation.goBack();
  }

  const cancelHandler = () => {
    navigation.goBack();
  };

  async function confirmHandler(expenseData: expenseData) {
    try {
      if (isEditing) {
        setIsSubmitting(true);
        dispatch(
          updateExpense({
            id: editedExpenseId,
            data: expenseData,
          })
        );
        await updateExpenses(editedExpenseId, expenseData);
      } else {
        setIsSubmitting(true);
        const id = await storeExpense(expenseData);
        dispatch(addExpense({ ...expenseData, id: id }));
      }
      navigation.goBack();
    } catch (error) {
      setError("Could not update data, please try again!");
      setIsSubmitting(false)
    }
  }

  if (isSubmitting) {
    return <LoadingOverlay />;
  }

  const errorHandler = () => {
    setError("");
  };

  if (error && !isSubmitting) {
    return <ErrorOverlay message={error} onConfirm={errorHandler} />;
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        submitButtonLabel={isEditing ? "Update" : "Add"}
        onCancel={cancelHandler}
        onSubmit={confirmHandler}
        defaultValues={selectedExpense}
      />
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
};

export default ManageExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
