import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'

export default function Place ({ nameAddress, county, region }) {
  return (
    <View style={styles.placeContainer}>
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons name='google-maps' style={styles.placeIcon} />
      </View>
      <View style={styles.mainInfoContainer}>
        <View style={styles.nameAddressContainer}>
          <Text style={styles.nameAddressStyled}>{nameAddress}</Text>
        </View>
        <View style={styles.infoPlaceContainer}>
          <Text style={styles.txtInfo}>{county}</Text>
          <MaterialCommunityIcons name='star-three-points' style={styles.starIcon} />
          <Text style={styles.txtInfo}>{region}</Text>
        </View>
      </View>
      <MaterialCommunityIcons name='arrow-top-left' style={styles.arrowTopLeftIcon} />
    </View>
  )
}

const styles = StyleSheet.create({
  placeContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 10,
    borderBottomWidth: 0.3,
    borderBottomColor: '#dcdde1'
  },
  iconContainer: {
    paddingHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  placeIcon: {
    fontSize: 27,
    color: '#000'
  },
  mainInfoContainer: {
    paddingLeft: 10
  },
  nameAddressContainer: {
    paddingRight: 10
  },
  nameAddressStyled: {
    fontWeight: 'bold',
    fontSize: 15
  },
  infoPlaceContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  txtInfo: {
    fontSize: 13
  },
  starIcon: {
    fontSize: 13,
    color: '#000',
    paddingHorizontal: 5
  },
  arrowTopLeftIcon: {
    flex: 1,
    paddingRight: 10,
    textAlign: 'right',
    textAlignVertical: 'center',
    fontSize: 26,
    color: '#000'
  }
})
