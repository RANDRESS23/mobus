import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'

/* ➡ Componente que se encarga de renderizar la tabBar de recientes en el stack de agregar un lugar favorito. */
export default function TabBarRecientes () {
  return (
    <View style={styles.tabBarSectionsContainer}>
      <Text style={styles.textRecientes}>Recientes</Text>
      <MaterialCommunityIcons name='dots-vertical' style={styles.dotsIcon} />
    </View>
  )
}

const styles = StyleSheet.create({
  tabBarSectionsContainer: {
    padding: 10,
    paddingHorizontal: 15,
    backgroundColor: '#F0F2F6',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  textRecientes: {
    fontSize: 15,
    fontWeight: 'bold'
  },
  dotsIcon: {
    fontSize: 20,
    color: '#000'
  }
})
