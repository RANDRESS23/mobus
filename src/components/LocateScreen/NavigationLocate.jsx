import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import ParadasCercanas from './ParadasCercanas'
import ParadasFavoritas from './ParadasFavoritas'

const Tab = createMaterialTopTabNavigator()

/* ➡ Componente que se encarga de administar la navegación entre el apartado de "paradas cercanas" y el apartado "paradas favoritas" de la sección de ubicación. */
export default function NavigationLocate () {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name='ParadasCercanas'
        component={ParadasCercanas}
        options={{
          title: ({ focused }) => (
            <View style={styles.labelContainer}>
              <MaterialCommunityIcons name='bus-stop-covered' size={15} color={focused ? '#FFFFFF' : '#b2bec3'} />
              <Text style={focused ? styles.labelTitleOn : styles.labelTitleOff}>Paradas Cercanas</Text>
              <MaterialCommunityIcons name='bus-stop-covered' size={15} color={focused ? '#FFFFFF' : '#b2bec3'} />
            </View>
          ),
          tabBarIndicatorStyle: {
            backgroundColor: '#7900AC',
            height: 3.5
          },
          tabBarStyle: {
            backgroundColor: '#292A2F'
          }
        }}
      />
      <Tab.Screen
        name='ParadasFavoritas'
        component={ParadasFavoritas}
        options={{
          title: ({ focused }) => (
            <View style={styles.labelContainer}>
              <MaterialIcons name='favorite' size={15} color={focused ? '#FFFFFF' : '#b2bec3'} />
              <Text style={focused ? styles.labelTitleOn : styles.labelTitleOff}>Paradas Favoritas</Text>
              <MaterialIcons name='favorite' size={15} color={focused ? '#FFFFFF' : '#b2bec3'} />
            </View>
          ),
          tabBarIndicatorStyle: {
            backgroundColor: '#7900AC',
            height: 3.5
          },
          tabBarStyle: {
            backgroundColor: '#292A2F'
          }
        }}
      />
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  labelTitleOn: {
    paddingHorizontal: 5,
    color: '#fff',
    fontWeight: 'bold'
  },
  labelTitleOff: {
    paddingHorizontal: 5,
    color: '#B2BEC3'
  }
})
