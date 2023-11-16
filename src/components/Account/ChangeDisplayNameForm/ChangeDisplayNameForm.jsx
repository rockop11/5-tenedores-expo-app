import React from 'react'
import { View } from 'react-native'
import { useFormik } from 'formik'
import { initalValues, validationSchema } from "./ChangeDisplayNameForm.data"
import { getAuth, updateProfile } from "firebase/auth"
import { Input, Button } from "@rneui/themed"
import Toast from 'react-native-toast-message'
import { styles } from "./ChangeDisplayNameForm.styles"

export function ChangeDisplayNameForm({ onClose, onReload }) {

    const formik = useFormik({
        initialValues: initalValues(),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: async (formValue) => {
            try {
                const { displayName } = formValue
                const currentUser = getAuth().currentUser
                await updateProfile(currentUser, { displayName })
                onReload()
                onClose()
            } catch (err) {
                Toast.show({
                    type: "error",
                    position: "bottom",
                    text1: "Error al cambiar el nombre y apellido"
                })
            }
        }
    })

    return (
        <View>
            <Input
                placeholder='Nombre y Apellidos'
                style={styles.content}
                rightIcon={{ type: 'material-community', name: 'account-circle-outline', color: '#c2c2c2' }}
                onChangeText={(text) => formik.setFieldValue("displayName", text)}
                errorMessage={formik.errors.displayName}
            />

            <Button
                title="Cambiar Nombre y apelldidos"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={formik.handleSubmit}
                loading={formik.isSubmitting}
            />
        </View>
    )
}