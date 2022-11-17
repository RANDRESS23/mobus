import * as yup from 'yup'

const PASSWORD_EXPRESION = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,15}/

const loginSchema = yup.object({
  email: yup.string()
    .email('El correo electrónico debe ser un correo válido').trim()
    .required('El correo electrónico es un campo obligatorio'),
  password: yup.string().trim()
    .matches(PASSWORD_EXPRESION, 'La contraseña debe de tener: Minimo 8 caracteres | Maximo 15 | Al menos una letra mayúscula | Al menos una letra minucula | Al menos un dígito | Al menos 1 caracter especial')
    .required('La contraseña es un campo obligatorio')
}).required()

export { loginSchema }
