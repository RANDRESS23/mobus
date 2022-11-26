import React, { useState, useEffect } from 'react'
import { StyleSheet, View, TouchableOpacity, Switch } from 'react-native'
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons'

import ItemBusetas from '../BusetasScreen/ItemBusetas'
import Constants from 'expo-constants'

/* ➡ Componente que se encarga de renderizar la toolbar en el stack de la información de cada buseta. */
export default function ToolbarBusetaInfo (
  { ruta, navigation, hrefTo, isEnabled = null, setIsEnabled = null, principalColors }) {
  const [isViewChangeTheme, setIsViewChangeTheme] = useState(false)
  const { numRuta } = ruta

  const { primaryColor, secondaryColor } = principalColors

  useEffect(() => {
    if (isEnabled !== null) setIsViewChangeTheme(true)
  }, [])

  const toggleSwitch = () => setIsEnabled(previousState => !previousState)

  return (
    <View style={styles.infoHeaderContainer}>
      <TouchableOpacity
        onPress={() => navigation.navigate(hrefTo, { ruta, principalColors })}
      >
        <MaterialCommunityIcons
          name='arrow-left'
          style={styles.iconArrowLeftHeader}
        />
      </TouchableOpacity>
      {ItemBusetas({
        nameRuta: 'SITSA',
        numRuta: primaryColor === '#7900AC' ? numRuta : null,
        principalColors
      })}
      <View style={styles.switchContainer}>
        {isViewChangeTheme
          ? (
              isEnabled
                ? (
                  <>
                    <Ionicons name='map' style={styles.iconTheme} />
                    <Ionicons name='moon' style={styles.iconTheme} />
                  </>
                  )
                : (
                  <>
                    <Ionicons name='map-outline' style={styles.iconTheme} />
                    <Ionicons name='sunny' style={styles.iconTheme} />
                  </>
                  )
            )
          : (
            <View />
            )}
        {isViewChangeTheme
          ? (
            <Switch
              trackColor={{ false: '#767577', true: '#AF69CD' }}
              thumbColor={isEnabled ? primaryColor : secondaryColor}
              ios_backgroundColor='#3e3e3e'
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
            )
          : (
            <View />
            )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  infoHeaderContainer: {
    marginTop: Constants.statusBarHeight,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 0,
    paddingHorizontal: 15
  },
  iconArrowLeftHeader: {
    fontSize: 28,
    color: '#000',
    marginRight: 25
  },
  switchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  iconTheme: {
    fontSize: 24,
    color: '#000'
  }
})
