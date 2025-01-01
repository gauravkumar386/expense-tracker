import { GlobalStyles } from "@/constants/Styles";
import { ActivityIndicator, StyleSheet, View } from "react-native";

interface Props {
  
}

const LoadingOverlay: React.FC<Props> = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="white" />
    </View>
  );
};

export default LoadingOverlay;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary700
    }
})
