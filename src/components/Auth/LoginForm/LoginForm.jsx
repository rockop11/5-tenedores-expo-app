import React, { useState } from 'react'
import { Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Input, Icon, Button } from "@rneui/themed"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { useFormik } from "formik"
import { validationSchema, initialValues } from './LoginForm.data'
import Toast from 'react-native-toast-message'
import { screenNames } from "../../../utils"
import { styles } from './LoginForm.styles'

export function LoginForm() {
    const navigation = useNavigation()

    const [showPassword, setShowPassword] = useState(false)

    const showHiddenPassword = () => {
        setShowPassword(prevState => !prevState)
    }

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: async (formValues) => {
            try {
                const auth = getAuth()
                await signInWithEmailAndPassword(auth, formValues.email, formValues.password)
                navigation.navigate(screenNames.account.account)
            } catch (err) {
                Toast.show({
                    type: "error",
                    position: "bottom",
                    text1: "Credenciales invalidas"
                })
            }
        }
    })

    return (
        <View style={styles.content}>
            <Input
                placeholder='Correo electronico'
                onChangeText={text => formik.setFieldValue("email", text)}
                errorMessage={formik.errors.email}
                containerStyle={styles.input}
                rightIcon={
                    <Icon
                        type="material-community"
                        name="at"
                        iconStyle={styles.icon}
                    />
                }
            />

            <Input
                placeholder='Contraseña'
                onChangeText={text => formik.setFieldValue("password", text)}
                errorMessage={formik.errors.password}
                ontainerStyle={styles.input}
                secureTextEntry={showPassword ? false : true}
                rightIcon={
                    <Icon
                        onPress={showHiddenPassword}
                        type="material-community"
                        name={showPassword ? "eye-off-outline" : "eye-outline"}
                        iconStyle={styles.icon}
                    />
                }
            />

            <Button
                title="Iniciar Sesion"
                onPress={formik.handleSubmit}
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                loading={formik.isSubmitting}
            />
        </View>
    )
}
