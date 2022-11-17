import React from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { MaterialCommunityIcons } from '@expo/vector-icons'

export default function ParadasFavoritas () {
  return (
    <ScrollView>
      <View style={styles.favoritosInfoContainer}>
        <MaterialCommunityIcons name='star' style={styles.startIcon} />
        <Text style={styles.textInfoFavoritos}>Agrega una parada a "Paradas favoritas" para tener un rápido acceso e información instantánea</Text>
        <TouchableOpacity
          onPress={() => console.log('xd')}
          style={styles.buttonEnseñame}
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
    borderColor: '#7900AC'
  },
  textButtonEnseñame: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#7900AC'
  }
})
