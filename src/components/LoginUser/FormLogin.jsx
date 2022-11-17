import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { loginSchema } from '../../validationSchemas/Login'
import { getAuth, sendPasswordResetEmail } from 'firebase/auth'
import ButtonsLogin from './ButtonsLogin'
import FieldForm from './FieldForm'
import * as yup from 'yup'
import AlertSimple from './AlertSimple'

export default function FormLogin ({ navigation }) {
  const [showAlert, setShowAlert] = useState(false)
  const [showAlert2, setShowAlert2] = useState(false)
  const [showAlert3, setShowAlert3] = useState(false)
  const [showAlert4, setShowAlert4] = useState(false)
  const { control, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })
  const auth = getAuth()

  const fieldsResetForm = () => {
    reset({ email: '', password: '' })
  }

  const handleShowAlert = () => {
    setShowAlert(prevShowAlert => !prevShowAlert)
  }

  const loginSchema2 = yup.object({
    email: yup.string()
      .email('El correo electrónico debe ser un correo válido').trim()
      .required('El correo electrónico es un campo obligatorio')
  }).required()

  const handleShowAlert3 = () => {
    loginSchema2.validate({ email: control._formValues.email })
      .then((res) => {
        sendPasswordResetEmail(auth, res.email)
          .then(() => setShowAlert3(prevShowAlert => !prevShowAlert))
          .catch((error) => {
            console.log(error)
            setShowAlert4(prevShowAlert => !prevShowAlert)
          })
      })
      .catch((e) => {
        console.log(e)
        setShowAlert2(prevShowAlert => !prevShowAlert)
      })
  }

  return (
    <>
      <AlertSimple
        show={showAlert}
        title='⚠ ¡ERROR! ⚠'
        titleStyle={{ fontWeight: 'bold' }}
        message='¡El correo electrónico o la contraseña están incorrectos!'
        cancelText='OK'
        onCancelPressed={handleShowAlert}
      />
      <AlertSimple
        show={showAlert2}
        title='⚠ ¡ERROR! ⚠'
        titleStyle={{ fontWeight: 'bold' }}
        message='¡El campo "email" debe de ser válido para enviar el correo de recuperación de contraseña!'
        cancelText='ENTENDIDO'
        onCancelPressed={() => setShowAlert2(prevShowAlert => !prevShowAlert)}
      />
      <AlertSimple
        show={showAlert4}
        title='⚠ ¡ERROR! ⚠'
        titleStyle={{ fontWeight: 'bold' }}
        message={`El correo electrónico ${control._formValues.email.trim()} no se encuentra registrado en nuestra base de datos de MoBus.`}
        cancelText='ENTENDIDO'
        onCancelPressed={() => setShowAlert4(prevShowAlert => !prevShowAlert)}
      />
      <AlertSimple
        show={showAlert3}
        title='¡INSTRUCCIONES ENVIADAS!'
        titleStyle={{ width: '100%', fontSize: 17, fontWeight: 'bold' }}
        message={`Hemos enviado instrucciones para cambiar tu contraseña a ${control._formValues.email.trim()}. Revisa la bandeja de entrada y la carpeta de spam.`}
        cancelText='ENTENDIDO'
        onCancelPressed={() => setShowAlert3(prevShowAlert => !prevShowAlert)}
      />
      <View style={styles.formContainer}>
        <View>
          <FieldForm
            control={control}
            placeholder='Correo electrónico'
            nameField='email'
            errors={errors}
          />
          <FieldForm
            control={control}
            placeholder='Contraseña'
            isPasswordField
            nameField='password'
            errors={errors}
          />
          <ButtonsLogin
            isLoginButton
            handleSubmit={handleSubmit}
            txtButton='INICIAR SESIÓN'
            fieldsResetForm={fieldsResetForm}
            handleShowAlert={handleShowAlert}
            navigation={navigation}
          />
        </View>
        <TouchableOpacity
          onPress={handleShowAlert3}
        >
          <Text style={styles.txtPasswordForged}>¿HAS OLVIDADO TU CONTRASEÑA?</Text>
        </TouchableOpacity>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  formContainer: {
    width: '80%'
  },
  inputForm: {
    fontSize: 16,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#bdc3c7',
    marginBottom: 20
  },
  errorMessage: {
    fontSize: 13,
    color: 'red',
    marginTop: -20,
    marginBottom: 10
  },
  txtPasswordForged: {
    marginVertical: 15,
    color: '#7900ac',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center'
  }
})
