import React from 'react'
import { View } from 'react-native'
import MainToolbar from '../../components/SearchScreen/MainToolbar'
import NavigationScreens from '../../components/BusetasScreen/NavigationScreens'

export default function BusetasScreen ({ navigation }) {
  return (
    <View style={{ flex: 1 }}>
      <MainToolbar
        navigation={navigation}
        isFirstToolbar={false}
        placeholderInput='Buscar una ruta'
        navigationTo='SearchBuseta'
      />
      <NavigationScreens />
    </View>
  )
}
