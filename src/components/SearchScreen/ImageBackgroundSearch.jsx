import React from 'react'
import { StyleSheet, View, Image } from 'react-native'
import imgCiudad from '../../../assets/img/img_ciudad.jpg'

export default function ImageBackgroundSearch () {
  return (
    <View style={styles.searchImageContainer}>
      <Image style={styles.imgCiudadSearch} source={imgCiudad} />
    </View>
  )
}

const styles = StyleSheet.create({
  searchImageContainer: {
    zIndex: 2,
    width: '100%',
    height: 300,
    position: 'absolute',
    backgroundColor: '#000000'
  },
  imgCiudadSearch: {
    opacity: 0.6,
    width: '100%',
    height: 300
  }
})
