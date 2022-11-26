import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import AlertSimple from '../../components/LoginUser/AlertSimple'
import NavigationBusetas from '../../components/SearchBuseta/NavigationBusetas'
import ToolbarInputHeader from '../../components/SearchBuseta/ToolbarInputHeader'

/* ➡ Componente que se encarga de renderizar el stack donde el usuario va a poder realizar la busqueda de una buseta de su interés. */
export default function SearchBuseta ({ navigation }) {
  const [valueInput, setValueInput] = useState('')
  const [showAlert, setShowAlert] = useState(true)

  const handleShowAlert = () => {
    setShowAlert(prevShowAlert => !prevShowAlert)
  }

  return (
    <>
      <AlertSimple
        show={showAlert}
        title='➡ ¡PRÓXIMAMENTE! ➡'
        titleStyle={{ fontWeight: 'bold' }}
        message='¡La acción de "Buscar Buseta" estará disponible próximamente!'
        cancelText='OK'
        onCancelPressed={handleShowAlert}
      />
      <View style={styles.searchBusetaContainer}>
        <ToolbarInputHeader
          navigation={navigation}
          valueInput={valueInput}
          setValueInput={setValueInput}
        />
        <NavigationBusetas />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  searchBusetaContainer: {
    flex: 1
  }
})
