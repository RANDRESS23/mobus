import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'

export default function ItemBusetas ({ nameRuta, numRuta, principalColors }) {
  return (
    <View style={styles.rutaInfoContainer}>
      <View style={{ ...styles.cardIconBusContainer, borderBottomColor: principalColors.primaryColor }}>
        <MaterialCommunityIcons name='bus' style={styles.busIcon} />
        {
          numRuta !== null
            ? <Text style={styles.textCardIcon}>{numRuta}</Text>
            : <View />
        }
      </View>
      <Text style={styles.textNameRuta}>{nameRuta}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  rutaInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderBottomWidth: 0.3,
    borderTopWidth: 0.3,
    borderBottomColor: '#dcdde1',
    borderTopColor: '#dcdde1'
  },
  cardIconBusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 3,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#dcdde1',
    borderBottomWidth: 3
  },
  busIcon: {
    fontSize: 20,
    color: '#000'
  },
  textCardIcon: {
    marginLeft: 3,
    fontSize: 14,
    fontWeight: 'bold'
  },
  textNameRuta: {
    marginLeft: 10,
    fontSize: 14,
    color: '#000'
  }
})
