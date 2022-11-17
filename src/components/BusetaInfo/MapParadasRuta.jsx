import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet } from 'react-native'
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps'
import imgParadaBus from '../../../assets/img/parada_de_autobus.png'

export default function MapParadasRuta (
  { infoBuseta, markedFocused, setMarkedFocused, isEnabled, principalColors }) {
  const { paradasRuta, polylineCoordinates } = infoBuseta

  const [origin, setOrigin] = useState({
    latitude: paradasRuta[0].coordinates.latitude,
    longitude: paradasRuta[0].coordinates.longitude
  })
  const [arr, setArr] = useState([ // eslint-disable-line
    { latitude: 4.376195, longitude: -75.351358 },
    { latitude: 4.379147, longitude: -75.350318 },
    { latitude: 4.380341, longitude: -75.343685 },
    { latitude: 4.381597, longitude: -75.336594 },
    { latitude: 4.381735, longitude: -75.332609 },
    { latitude: 4.381918, longitude: -75.328382 },
    { latitude: 4.386585, longitude: -75.324934 },
    { latitude: 4.387824, longitude: -75.321295 },
    { latitude: 4.390918, longitude: -75.315376 },
    { latitude: 4.395107, longitude: -75.307204 },
    { latitude: 4.397965, longitude: -75.298375 },
    { latitude: 4.400156, longitude: -75.296332 },
    { latitude: 4.400343, longitude: -75.291238 },
    { latitude: 4.403489, longitude: -75.281949 },
    { latitude: 4.405566, longitude: -75.279425 },
    { latitude: 4.408263, longitude: -75.276176 },
    { latitude: 4.410883, longitude: -75.270928 },
    { latitude: 4.413464, longitude: -75.265053 },
    { latitude: 4.415278, longitude: -75.262622 },
    { latitude: 4.419808, longitude: -75.255956 },
    { latitude: 4.422236, longitude: -75.254011 },
    { latitude: 4.424809, longitude: -75.251680 },
    { latitude: 4.426809, longitude: -75.249025 },
    { latitude: 4.429376, longitude: -75.246113 },
    { latitude: 4.431940, longitude: -75.243959 },
    { latitude: 4.432893, longitude: -75.243420 },
    { latitude: 4.435595, longitude: -75.242806 },
    { latitude: 4.437289, longitude: -75.242577 },
    { latitude: 4.440296, longitude: -75.242933 },
    { latitude: 4.439531, longitude: -75.241920 },
    { latitude: 4.439146, longitude: -75.241062 },
    { latitude: 4.438490, longitude: -75.239760 },
    { latitude: 4.437237, longitude: -75.237875 },
    { latitude: 4.436297, longitude: -75.237445 },
    { latitude: 4.436083, longitude: -75.236248 },
    { latitude: 4.436487, longitude: -75.235836 },
    { latitude: 4.437029, longitude: -75.235781 },
    { latitude: 4.437854, longitude: -75.236982 },
    { latitude: 4.439553, longitude: -75.238453 }
  ])

  const mapRef = useRef(null)

  useEffect(() => {
    paradasRuta.forEach(({ numParada, coordinates }) => {
      if (numParada === markedFocused) {
        setOrigin({
          latitude: coordinates.latitude,
          longitude: coordinates.longitude
        })

        mapRef.current.animateToRegion({
          latitude: coordinates.latitude,
          longitude: coordinates.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.02
        }, 1000)
      }
    })
  }, [markedFocused])

  const mapDarkStyle = [
    {
      elementType: 'geometry',
      stylers: [
        {
          color: '#212121'
        }
      ]
    },
    {
      elementType: 'labels.icon',
      stylers: [
        {
          visibility: 'on'
        }
      ]
    },
    {
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#757575'
        }
      ]
    },
    {
      elementType: 'labels.text.stroke',
      stylers: [
        {
          color: '#212121'
        }
      ]
    },
    {
      featureType: 'administrative',
      elementType: 'geometry',
      stylers: [
        {
          color: '#757575'
        }
      ]
    },
    {
      featureType: 'administrative.country',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#9e9e9e'
        }
      ]
    },
    {
      featureType: 'administrative.land_parcel',
      stylers: [
        {
          visibility: 'off'
        }
      ]
    },
    {
      featureType: 'administrative.locality',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#bdbdbd'
        }
      ]
    },
    {
      featureType: 'poi',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#757575'
        }
      ]
    },
    {
      featureType: 'poi.park',
      elementType: 'geometry',
      stylers: [
        {
          color: '#181818'
        }
      ]
    },
    {
      featureType: 'poi.park',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#616161'
        }
      ]
    },
    {
      featureType: 'poi.park',
      elementType: 'labels.text.stroke',
      stylers: [
        {
          color: '#1b1b1b'
        }
      ]
    },
    {
      featureType: 'road',
      elementType: 'geometry.fill',
      stylers: [
        {
          color: '#2c2c2c'
        }
      ]
    },
    {
      featureType: 'road',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#8a8a8a'
        }
      ]
    },
    {
      featureType: 'road.arterial',
      elementType: 'geometry',
      stylers: [
        {
          color: '#373737'
        }
      ]
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry',
      stylers: [
        {
          color: '#3c3c3c'
        }
      ]
    },
    {
      featureType: 'road.highway.controlled_access',
      elementType: 'geometry',
      stylers: [
        {
          color: '#4e4e4e'
        }
      ]
    },
    {
      featureType: 'road.local',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#616161'
        }
      ]
    },
    {
      featureType: 'transit',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#757575'
        }
      ]
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [
        {
          color: '#000000'
        }
      ]
    },
    {
      featureType: 'water',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#3d3d3d'
        }
      ]
    }
  ]

  const mapStandardStyle = [
    {
      elementType: 'labels.icon',
      stylers: [
        {
          visibility: 'on'
        }
      ]
    }
  ]

  return (
    <MapView
      provider={PROVIDER_GOOGLE}
      ref={mapRef}
      style={styles.map}
      customMapStyle={isEnabled ? mapDarkStyle : mapStandardStyle}
      initialRegion={{
        latitude: origin.latitude,
        longitude: origin.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.02
      }}
    >
      {
        paradasRuta.map((parada, index) => (
          <Marker
            key={parada.numParada}
            coordinate={{
              latitude: parada.coordinates.latitude,
              longitude: parada.coordinates.longitude
            }}
            image={imgParadaBus}
            style={index + 1 === Number(markedFocused) ? styles.markerFocused : styles.markerOpacity}
            onPress={() => setMarkedFocused(parada.numParada)}
          />
        ))
        // arr.map((parada, index) => (
        //   <Marker
        //     key={index}
        //     coordinate={{
        //       "latitude": parada.latitude,
        //       "longitude": parada.longitude
        //     }}
        //     image={imgParadaBus}
        //     style={index + 1 == markedFocused ? styles.markerFocused : styles.markerOpacity}
        //     onPress={() => setMarkedFocused(parada.numParada)}
        //   />
        // ))
      }
      <Polyline
        coordinates={polylineCoordinates}
        strokeWidth={4}
        strokeColor={principalColors.primaryColor}
      />
    </MapView>
  )
}

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '35%'
  },
  markerOpacity: {
    opacity: 0.2
  },
  markerFocused: {
    opacity: 1
  }
})
