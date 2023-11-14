import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Icon } from "@rneui/base"
import { screenNames } from "../utils/index"
//Stacks
import { RestauranteStack } from "./RestaurantStack"
import { FavoritesStack } from "./FavoritesStack"
import { RankingStack } from "./RankingStack"
import { SearchStack } from "./SearchStack"
import { AccountStack } from "./AccountStack"

const Tab = createBottomTabNavigator()

export function AppNavigator() {
    return (
        <Tab.Navigator screenOptions={({ route }) => ({
            headerShown: false,
            tabBarActiveTintColor: "#00a680",
            tabBarInactiveTintColor: "#646464",
            tabBarIcon: ({ color, size }) => screenOptions(route, color, size)
        })}>
            <Tab.Screen
                name={screenNames.restaurant.tab}
                component={RestauranteStack}
                options={{ title: "Restaurantes" }}
            />
            <Tab.Screen
                name={screenNames.favorites.tab}
                component={FavoritesStack}
                options={{title: "Favoritos"}}
            />
            <Tab.Screen
                name={screenNames.ranking.tab}
                component={RankingStack}
                options={{ title: "Ranking" }}
            />
            <Tab.Screen
                name={screenNames.search.tab}
                component={SearchStack}
                options={{ title: "Busqueda" }}
            />
            <Tab.Screen
                name={screenNames.account.tab}
                component={AccountStack}
                options={{ title: "Cuenta" }}
            />
        </Tab.Navigator>
    )
}

function screenOptions(route, color, size) {
    let iconName;

    if (route.name === screenNames.restaurant.tab) {
        iconName = "compass-outline"
    }

    if (route.name === screenNames.favorites.tab) {
        iconName = "heart-outline"
    }

    if (route.name === screenNames.account.tab) {
        iconName = "home-outline"
    }

    if (route.name === screenNames.ranking.tab) {
        iconName = "star-outline"
    }

    if (route.name === screenNames.search.tab) {
        iconName = "magnify"
    }

    return (
        <Icon type="material-community" name={iconName} color={color} size={size} />
    )
}