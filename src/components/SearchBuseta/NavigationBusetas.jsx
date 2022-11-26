import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { View, Text, StyleSheet } from 'react-native'
import BusetasSITSA from '../BusetasScreen/BusetasSITSA'
import BusetasFavoritas from '../BusetasScreen/BusetasFavoritas'

const Tab = createMaterialTopTabNavigator()

/* ➡ Componente que se encarga de administrar la navegación entra el apartado de busetas municipales y el apartado de busetas veredales en el stack de buscar buseta. */
export default function NavigationBusetas () {
  return (
    <Tab.Navigator
      style={{
        backgroundColor: '#fff'
      }}
    >
      <Tab.Screen
        name='RutasTotales'
        component={BusetasSITSA}
        options={{
          title: ({ focused }) => (
            <View style={styles.labelContainer}>
              <Text style={focused ? styles.labelTitleOn : styles.labelTitleOff}>Todas</Text>
            </View>
          ),
          tabBarIndicatorStyle: {
            backgroundColor: '#7900ac',
            height: 3
          },
          tabBarStyle: {
            backgroundColor: '#fff',
            width: 180,
            shadowColor: 'transparent'
          }
        }}
      />
      <Tab.Screen
        name='RutasFavoritas'
        component={BusetasFavoritas}
        options={{
          title: ({ focused }) => (
            <View style={styles.labelContainer}>
              <Text style={focused ? styles.labelTitleOn : styles.labelTitleOff}>Favoritas</Text>
            </View>
          ),
          tabBarIndicatorStyle: {
            backgroundColor: '#7900ac',
            height: 3
          },
          tabBarStyle: {
            backgroundColor: '#fff',
            width: 180,
            shadowColor: 'transparent'
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
    color: '#000000'
  },
  labelTitleOff: {
    paddingHorizontal: 5,
    color: '#000000',
    opacity: 0.4
  }
})
