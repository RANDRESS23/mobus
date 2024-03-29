import React from 'react'
import { StyleSheet, View } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'

/* ➡ Componente que se encarga de renderizar la linea de separación entre el botón de inciar sesión y el botón que redirije al formulario de registro. */
export default function LineSeparator () {
  return (
    <View style={styles.lineContainer}>
      <View style={styles.lineSeparator} />
      <MaterialCommunityIcons name='circle-medium' style={styles.pointIcon} />
    </View>
  )
}

const styles = StyleSheet.create({
  lineContainer: {
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15
  },
  lineSeparator: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#7900ac'
  },
  pointIcon: {
    position: 'absolute',
    left: '45%',
    fontSize: 30,
    color: '#7900ac'
  }
})
