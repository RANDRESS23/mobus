import React, { useState } from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import AlertSimple from '../LoginUser/AlertSimple'

/* ➡ Componente que se encarga de renderizar el apartado de paradas favoritas en una de las tres principales secciones que es la de ubicación. */
export default function ParadasFavoritas () {
  const [showAlert, setShowAlert] = useState(false)

  const handleShowAlert = () => {
    setShowAlert(prevShowAlert => !prevShowAlert)
  }

  return (
    <>
      <AlertSimple
        show={showAlert}
        title='➡ ¡PRÓXIMAMENTE! ➡'
        titleStyle={{ fontWeight: 'bold' }}
        message='¡Este apartado estará disponible próximamente!'
        cancelText='OK'
        onCancelPressed={handleShowAlert}
      />
      <ScrollView>
        <View style={styles.favoritosInfoContainer}>
          <MaterialCommunityIcons name='star' style={styles.startIcon} />
          <Text style={styles.textInfoFavoritos}>Agrega una parada a "Paradas favoritas" para tener un rápido acceso e información instantánea</Text>
          <TouchableOpacity onPress={handleShowAlert} style={styles.buttonEnseñame}>
            <Text style={styles.textButtonEnseñame}>Enséñame</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
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
    borderColor: '#7900AC'
  },
  textButtonEnseñame: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#7900AC'
  }
})
