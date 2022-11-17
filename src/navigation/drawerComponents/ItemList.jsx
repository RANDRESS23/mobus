import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

export default function ItemList ({ toNavigation, iconItem, textItem, navigation }) {
  return (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => navigation.navigate(toNavigation)}
    >
      <Ionicons name={iconItem} style={styles.iconListItem} />
      <Text style={styles.itemList}>{textItem}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 20
  },
  iconListItem: {
    fontSize: 24,
    color: '#ccc'
  },
  itemList: {
    fontSize: 16,
    color: '#fff',
    marginLeft: 15
  }
})
