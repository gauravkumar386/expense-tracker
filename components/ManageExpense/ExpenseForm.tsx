import { Alert, StyleSheet, Text, View } from "react-native";
import Input from "../UI/Input";
import { useState } from "react";
import Button from "../UI/Button";
import { getISOFormattedDate } from "@/util/date";
import { GlobalStyles } from "@/constants/Styles";

type expenseData = {
  amount: number;
  date: Date;
  description: string;
};

interface Props {
  defaultValues: any;
  submitButtonLabel: string;
  onCancel: () => void;
  onSubmit: (expenseData: expenseData) => void;
}

const ExpenseForm: React.FC<Props> = ({
  submitButtonLabel,
  onCancel,
  onSubmit,
  defaultValues,
}) => {
  const [inputs, setInputs] = useState({
    amount: {
      value: defaultValues ? defaultValues.amount.toString() : "",
      isValid: true,
    },
    date: {
      value: defaultValues ? getISOFormattedDate(defaultValues.date) : "",
      isValid: true,
    },
    description: {
      value: defaultValues ? defaultValues.description : "",
      isValid: true,
    },
  });

  const inputChangeHandler = (
    inputIdentifier: string,
    enteredValue: number | string
  ) => {
    setInputs((curInputs: any) => {
      return {
        ...curInputs,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  };

  const submitHandler = () => {
    const expenseData = {
      amount: +inputs.amount.value,
      date: new Date(inputs.date.value),
      description: inputs.description.value,
    };

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== "Invalid Date";
    const descriptionIsValid = expenseData.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      // Alert.alert("Invalid input", "Please check your input values");
      setInputs((curInputs: any) => {
        return {
          amount: { value: curInputs.amount.value, isValid: amountIsValid },
          date: { value: curInputs.date.value, isValid: dateIsValid },
          description: {
            value: curInputs.description.value,
            isValid: descriptionIsValid,
          },
        };
      });
      return;
    }
    onSubmit(expenseData);
  };

  const formIsInvalid =
    !inputs.amount.isValid ||
    !inputs.date.isValid ||
    !inputs.description.isValid;

  return (
    <View>
      <Input
        label="Amount"
        textInputConfig={{
          keyboardType: "decimal-pad",
          onChangeText: inputChangeHandler.bind(this, "amount"),
          value: inputs.amount.value,
          invalid: !inputs.amount.isValid,
        }}
      />
      <Input
        label="Date"
        textInputConfig={{
          placeholder: "YYYY-MM-DD",
          maxLength: 10,
          onChangeText: inputChangeHandler.bind(this, "date"),
          value: inputs.date.value,
          invalid: !inputs.date.isValid,
        }}
      />
      <Input
        label="Description"
        textInputConfig={{
          multiline: true,
          //   autoCapitalize: true,
          //   autoCorrect: false,
          onChangeText: inputChangeHandler.bind(this, "description"),
          value: inputs.description.value,
          invalid: !inputs.description.isValid,
        }}
      />
      {formIsInvalid && (
        <Text style={styles.errorMessage}>
          Invalid input, Please check your input values
        </Text>
      )}
      <View style={styles.buttons}>
        <Button style={styles.button} mode="flat" onPress={onCancel}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={submitHandler}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
};

export default ExpenseForm;

const styles = StyleSheet.create({
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  errorMessage: {
    textAlign: "center",
    color: GlobalStyles.colors.error500,
    margin: 8,
  },
});
