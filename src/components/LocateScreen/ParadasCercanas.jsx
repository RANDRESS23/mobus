import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Feather } from '@expo/vector-icons'

export default function ParadasCercanas () {
  return (
    <View style={styles.infoSearchContainer}>
      <Feather name='move' style={styles.iconMove} />
      <Text style={styles.textInfo}>Mueve el mapa para ver las paradas a tu alrededor</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  infoSearchContainer: {
    alignSelf: 'center',
    marginTop: 20
  },
  iconMove: {
    fontSize: 70,
    color: '#000',
    opacity: 0.2,
    textAlign: 'center'
  },
  textInfo: {
    fontSize: 15,
    color: '#000',
    opacity: 0.7,
    textAlign: 'center',
    marginTop: 5
  }
})
