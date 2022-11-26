import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import MapView from 'react-native-maps'

/* ➡ Componente que se encarga de renderizar el mapa de una de las tres principales secciones que es la de ubicación, que esta tendrá sus funcionalidades completas próximamente. */
export default function MapLocateUser () {
  const [origin, setOrigin] = useState({ // eslint-disable-line
    latitude: 4.462328,
    longitude: -75.202384
  })

  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: origin.latitude,
        longitude: origin.longitude,
        latitudeDelta: 0.09,
        longitudeDelta: 0.04
      }}
    />
  )
}

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '40%'
  }
})
