import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import AlertSimple from '../LoginUser/AlertSimple'

/* ➡ Componente que se encarga de renderizar el horario de servicio de su respectiva ruta en el stack de la información de cada buseta. */
export default function HorarioServicio ({ infoBuseta }) {
  const { horarioServicio, nameRuta } = infoBuseta
  const [nameRutaFocus, setNameRutaFocus] = useState('')
  const [showAlert, setShowAlert] = useState(false)

  const handleShowAlert = () => {
    setShowAlert(prevShowAlert => !prevShowAlert)
  }

  useEffect(() => {
    const namesRutaArr = nameRuta.split('⇄')

    if (namesRutaArr.length === 1) {
      const newNameRutaFocus = nameRuta.split(' ').reverse().join(' ')
      setNameRutaFocus(newNameRutaFocus)
    } else {
      const [firstNameRuta, secondNameRuta] = namesRutaArr // eslint-disable-line
      setNameRutaFocus(secondNameRuta.trim())
    }
  }, [])

  return (
    <>
      <AlertSimple
        show={showAlert}
        title='➡ ¡PRÓXIMAMENTE! ➡'
        titleStyle={{ fontWeight: 'bold' }}
        message='¡Esta acción estará disponible próximamente!'
        cancelText='OK'
        onCancelPressed={handleShowAlert}
      />
      <View style={styles.horarioServicioContainer}>
        <View style={styles.nameAndDirectionRutaContainer}>
          <Text style={styles.txtNameRuta}>{nameRutaFocus}</Text>
          <TouchableOpacity onPress={handleShowAlert}>
            <Text style={styles.txtChangeDirection}>Cambiar sentido</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.txtHorario}>Horario de servicio: {horarioServicio}</Text>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  horarioServicioContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#292A2F'
  },
  nameAndDirectionRutaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  txtNameRuta: {
    fontSize: 20,
    color: '#FFFFFF'
  },
  txtChangeDirection: {
    fontSize: 13,
    color: '#227DC4'
  },
  txtHorario: {
    fontSize: 14,
    color: '#FFFFFF'
  }
})
