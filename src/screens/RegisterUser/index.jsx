import React from 'react'
import { StyleSheet, ScrollView, View } from 'react-native'
import Constants from 'expo-constants'
import Header from '../../components/LoginUser/Header'
import FormRegister from '../../components/RegisterUser/FormRegister'

/* ➡ Componente que se encarga de renderizar el stack del formulario de registro. */
export default function RegisterUser ({ navigation }) {
  return (
    <View style={styles.registerContainer}>
      <Header txtFormType='Registrarse' />
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <FormRegister navigation={navigation} />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  registerContainer: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    backgroundColor: '#fff'
  },
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20
  }
})
