import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'

/* ➡ Componente que se encarga de renderizar el botón que realizará la función de reiniciar el historial de las busetas en las que ha inspeccionado el usuario. */
export default function ResetHistory ({ setRutasRecents, setRutaSelected, setIsViewResetHistory }) {
  return (
    <View style={styles.buttonResetHistoryContainer}>
      <TouchableOpacity
        style={styles.buttonResetHistory}
        onPress={() => {
          setRutasRecents([])
          setRutaSelected({})
          setIsViewResetHistory(false)
        }}
      >
        <Text style={styles.txtResetHistory}>Borrar Historial</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  buttonResetHistoryContainer: {
    position: 'absolute',
    right: 0,
    top: 40
  },
  buttonResetHistory: {
    backgroundColor: '#fff',
    padding: 20,
    paddingRight: 50,
    borderWidth: 1,
    borderColor: '#DCDDE1',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    zIndex: 8,
    elevation: 8
  },
  txtResetHistory: {
    fontSize: 15,
    color: '#000',
    fontWeight: 'bold'
  }
})
