import ExpensesOutput from "@/components/ExpensesOutput/ExpensesOutput"
import { Text } from "react-native"

const AllExpenses=()=>{
    return(
        <ExpensesOutput expensesPeriod="Total" expenses={[]}/>
    )
}

export default AllExpenses