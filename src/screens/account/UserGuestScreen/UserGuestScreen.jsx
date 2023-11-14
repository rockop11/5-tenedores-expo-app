import { ScrollView } from 'react-native'
import { Text, Button, Image } from '@rneui/themed'
import { styles } from "./UserGuestScreen.style"
import { useNavigation } from '@react-navigation/native'
import { screenNames } from "../../../utils"

export function UserGuestScreen() {
  const navigation = useNavigation()

  const goToLogin = () => {
    navigation.navigate(screenNames.account.login)
  }

  return (
    <ScrollView centerContent={true} style={styles.content}>
      <Image source={require("../../../../assets/img/user-guest.png")} style={styles.image} />
      <Text style={styles.title}>Consultar tu perfil de 5 tenedores</Text>
      <Text style={styles.description}>
        ¿Como describirías tu mejor restaurante? Busca y visualiza los mejores
        restaurantes de una forma sencilla, vota cual te ha gustado más y
        comenta como ha sito tu experiencia.
      </Text>

      <Button title="Ver tu perfil" onPress={goToLogin} buttonStyle={styles.btn} />
    </ScrollView>
  )
}