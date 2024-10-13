import ExpensesOutput from "@/components/ExpensesOutput/ExpensesOutput"
import { Text } from "react-native"

const RecentExpenses=()=>{
    return(
        <ExpensesOutput expensesPeriod="Last 7 days" expenses={[]} />
    )
}

export default RecentExpenses