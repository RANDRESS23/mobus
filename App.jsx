import React from 'react'
import Navigation from './src/navigation/Navigation'
import { StatusBar } from 'expo-status-bar'
import { Provider } from 'react-redux'
import { store } from './src/redux/Store'

export default function App () {
  return (
    <Provider store={store}>
      <StatusBar style='light' backgroundColor='#292A2F' />
      <Navigation />
    </Provider>
  )
}
