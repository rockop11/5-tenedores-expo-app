import { View } from 'react-native'
import { KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view"
import { Image } from '@rneui/themed'
import { RegisterForm } from '../../../components/Auth'
import { styles } from './RegisterScreen.style'

export function RegisterScreen() {
  return (
    <KeyboardAwareScrollView>
      <Image source={require("../../../../assets/img/5-tenedores-letras-icono-logo.png")} style={styles.image} />
      <View style={styles.content}>
        <RegisterForm />
      </View>
    </KeyboardAwareScrollView>
  )
}