import { View, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Text, Image } from '@rneui/themed'
import { LoginForm } from '../../../components/Auth'
import { screenNames } from "../../../utils"
import { styles } from "./LoginScreen.styles"

export function LoginScreen() {
  const navigation = useNavigation()

  const goToRegister = () => {
    navigation.navigate(screenNames.account.register)
  }


  return (
    <ScrollView>
      <Image source={require("../../../../assets/img/5-tenedores-letras-icono-logo.png")} style={styles.image} />


      <View style={styles.content}>
        <LoginForm />

        <Text style={styles.textRegister}>
        ¿Aún no tienes cuenta? <Text onPress={goToRegister} style={styles.btn}>Registrarse</Text>
        </Text>
      </View>
    </ScrollView>
  )
}
