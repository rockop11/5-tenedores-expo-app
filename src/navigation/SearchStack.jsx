import { createNativeStackNavigator} from "@react-navigation/native-stack"
import { SearchScreen } from "../screens/SearchScreen"
import { screenNames } from "../utils"

const Stack = createNativeStackNavigator()

export function SearchStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name={screenNames.search.search}
                component={SearchScreen}
                options={{ title: "Busqueda" }}
            />
        </Stack.Navigator>
    )
}