import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'

/* ➡ Componente que se encarga de renderizar el header del apartado del horario completo de cada ruta. */
export default function HeaderSectionHorarioCompleto ({ nameParada }) {
  return (
    <View style={styles.nameParadaContainer}>
      <MaterialCommunityIcons name='clock' style={styles.iconClock} />
      <View>
        <Text style={styles.txtNameParadaSection}>Horario Completo Parada:</Text>
        <Text style={styles.txtNameParadaSection}>{nameParada}</Text>
      </View>
      <MaterialCommunityIcons name='clock' style={styles.iconClock} />
    </View>
  )
}

const styles = StyleSheet.create({
  nameParadaContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#292A2F',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  txtNameParadaSection: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF'
  },
  iconClock: {
    fontSize: 35,
    color: '#FFFFFF'
  }
})
