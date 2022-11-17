import { StyleSheet, View, Image } from 'react-native'
import ToolbarParadaImage from '../../components/PreviewImageParada/ToolbarParadaImage'
import prueba from '../../../assets/img/prueba.png'

export default function PreviewImageParada ({ navigation }) {
  let { infoBuseta, coordinatesParada, principalColors } = navigation.getState().routes[3].params

  if (infoBuseta === undefined || coordinatesParada === undefined || principalColors === undefined) {
    infoBuseta = navigation.getState().routes[4].params.infoBuseta
    coordinatesParada = navigation.getState().routes[4].params.coordinatesParada
    principalColors = navigation.getState().routes[4].params.principalColors
  }

  return (
    <View style={styles.imagePreviewContainer}>
      <ToolbarParadaImage
        infoBuseta={infoBuseta}
        navigation={navigation}
        hrefTo='BusetaInfo'
        principalColors={principalColors}
      />
      {/* <Image
        source={prueba} style={{
          flex: 1,
          width: null,
          height: null,
          resizeMode: 'contain'
        }}
      /> */}
    </View>
  )
}

const styles = StyleSheet.create({
  imagePreviewContainer: {
    flex: 1
  },
  streetView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }
})
