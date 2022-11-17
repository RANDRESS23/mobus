import React from 'react'
import { StyleSheet, ScrollView, View } from 'react-native'
import Constants from 'expo-constants'
import Header from '../../components/LoginUser/Header'
import FormLogin from '../../components/LoginUser/FormLogin'
import LineSeparator from '../../components/LoginUser/LineSeparator'
import ButtonsLogin from '../../components/LoginUser/ButtonsLogin'

export default function LoginUser ({ navigation }) {
  return (
    <View style={styles.loginContainer}>
      <Header txtFormType='Acceder' />
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <FormLogin navigation={navigation} />
        <LineSeparator />
        <ButtonsLogin isLoginButton={false} navigation={navigation} />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    backgroundColor: '#fff'
  },
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 40
  }
})
