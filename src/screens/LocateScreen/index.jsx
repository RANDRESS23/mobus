import React from 'react'
import { StyleSheet, View } from 'react-native'
import MainToolbar from '../../components/SearchScreen/MainToolbar'
import MapLocateUser from '../../components/LocateScreen/MapLocateUser'
import NavigationLocate from '../../components/LocateScreen/NavigationLocate'

export default function LocateScreen ({ navigation }) {
  return (
    <View style={styles.locateScreenContainer}>
      <MainToolbar
        navigation={navigation}
        isFirstToolbar={false}
        placeholderInput='¿A donde quieres ir?'
        navigationTo='SearchAddress'
      />
      <MapLocateUser />
      <NavigationLocate />
    </View>
  )
}

const styles = StyleSheet.create({
  locateScreenContainer: {
    flex: 1
  }
})
