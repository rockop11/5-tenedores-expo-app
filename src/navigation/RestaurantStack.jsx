import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { AddRestaurantScreen, RestaurantsScreen} from "../screens/restaurants"
import { screenNames } from "../utils"

const Stack = createNativeStackNavigator()

export function RestauranteStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name={screenNames.restaurant.restaurants}
                component={RestaurantsScreen}
                options={{ title: "Restaurants" }}
            />

            <Stack.Screen
                name={screenNames.restaurant.addRestaurant}
                component={AddRestaurantScreen}
                options={{ title: "Nuevo Restaurante" }}
            />
        </Stack.Navigator>
    )
}