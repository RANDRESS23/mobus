import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import AlertSimple from '../../components/LoginUser/AlertSimple'

/* ➡ Método que se encargará de retornar cada item de la lista que contiene el drawer de la aplicación. */
export default function ItemList ({ toNavigation, iconItem, textItem, navigation }) {
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
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={handleShowAlert}
      >
        <Ionicons name={iconItem} style={styles.iconListItem} />
        <Text style={styles.itemList}>{textItem}</Text>
      </TouchableOpacity>
    </>
  )
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 20
  },
  iconListItem: {
    fontSize: 24,
    color: '#ccc'
  },
  itemList: {
    fontSize: 16,
    color: '#fff',
    marginLeft: 15
  }
})
