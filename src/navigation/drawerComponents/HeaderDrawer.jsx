import React from 'react'
import { StyleSheet, Text, View, ImageBackground, Image } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import UseUserLoggedIn from '../../hooks/UseUserLoggedIn'

/* ➡ Método que se encargará de retornar la cabecera del drawer de la aplicación. */
export default function HeaderDrawer () {
  const { userLoggedIn } = UseUserLoggedIn()

  return (
    <ImageBackground
      source={require('../../../assets/img/drawerBg.jpeg')}
      style={styles.imageLogoMobusContainer}
    >
      <View style={styles.logoAndNameMoBusContainer}>
        <Text style={styles.txtMoBus}>MoBus</Text>
        <Image
          source={require('../../../assets/img/logoMobus.png')}
          style={styles.imageLogoMobus}
        />
      </View>
      <View style={styles.infoUserContainer}>
        <FontAwesome name='user' style={styles.iconUser} />
        <Text style={styles.txtInfoUser}>
          Bienvenid@ <Text style={{ fontWeight: 'bold' }}>'{userLoggedIn.username}'</Text>
        </Text>
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  imageLogoMobusContainer: {
    padding: 20
  },
  logoAndNameMoBusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5
  },
  txtMoBus: {
    color: '#fff',
    fontSize: 45,
    fontWeight: 'bold'
  },
  imageLogoMobus: {
    height: 100,
    width: 100
  },
  infoUserContainer: {
    flexDirection: 'row'
  },
  iconUser: {
    fontSize: 24,
    color: '#fff',
    marginRight: 10
  },
  txtInfoUser: {
    color: '#fff',
    fontSize: 18
  }
})
