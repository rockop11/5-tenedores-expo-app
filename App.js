import { LogBox } from "react-native"
import { NavigationContainer } from "@react-navigation/native";
import { AppNavigator } from "./src/navigation/AppNavigation"
import { initFirebase } from "./src/utils";

LogBox.ignoreAllLogs()

export default function App() {
  return (
    <>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </>
  );
}
