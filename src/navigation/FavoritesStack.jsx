import { createNativeStackNavigator} from "@react-navigation/native-stack"
import { FavoritesScreen } from "../screens/FavoritesScreen"
import { screenNames } from "../utils"

const Stack = createNativeStackNavigator()

export function FavoritesStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name={screenNames.favorites.favorites}
                component={FavoritesScreen}
                options={{ title: "Favoritos" }}
            />
        </Stack.Navigator>
    )
}