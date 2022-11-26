import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import MyDrawer from './MyDrawer'

// Screens
import SearchAddress from '../screens/SearchAddress'
import AddNewFavoritePlace from '../screens/AddNewFavoritePlace'
import SearchBuseta from '../screens/SearchBuseta'
import BusetaInfo from '../screens/BusetaInfo'
import HorarioCompleto from '../screens/HorarioCompleto'
import Settings from './drawerComponents/screens/Settings'
import PreviewImageParada from '../screens/PreviewImageParada'
import LoginUser from '../screens/LoginUser'
import RegisterUser from '../screens/RegisterUser'

const Stack = createStackNavigator()

/* ➡ Método que se encargará de retornar todas las pantallas (stacks) que tiene la aplicación. */
export default function MyStack () {
  return (
    <Stack.Navigator
      initialRouteName='LoginUser'
    >
      <Stack.Screen
        name='LoginUser'
        component={LoginUser}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name='RegisterUser'
        component={RegisterUser}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name='MainViews'
        component={MyDrawer}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name='SearchAddress'
        component={SearchAddress}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name='AddNewFavoritePlace'
        component={AddNewFavoritePlace}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name='SearchBuseta'
        component={SearchBuseta}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name='BusetaInfo'
        component={BusetaInfo}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name='HorarioCompleto'
        component={HorarioCompleto}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name='Settings'
        component={Settings}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name='PreviewImageParada'
        component={PreviewImageParada}
        options={{
          headerShown: false
        }}
      />
    </Stack.Navigator>
  )
}
