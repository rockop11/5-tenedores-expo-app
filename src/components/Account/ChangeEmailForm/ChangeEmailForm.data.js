import * as Yup from "yup"

export function initialValues() {
    return {
        email: "",
        password: ""
    }
}

export function validationSchema() {
    return Yup.object({
        email: Yup.string().email('debe ingresar un email valido').required('debe ingresar su email'),
        password: Yup.string().required('la contraseña es obligatoria')
    })
}