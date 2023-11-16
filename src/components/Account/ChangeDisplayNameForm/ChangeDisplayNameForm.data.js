import * as Yup from "yup"

export function initalValues() {
    return {
        displayName: "",
    }
}

export function validationSchema() {
    return Yup.object({
        displayName: Yup.string().required('El nombre y apellido son requreidos')
    })
}