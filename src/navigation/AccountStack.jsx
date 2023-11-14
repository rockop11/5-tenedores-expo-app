import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { AccountScreen } from "../screens/account/AccountScreen"
import { LoginScreen } from "../screens/account/LoginScreen"
import { RegisterScreen } from "../screens/account/RegisterScreen"
import { screenNames } from "../utils"

const Stack = createNativeStackNavigator()

export function AccountStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name={screenNames.account.account}
                component={AccountScreen}
                options={{ title: "Cuenta" }}
            />
            <Stack.Screen
                name={screenNames.account.login}
                component={LoginScreen}
                options={{ title: "Login" }}
            />
            <Stack.Screen
                name={screenNames.account.register}
                component={RegisterScreen}
                options={{ title: "Registro" }}
            />
        </Stack.Navigator>
    )
}