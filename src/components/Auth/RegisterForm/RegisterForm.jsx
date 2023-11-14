import { Text, View } from 'react-native'
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Input, Icon, Button } from "@rneui/themed"
import { useFormik } from "formik"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import { initialValues, validationSchema } from "./RegisterForm.data"
import Toast from 'react-native-toast-message';
import { screenNames } from "../../../utils"
import { styles } from './RegisterForm.styles'

export function RegisterForm() {
    const navigation = useNavigation()

    const [showPassword, setShowPassword] = useState(false)
    const [showRepeatPassword, setShowRepeatPassword] = useState(false)

    const showHiddenPassword = () => {
        setShowPassword(prevState => !prevState)
    }

    const showHiddenRepeatPassword = () => {
        setShowRepeatPassword(prevState => !prevState)
    }

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: async (formValues) => {
            try {
                const auth = getAuth()
                await createUserWithEmailAndPassword(auth, formValues.email, formValues.password)
                navigation.navigate(screenNames.account.account)
            } catch (err) {
                Toast.show({
                    type: "error",
                    position: "bottom",
                    text1: "Error de registro"
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
                placeholder='contraseña'
                onChangeText={text => formik.setFieldValue("password", text)}
                errorMessage={formik.errors.password}
                secureTextEntry={showPassword ? false : true}
                containerStyle={styles.input}
                rightIcon={
                    <Icon
                        onPress={showHiddenPassword}
                        type="material-community"
                        name={showPassword ? "eye-off-outline" : "eye-outline"}
                        iconStyle={styles.icon}
                    />
                }
            />
            <Input
                placeholder='Repetir Contraseña'
                onChangeText={text => formik.setFieldValue("repeatPassword", text)}
                errorMessage={formik.errors.repeatPassword}
                secureTextEntry={showRepeatPassword ? false : true}
                containerStyle={styles.input}
                rightIcon={
                    <Icon
                        onPress={showHiddenRepeatPassword}
                        type="material-community"
                        name={showRepeatPassword ? "eye-off-outline" : "eye-outline"}
                        iconStyle={styles.icon}
                    />
                }
            />
            <Button
                title="Registrarse"
                onPress={formik.handleSubmit}
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                loading={formik.isSubmitting}
            />
        </View>
    )
}