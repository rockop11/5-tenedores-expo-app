import { View } from 'react-native'
import { useState } from 'react'
import { Button } from "@rneui/themed"
import { getAuth, signOut } from "firebase/auth"
import { InfoUser, AccountOptions } from '../../../components/Account'
import { LoadingModal } from "../../../components/Shared"
import { styles } from "./UserLoggedScreen.styles"

export function UserLoggedScreen() {

  const [loading, setLoading] = useState()
  const [loadingText, setLoadingText] = useState("")
  const [_, setReload] = useState(false)

  const onReload = () => {
    setReload((prevState) => !prevState)
  }

  const handleLogout = async () => {
    const auth = getAuth()
    await signOut(auth)
  }

  return (
    <View>
      <InfoUser
        setLoading={setLoading}
        setLoadingText={setLoadingText}
      />

      <AccountOptions onReload={onReload} />

      <Button
        title="Cerrar Sesion"
        buttonStyle={styles.btn}
        titleStyle={styles.btnTitle}
        onPress={handleLogout}
      />

      <LoadingModal show={loading} text={loadingText} />
    </View>
  )
}