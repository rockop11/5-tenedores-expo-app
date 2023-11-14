import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { screenNames } from "../utils"
import { AddRestaurantScreen } from "../screens/restaurants/AddRestaurantScreen"
import { RestaurantsScreen } from "../screens/restaurants/RestaurantsScreen"

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