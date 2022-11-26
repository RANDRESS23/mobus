import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Image, Linking } from 'react-native'
import AwesomeAlert from 'react-native-awesome-alerts'
import { MaterialCommunityIcons } from '@expo/vector-icons'

/* ➡ Componente que se encarga de renderizar la imagen de cada parada de su respectiva ruta. */
export default function ImageView ({ url, indexImg, nameParada }) {
  const [showAlert, setShowAlert] = useState(false)

  const handlePreviewBestImage = () => {
    setShowAlert(prevShowAlert => !prevShowAlert)
  }

  return (
    <>
      <AwesomeAlert
        show={showAlert}
        showProgress={false}
        title='🤔 ¡VISUALIZAR MEJOR LA IMAGEN! 🤔'
        titleStyle={{ fontWeight: 'bold' }}
        message='¿Deseas visualizar mucho mejor la imagen que seleccionaste?, serás redirigido a una pagina web con la previsualización de la imagen.'
        closeOnTouchOutside={false}
        closeOnHardwareBackPress={false}
        showCancelButton
        showConfirmButton
        cancelText='CANCELAR'
        confirmText='CONFIRMAR'
        cancelButtonColor='#8395a7'
        cancelButtonTextStyle={{ fontWeight: 'bold' }}
        confirmButtonColor='#7900ac'
        confirmButtonTextStyle={{ fontWeight: 'bold' }}
        onCancelPressed={handlePreviewBestImage}
        onConfirmPressed={async () => {
          handlePreviewBestImage()
          await Linking.openURL(url)
        }}
      />
      <View style={styles.imageContainer}>
        <Text style={styles.txtTitleImage}>{`Imagen N°${indexImg + 1} de la parada "${nameParada}"`}</Text>
        <TouchableOpacity
          onPress={handlePreviewBestImage}
          style={{ width: '100%' }}
        >
          <Image source={{ uri: url }} style={styles.imgParada} />
        </TouchableOpacity>
        <View style={styles.lineContainer}>
          <View style={styles.lineSeparator} />
          <MaterialCommunityIcons name='circle-medium' style={styles.pointIcon} />
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff'
  },
  txtTitleImage: {
    fontSize: 15
  },
  imgParada: {
    width: '100%',
    height: 180,
    resizeMode: 'contain'
  },
  lineContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15
  },
  lineSeparator: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#7900ac'
  },
  pointIcon: {
    position: 'absolute',
    left: '45%',
    fontSize: 30,
    color: '#7900ac'
  }
})
