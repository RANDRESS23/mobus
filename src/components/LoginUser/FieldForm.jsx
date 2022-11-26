import React from 'react'
import { StyleSheet, View, Text, TextInput } from 'react-native'
import { Controller } from 'react-hook-form'
import { FontAwesome5 } from '@expo/vector-icons'

const ICONS_FORM = {
  name: 'user-alt',
  lastName: 'user-alt',
  username: 'user-tag',
  email: 'at',
  password: 'lock',
  passwordConfirmed: 'lock'
}

/* ➡ Componente que se encarga de renderizar el input que se adecue al formulario de login o al formulario de registro. */
export default function FieldForm ({ control, placeholder, isPasswordField, nameField, errors }) {
  return (
    <>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={{ flexDirection: 'row', alignItems: 'center', width: '90%' }}>
            <FontAwesome5 name={ICONS_FORM[nameField]} style={styles.inputIcon} />
            <TextInput
              style={styles.inputForm}
              placeholder={placeholder}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              secureTextEntry={!!isPasswordField}
            />
          </View>
        )}
        name={nameField}
      />
      <Text style={styles.errorMessage}>{errors[nameField]?.message}</Text>
    </>
  )
}

const styles = StyleSheet.create({
  inputIcon: {
    fontSize: 20,
    color: '#7900ac',
    paddingBottom: 15,
    paddingRight: 10
  },
  inputForm: {
    width: '100%',
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
