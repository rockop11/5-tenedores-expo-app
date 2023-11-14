import { Text, View, Button } from 'react-native'
import { screenNames } from "../../utils"
import { useNavigation } from "@react-navigation/native"

export function RestaurantsScreen() {
  const navigation = useNavigation()

  const goToAddRestautant = () => {
    navigation.navigate(screenNames.restaurant.addRestaurant)
  }

  return (
    <View>
      <Text>Restaurants screen</Text>
      <Button title='Crear Restaurante' onPress={goToAddRestautant} />
    </View>
  )
}
