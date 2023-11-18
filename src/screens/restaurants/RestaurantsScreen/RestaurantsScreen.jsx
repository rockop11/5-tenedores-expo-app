import { useState, useEffect } from 'react'
import { Text, View, Button } from 'react-native'
import { useNavigation } from "@react-navigation/native"
import { Icon } from '@rneui/themed'
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { screenNames } from "../../../utils"
import { styles } from './RestaurantsScreen.styles'

export function RestaurantsScreen() {
  const navigation = useNavigation()

  const [currentUser, setCurrentUser] = useState(null)

  const goToAddRestautant = () => {
    navigation.navigate(screenNames.restaurant.addRestaurant)
  }

  useEffect(() => {
    const auth = getAuth()

    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
    })
  }, [])

  return (
    <View style={styles.content}>
      <Text>Restaurants screen</Text>

      {
        currentUser && (
          <Icon
            reverse
            type='material-community'
            name="plus"
            color="#00a680"
            containerStyle={styles.btnContainer}
            onPress={goToAddRestautant}
          />
        )
      }
    </View>
  )
}
