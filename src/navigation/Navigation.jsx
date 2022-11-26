import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import MyStack from './MyStack'

/* ➡ Componente principal de la navegación de la aplicación. */
export default function Navigation () {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  )
}
