import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { MaterialCommunityIcons } from '@expo/vector-icons'

// Screens
import SearchScreen from '../screens/SearchScreen'
import LocateScreen from '../screens/LocateScreen'
import BusetasScreen from '../screens/BusetasScreen'

const Tab = createBottomTabNavigator()

/* ➡ Método que se encargará de retornar las respectivas tabs principales de la aplicación. */
export default function MyTabs () {
  return (
    <Tab.Navigator
      initialRouteName='SearchScreen'
      screenOptions={{
        tabBarActiveTintColor: '#7900AC',
        tabBarStyle: { height: 55, padding: 7 }
      }}
    >
      <Tab.Screen
        name='SearchScreen'
        component={SearchScreen}
        options={{
          tabBarLabel: 'Buscar',
          tabBarLabelStyle: { fontSize: 14, paddingBottom: 5, fontWeight: 'bold' },
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name='magnify' size={size} color={color} />
          ),
          headerShown: false
        }}
      />
      <Tab.Screen
        name='LocateScreen'
        component={LocateScreen}
        options={{
          tabBarLabel: 'Ubicacion',
          tabBarLabelStyle: { fontSize: 14, paddingBottom: 5, fontWeight: 'bold' },
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name='google-maps' size={size} color={color} />
          ),
          headerShown: false
        }}
      />
      <Tab.Screen
        name='BusetasScreen'
        component={BusetasScreen}
        options={{
          tabBarLabel: 'Busetas',
          tabBarLabelStyle: { fontSize: 14, paddingBottom: 5, fontWeight: 'bold' },
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name='bus-marker' size={size} color={color} />
          ),
          headerShown: false
        }}
      />
    </Tab.Navigator>
  )
}
