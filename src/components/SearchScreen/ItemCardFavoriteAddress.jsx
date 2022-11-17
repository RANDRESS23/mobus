import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'

export default function ItemCardFavoriteAddress ({ nameIcon, nameAddress }) {
  return (
    <View style={styles.itemCardContainer}>
      <View style={styles.itemInfoContainer}>
        <MaterialCommunityIcons name={nameIcon} style={styles.imgIconCard} />
        <View style={styles.textsContainer}>
          <Text style={styles.textNameAddress}>{nameAddress}</Text>
          <Text style={styles.textEditar}>Pulsa para editar</Text>
        </View>
      </View>
      <MaterialCommunityIcons name='chevron-right' style={styles.imgIconCard} />
    </View>
  )
}

const styles = StyleSheet.create({
  itemCardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: '#FFFFFF'
  },
  itemInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  imgIconCard: {
    fontSize: 30,
    color: '#000000'
  },
  textsContainer: {
    paddingLeft: 15
  },
  textNameAddress: {
    fontWeight: 'bold',
    fontSize: 16
  },
  textEditar: {
    fontSize: 13
  }
})
