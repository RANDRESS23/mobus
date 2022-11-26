import React from 'react'
import { StyleSheet, View, TextInput, TouchableOpacity } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'

/* ➡ Componente que se encarga de renderizar el input que se encuentra en la imagen de la ciudad en el stack de buscar dirección y agregar direcciones favoritas. */
export default function InputSearch ({ navigation }) {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('SearchAddress')}
      style={styles.TouchableSearchInputContainer}
    >
      <View style={styles.searchInputContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder='¿A donde quieres ir?'
          onTouchEnd={() => navigation.navigate('SearchAddress')}
        />
        <MaterialCommunityIcons name='magnify' style={styles.searchIconMagnify} />
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  TouchableSearchInputContainer: {
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 144,
    zIndex: 2
  },
  searchInputContainer: {
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'center'
  },
  searchInput: {
    fontSize: 16,
    padding: 12,
    paddingLeft: 15,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    color: '#000000'
  },
  searchIconMagnify: {
    position: 'absolute',
    right: 5,
    textAlignVertical: 'center',
    fontSize: 26,
    padding: 5,
    borderRadius: 20,
    backgroundColor: '#7900AC',
    color: '#FFFFFF'
  }
})
