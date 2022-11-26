import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import AlertSimple from '../LoginUser/AlertSimple'

/* ➡ Componente que se encarga de renderizar cada lugar favorito que valla agregando el usuario en la busqueda en el stack de buscar dirección y agregar direcciones favoritas. */
export default function ItemCardFavoriteAddress ({ nameIcon, nameAddress }) {
  const [showAlert, setShowAlert] = useState(false)

  const handleShowAlert = () => {
    setShowAlert(prevShowAlert => !prevShowAlert)
  }

  return (
    <>
      <AlertSimple
        show={showAlert}
        title='➡ ¡PRÓXIMAMENTE! ➡'
        titleStyle={{ fontWeight: 'bold' }}
        message='¡Este apartado estará disponible próximamente!'
        cancelText='OK'
        onCancelPressed={handleShowAlert}
      />
      <TouchableOpacity onPress={handleShowAlert}>
        <View style={styles.itemCardContainer}>
          <View style={styles.itemInfoContainer}>
            <MaterialCommunityIcons name={nameIcon} style={styles.imgIconCard} />
            <View style={styles.textsContainer}>
              <Text style={styles.textNameAddress}>{nameAddress}</Text>
              <Text style={styles.textEditar}>Pulsa para editar</Text>
            </View>
          </View>
          <MaterialCommunityIcons name='chevron-right' style={styles.imgIconCard} />
        </View>
      </TouchableOpacity>
    </>
  )
}

const styles = StyleSheet.create({
  itemCardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: '#FFFFFF'
  },
  itemInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  imgIconCard: {
    fontSize: 30,
    color: '#000000'
  },
  textsContainer: {
    paddingLeft: 15
  },
  textNameAddress: {
    fontWeight: 'bold',
    fontSize: 16
  },
  textEditar: {
    fontSize: 13
  }
})
