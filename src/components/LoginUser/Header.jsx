import React from 'react'
import { StyleSheet, View, Text, ImageBackground, Image } from 'react-native'
import logoMobus from '../../../assets/img/logoMobus.png'
import { Ionicons } from '@expo/vector-icons'

export default function Header ({ txtFormType }) {
  return (
    <ImageBackground
      source={require('../../../assets/img/drawerBg.jpeg')}
      style={styles.logoContainer}
    >
      <Image source={logoMobus} style={styles.logoMobus} />
      <View>
        <Text style={styles.txtMoBus}>MoBus</Text>
        <View style={styles.subtitleContainer}>
          <Text style={styles.txtForm}>{txtFormType}</Text>
          <Ionicons name='download-outline' style={styles.iconHeader} />
        </View>
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  logoContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#7900ac',
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,

    elevation: 24
  },
  logoMobus: {
    width: 130,
    height: 130
  },
  txtMoBus: {
    color: '#fff',
    fontSize: 55,
    fontWeight: 'bold',
    marginLeft: 10
  },
  subtitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: -10,
    marginLeft: 10
  },
  txtForm: {
    color: '#fff',
    fontSize: 25,
    fontWeight: 'bold'
  },
  iconHeader: {
    fontSize: 24,
    color: '#fff',
    marginLeft: 5
  }
})
