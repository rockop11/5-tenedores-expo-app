import { LogBox } from "react-native"
import { NavigationContainer } from "@react-navigation/native";
import { AppNavigator } from "./src/navigation/AppNavigation"
import Toast from 'react-native-toast-message';
import { initFirebase } from "./src/utils";
import 'react-native-get-random-values';

LogBox.ignoreAllLogs()

export default function App() {
  return (
    <>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>

      <Toast />
    </>
  );
}
