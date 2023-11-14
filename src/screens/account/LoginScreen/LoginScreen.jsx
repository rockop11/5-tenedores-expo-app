import { View, ScrollView } from 'react-native'
import { Text, Image } from '@rneui/themed'
import { styles } from "./LoginScreen.styles"
import { useNavigation } from '@react-navigation/native'
import { screenNames } from "../../../utils"

export function LoginScreen() {
  const navigation = useNavigation()

  const goToRegister = () => {
    navigation.navigate(screenNames.account.register)
  }


  return (
    <ScrollView>
      <Image source={require("../../../../assets/img/5-tenedores-letras-icono-logo.png")} style={styles.image} />


      <View style={styles.content}>
        <Text>Estamos en el Login</Text>

        <Text onPress={goToRegister}>Registrarse</Text>
      </View>
    </ScrollView>
  )
}
