import React from 'react'
import { StyleSheet, ScrollView, View, Text, Image } from 'react-native'
import ImageView from './ImageView'
import iconParada from '../../../assets/img/parada_de_autobus.png'

/* ➡ Componente que se encarga de renderizar las imagenes que muestra una vista alrededor de cada parada de las respectivas rutas que contiene la aplicación. */
export default function ImagesParada ({ nameParada, imgsParada }) {
  return (
    <ScrollView style={styles.imagesParadaContainer}>
      <View style={styles.tabBarSectionsContainer}>
        <Text style={styles.titleParada}>{`${nameParada}`}</Text>
        <Image source={iconParada} style={styles.iconParada} />
      </View>
      {
        imgsParada.map(({ url }, index) => (
          <ImageView key={index} url={url} indexImg={index} nameParada={nameParada} />
        ))
      }
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  imagesParadaContainer: {
    flex: 1,
    height: '100%'
  },
  tabBarSectionsContainer: {
    backgroundColor: '#f0f2f6',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  titleParadaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 5
  },
  titleParada: {
    padding: 10,
    paddingHorizontal: 20,
    fontSize: 15,
    fontWeight: 'bold'
  },
  iconParada: {
    marginRight: 15,
    width: 25,
    height: 25
  }
})
