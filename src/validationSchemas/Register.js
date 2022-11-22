import * as yup from 'yup'

const PASSWORD_EXPRESION = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,15}/
const USERNAME_EXPRESION = /^(?=[a-zA-Z0-9._]{4,10}$)(?!.*[_.]{2})[^_.].*[^_.]$/
const NAME_EXPRESSION = /^[a-z ,.'-]+$/i

const registerSchema = yup.object({
  name: yup.string().trim()
    .required('El nombre es un campo obligatorio')
    .matches(NAME_EXPRESSION, 'Digite un nombre que sea válido'),
  lastName: yup.string().trim()
    .required('El apellido es un campo obligatorio')
    .matches(NAME_EXPRESSION, 'Digite un nombre que sea válido'),
  username: yup.string().trim()
    .required('El nombre de usuario es un campo obligatorio')
    .min(4, 'El nombre de usuario debe tener al menos 4 caracteres')
    .max(10, 'El nombre de usuario debe tener como máximo 10 caracteres')
    .matches(USERNAME_EXPRESION, 'Digite un nombre de usuario válido'),
  email: yup.string()
    .email('El correo electrónico debe ser un correo válido').trim()
    .required('El correo electrónico es un campo obligatorio'),
  password: yup.string().trim()
    .required('La contraseña es un campo obligatorio')
    .matches(PASSWORD_EXPRESION, 'La contraseña debe de tener: Minimo 8 caracteres | Maximo 15 | Al menos una letra mayúscula | Al menos una letra minúscula | Al menos un dígito | Al menos 1 caracter especial'),
  passwordConfirmed: yup.string().trim()
    .oneOf([yup.ref('password'), null], 'La contraseña no coincide')
}).required()

export { registerSchema }
