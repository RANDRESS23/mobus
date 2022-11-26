import React from 'react'
import { View } from 'react-native'
import MainToolbar from '../../components/SearchScreen/MainToolbar'
import NavigationScreens from '../../components/BusetasScreen/NavigationScreens'

/* ➡ Componente que se encarga de renderizar el stack de la lista de las busetas municipales y veredales. */
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
