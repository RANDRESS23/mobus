import React from 'react'
import { StyleSheet, View } from 'react-native'
import NavigationBusetas from '../../components/SearchBuseta/NavigationBusetas'
import ToolbarInputHeader from '../../components/SearchBuseta/ToolbarInputHeader'

export default function SearchBuseta ({ navigation }) {
  return (
    <View style={styles.searchBusetaContainer}>
      <ToolbarInputHeader navigation={navigation} />
      <NavigationBusetas />
    </View>
  )
}

const styles = StyleSheet.create({
  searchBusetaContainer: {
    flex: 1
  }
})
