import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { registerSchema } from '../../validationSchemas/Register'
import ButtonsLogin from '../LoginUser/ButtonsLogin'
import FieldForm from '../LoginUser/FieldForm'
import AlertSimple from '../LoginUser/AlertSimple'

export default function FormRegister ({ navigation }) {
  const [showAlert, setShowAlert] = useState(false)
  const { control, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      name: '',
      lastName: '',
      username: '',
      email: '',
      password: '',
      passwordConfirmed: ''
    }
  })

  const fieldsResetForm = () => {
    reset({
      name: '',
      lastName: '',
      username: '',
      email: '',
      password: '',
      passwordConfirmed: ''
    })
  }

  const handleShowAlert = () => {
    setShowAlert(prevShowAlert => !prevShowAlert)
  }

  return (
    <>
      <AlertSimple
        show={showAlert}
        title='⚠ ¡ERROR! ⚠'
        titleStyle={{ fontWeight: 'bold' }}
        message='¡El correo electrónico que intenta registrar ya se encuentra en uso!'
        cancelText='OK'
        onCancelPressed={handleShowAlert}
      />
      <View style={styles.formContainer}>
        <View>
          <FieldForm
            control={control}
            placeholder='Nombre'
            nameField='name'
            errors={errors}
          />
          <FieldForm
            control={control}
            placeholder='Apellidos'
            nameField='lastName'
            errors={errors}
          />
          <FieldForm
            control={control}
            placeholder='Nombre de usuario'
            nameField='username'
            errors={errors}
          />
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
          <FieldForm
            control={control}
            placeholder='Confirmar contraseña'
            isPasswordField
            nameField='passwordConfirmed'
            errors={errors}
          />
          <ButtonsLogin
            isLoginButton
            handleSubmit={handleSubmit}
            txtButton='REGISTRARSE'
            fieldsResetForm={fieldsResetForm}
            handleShowAlert={handleShowAlert}
            navigation={navigation}
          />
        </View>
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
  }
})
