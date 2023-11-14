import { createNativeStackNavigator} from "@react-navigation/native-stack"
import { RankingScreen } from "../screens/RankingScreen"
import { screenNames } from "../utils"

const Stack = createNativeStackNavigator()

export function RankingStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name={screenNames.ranking.ranking}
                component={RankingScreen}
                options={{ title: "Ranking" }}
            />
        </Stack.Navigator>
    )
}