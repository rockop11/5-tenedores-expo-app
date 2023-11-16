import * as Yup from "yup"

export function initialValues() {
    return {
        password: "",
        newPassword: "",
        confirmNewPassword: ""
    }
}

export function validationSchema() {
    return Yup.object({
        password: Yup.string().required('La contraseña es requerida'),
        newPassword: Yup.string().required('La contraseña es requerida'),
        confirmNewPassword: Yup.string()
            .required("Este campo es obligatorio")
            .oneOf(
                [Yup.ref("newPassword")],
                "Las nuevas contraseñas tienen que ser iguales"
            ),
    })
}