import React, { useState } from 'react'
import { View } from 'react-native'
import { useFormik } from 'formik'
import { initialValues, validationSchema } from "./ChangeEmailForm.data"
import { getAuth, updateEmail, EmailAuthProvider, reauthenticateWithCredential, verifyBeforeUpdateEmail } from "firebase/auth"
import { Input, Button } from "@rneui/themed"
import Toast from 'react-native-toast-message'
import { styles } from "./ChangeEmailForm.styles"

export function ChangeEmailForm({ onClose, onReload }) {

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: async (formValue) => {
            try {
                const { email, password } = formValue

                const currentUser = getAuth().currentUser

                const credentials = EmailAuthProvider.credential(currentUser.email, password)
                
                reauthenticateWithCredential(currentUser, credentials)

                await updateEmail(currentUser, email)
                
                onReload()
                onClose()
            } catch (err) {
                console.log(err)
                Toast.show({
                    type: "error",
                    position: "bottom",
                    text1: "Error al cambiar el email"
                })
            }
        }
    })

    const [showPassword, setShowPassword] = useState(false)

    const showPasswordHandler = () => {
        setShowPassword((prevState) => !prevState)
    }

    return (
        <View style={styles.content}>
            <Input
                placeholder='Nuevo email'
                containerStyle={styles.input}
                onChangeText={(text) => formik.setFieldValue('email', text)}
                errorMessage={formik.errors.email}
            />

            <Input
                placeholder='Contraseña'
                style={styles.input}
                secureTextEntry={showPassword ? false : true}
                rightIcon={{
                    type: 'material-community',
                    name: showPassword ? "eye-off-outline" : "eye-outline",
                    color: '#c2c2c2',
                    onPress: showPasswordHandler
                }}
                onChangeText={(text) => {
                    formik.setFieldValue('password', text)
                }}
                errorMessage={formik.errors.password}
            />

            <Button
                title="Cambiar email"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={formik.handleSubmit}
                loading={formik.isSubmitting}
            />
        </View>
    )
}