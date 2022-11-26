import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import BottomOptions from '../../components/BusetaInfo/BottomOptions'
import HorarioServicio from '../../components/BusetaInfo/HorarioServicio'
import MapParadasRuta from '../../components/BusetaInfo/MapParadasRuta'
import ParadasBuseta from '../../components/BusetaInfo/ParadasBuseta'
import ToolbarBusetaInfo from '../../components/BusetaInfo/ToolbarBusetaInfo'

/* ➡ Componente que se encarga de renderizar el stack de información de la buseta. */
export default function BusetaInfo ({ navigation }) {
  const [markedFocused, setMarkedFocused] = useState(1)
  const [isEnabled, setIsEnabled] = useState(false)
  const { ruta, principalColors } = navigation.getState().routes[2].params || navigation.getState().routes[3].params

  return (
    <View style={styles.busetaInfoContainer}>
      <ToolbarBusetaInfo
        ruta={ruta}
        navigation={navigation}
        hrefTo='MainViews'
        isEnabled={isEnabled}
        setIsEnabled={setIsEnabled}
        principalColors={principalColors}
      />
      <MapParadasRuta
        infoBuseta={ruta}
        markedFocused={markedFocused}
        setMarkedFocused={setMarkedFocused}
        isEnabled={isEnabled}
        principalColors={principalColors}
      />
      <HorarioServicio
        infoBuseta={ruta}
      />
      <ParadasBuseta
        infoBuseta={ruta}
        navigation={navigation}
        setMarkedFocused={setMarkedFocused}
        markedFocused={markedFocused}
        principalColors={principalColors}
      />
      <BottomOptions
        navigation={navigation}
        infoBuseta={ruta}
        markedFocused={markedFocused}
        principalColors={principalColors}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  busetaInfoContainer: {
    flex: 1
  }
})
