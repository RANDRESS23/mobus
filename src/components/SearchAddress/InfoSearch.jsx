import React from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import Place from '../AddNewFavoritePlace/Place'

/* ➡ Componente que se encarga de renderizar el mensaje y las coincidencias de los lugares que el usuario va digitando en el apartado de buscar dirección. */
export default function InfoSearch ({ valueInput, places }) {
  return (
    <>
      {
        valueInput === ''
          ? (
            <View style={styles.infoSearchContainer}>
              <MaterialCommunityIcons name='magnify' style={styles.iconMagnify} />
              <Text style={styles.textInfo}>Intenta buscar una Dirección, Parada o Destino</Text>
            </View>
            )
          : (
            <View style={styles.infoSearchContainerPlaces}>
              <View style={styles.tabBarSectionsContainer}>
                <Text style={styles.textSection}>Lugares</Text>
                <MaterialCommunityIcons name='map-search' style={styles.mapIcon} />
              </View>
              <ScrollView style={styles.placesContainer}>
                {
                  places.map((place) => {
                    const {
                      autocomplete_id: autocompleteId,
                      display_address: displayAddress,
                      county,
                      region
                    } = place

                    return (
                      <Place
                        key={autocompleteId}
                        nameAddress={displayAddress}
                        county={county}
                        region={region}
                      />
                    )
                  })
                }
              </ScrollView>
            </View>
            )
      }
    </>
  )
}

const styles = StyleSheet.create({
  infoSearchContainer: {
    paddingTop: 15,
    alignSelf: 'center'
  },
  iconMagnify: {
    fontSize: 80,
    color: '#000',
    opacity: 0.2,
    textAlign: 'center'
  },
  textInfo: {
    fontSize: 15,
    color: '#000',
    opacity: 0.3,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  infoSearchContainerPlaces: {
    flex: 1
  },
  tabBarSectionsContainer: {
    padding: 10,
    backgroundColor: '#f0f2f6',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  textSection: {
    paddingLeft: 10,
    fontSize: 15,
    fontWeight: 'bold'
  },
  mapIcon: {
    paddingRight: 10,
    fontSize: 22,
    color: '#000'
  },
  placesContainer: {
    flex: 1
  },
  starIcon: {
    fontSize: 13,
    color: '#000',
    paddingHorizontal: 5
  }
})
