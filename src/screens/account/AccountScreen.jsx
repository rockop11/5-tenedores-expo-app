import { Text, View } from 'react-native'
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { useState, useEffect } from 'react'
import { UserGuestScreen } from "./UserGuestScreen"
import { UserLoggedScreen } from './UserLoggedScreen'
import { LoadingModal } from '../../components'

export function AccountScreen() {

  const [hasLogged, setHasLogged] = useState(null)

  useEffect(() => {
    const auth = getAuth()

    onAuthStateChanged(auth, (user) => {
      setHasLogged(user ? true : false)
    })
  }, [])

  if(hasLogged === null) {
    return <LoadingModal show />
  }

  return hasLogged ? <UserLoggedScreen /> : <UserGuestScreen />
}
