import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import MapView, { Marker, Polyline } from 'react-native-maps' // eslint-disable-line

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
