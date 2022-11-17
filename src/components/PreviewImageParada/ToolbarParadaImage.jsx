import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import ItemBusetas from '../BusetasScreen/ItemBusetas'
import Constants from 'expo-constants'

export default function ToolbarParadaImage (
  { infoBuseta, navigation, hrefTo, principalColors }) {
  const { primaryColor } = principalColors
  const { numRuta } = infoBuseta

  return (
    <View style={styles.infoHeaderContainer}>
      <TouchableOpacity
        onPress={() => navigation.navigate(hrefTo, { ruta: infoBuseta, principalColors })}
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
  }
})
