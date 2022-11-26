import React from 'react'
import { StyleSheet, ScrollView, Text, View, TouchableOpacity } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'

/* ➡ Componente que se encarga de renderizar el mensaje y el botón que le enseñará al usuario como agregar una ruta que seleccione al apartado de "rutas favoritas". */
export default function LearnAddNewRutaFav ({ handleShowAlert }) {
  return (
    <ScrollView>
      <View style={styles.favoritosInfoContainer}>
        <MaterialCommunityIcons name='star' style={styles.startIcon} />
        <Text style={styles.textInfoFavoritos}>Agrega una ruta a "Rutas favoritas" para obtener un rápido acceso e información instantánea</Text>
        <TouchableOpacity
          style={styles.buttonEnseñame}
          onPress={handleShowAlert}
        >
          <Text style={styles.textButtonEnseñame}>Enséñame</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  favoritosInfoContainer: {
    marginTop: 15,
    alignItems: 'center'
  },
  startIcon: {
    fontSize: 70,
    color: '#000',
    opacity: 0.3
  },
  textInfoFavoritos: {
    marginTop: 5,
    paddingHorizontal: 30,
    fontSize: 15,
    textAlign: 'center',
    color: '#000',
    opacity: 0.7
  },
  buttonEnseñame: {
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#7900ac'
  },
  textButtonEnseñame: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#7900ac'
  }
})
