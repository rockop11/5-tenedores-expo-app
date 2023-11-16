import React, { useState } from 'react'
import { View } from 'react-native'
import { useFormik } from 'formik'
import { initialValues, validationSchema } from './ChangePasswordForm.data'
import { getAuth, updatePassword, EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth"
import { Input, Button } from "@rneui/themed"
import Toast from 'react-native-toast-message'
import { styles } from "./ChangePasswordForm.styles"

export function ChangePasswordForm({ onClose }) {

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: async (formValues) => {
            try {
                const { password, newPassword } = formValues

                const currentUser = getAuth().currentUser

                const credentials = EmailAuthProvider.credential(currentUser.email, password)
                
                reauthenticateWithCredential(currentUser, credentials)

                await updatePassword(currentUser, newPassword)

                onClose()
            } catch (err) {
                console.log(err)
                Toast.show({
                    type: "error",
                    position: "bottom",
                    text1: "Error al cambiar la contraseña"
                })
            }
        }
    })

    const [showPassword, setShowPassword] = useState(false)

    const showPasswordHandler = () => {
        setShowPassword(prevState => !prevState)
    }

    return (
        <View style={styles.content}>
            <Input
                placeholder='Contraseña actual'
                secureTextEntry={showPassword ? false : true}
                containerStyle={styles.inputContainer}
                style={styles.input}
                rightIcon={{
                    type: 'material-community',
                    name: showPassword ? "eye-off-outline" : "eye-outline",
                    color: '#c2c2c2',
                    onPress: showPasswordHandler
                }}
                onChangeText={(text) => formik.setFieldValue("password", text)}
                errorMessage={formik.errors.password}
            />

            <Input
                placeholder='Nueva contraseña'
                secureTextEntry={showPassword ? false : true}
                containerStyle={styles.inputContainer}
                style={styles.input}
                rightIcon={{
                    type: 'material-community',
                    name: showPassword ? "eye-off-outline" : "eye-outline",
                    color: '#c2c2c2',
                    onPress: showPasswordHandler
                }}
                onChangeText={(text) => formik.setFieldValue("newPassword", text)}
                errorMessage={formik.errors.newPassword}
            />

            <Input
                placeholder='Repite nueva contraseña'
                containerStyle={styles.inputContainer}
                secureTextEntry={showPassword ? false : true}
                style={styles.input}
                rightIcon={{
                    type: 'material-community',
                    name: showPassword ? "eye-off-outline" : "eye-outline",
                    color: '#c2c2c2',
                    onPress: showPasswordHandler
                }}
                onChangeText={(text) => formik.setFieldValue("confirmNewPassword", text)}
                errorMessage={formik.errors.confirmNewPassword}
            />

            <Button
                title="Cambiar contraseña"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={formik.handleSubmit}
                loading={formik.isSubmitting}
            />
        </View>
    )
}