import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { View, Text, StyleSheet } from 'react-native'
import BusetasSITSA from './BusetasSITSA'
import BusetasFavoritas from './BusetasFavoritas'

const Tab = createMaterialTopTabNavigator()

export default function NavigationScreens () {
  return (
    <Tab.Navigator
      style={{}}
    >
      <Tab.Screen
        name='BusetasSITSA'
        component={BusetasSITSA}
        options={{
          title: ({ focused }) => (
            <View style={styles.labelContainer}>
              <MaterialCommunityIcons name='bus-multiple' size={15} color={focused ? '#FFFFFF' : '#b2bec3'} />
              <Text style={focused ? styles.labelTitleOn : styles.labelTitleOff}>Total Rutas</Text>
              <MaterialCommunityIcons name='bus-multiple' size={15} color={focused ? '#FFFFFF' : '#b2bec3'} />
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
        name='BusetasFavoritas'
        component={BusetasFavoritas}
        options={{
          title: ({ focused }) => (
            <View style={styles.labelContainer}>
              <MaterialCommunityIcons name='star' size={15} color={focused ? '#FFFFFF' : '#b2bec3'} />
              <Text style={focused ? styles.labelTitleOn : styles.labelTitleOff}>Rutas Favoritas</Text>
              <MaterialCommunityIcons name='star' size={15} color={focused ? '#FFFFFF' : '#b2bec3'} />
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
