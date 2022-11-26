import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

/* ➡ Componente que se encarga de renderizar la tabBar de las secciones que se encuentran en el stack de buscar dirección y agregar direcciones favoritas. */
export default function TabBarSection ({ navigation }) {
  return (
    <View style={styles.tabBarSectionsContainer}>
      <Text style={styles.textFavoritos}>Favoritos</Text>
      <Text
        style={styles.textAgregar}
        onPress={() => navigation.navigate('AddNewFavoritePlace')}
      >
        Agregar
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  tabBarSectionsContainer: {
    marginTop: 17,
    padding: 10,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: '#F0F2F6',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  textFavoritos: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  textAgregar: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#227DC4'
  }
})
