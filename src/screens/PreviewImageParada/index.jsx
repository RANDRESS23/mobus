import { StyleSheet, View } from 'react-native'
import ImagesParada from '../../components/PreviewImageParada/ImagesParada'
import ToolbarParadaImage from '../../components/PreviewImageParada/ToolbarParadaImage'

export default function PreviewImageParada ({ navigation }) {
  let { infoBuseta, imgsParada, nameParada, principalColors } = navigation.getState().routes[3].params

  if (infoBuseta === undefined || imgsParada === undefined || principalColors === undefined) {
    infoBuseta = navigation.getState().routes[4].params.infoBuseta
    imgsParada = navigation.getState().routes[4].params.imgsParada
    nameParada = navigation.getState().routes[4].params.nameParada
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
      <ImagesParada nameParada={nameParada} imgsParada={imgsParada} />
    </View>
  )
}

const styles = StyleSheet.create({
  imagePreviewContainer: {
    flex: 1
  }
})
