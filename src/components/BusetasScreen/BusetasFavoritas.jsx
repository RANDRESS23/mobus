import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import BusetasFavCardsContainer from './BusetasFavCardsContainer'
import LearnAddNewRutaFav from './LearnAddNewRutaFav'
import TabBarSectionBusetas from './TabBarSectionBusetas'
import AlertSimple from '../LoginUser/AlertSimple'

/* ➡ Componente que se encarga de renderizar las busetas favoritas solo si el usuario ha seleccionado por lo menos una ruta favorita. */
export default function BusetasFavoritas ({ navigation }) {
  const [showAlert, setShowAlert] = useState(false)
  const [isRutasFavEmpty, setIsRutasFavEmpty] = useState(true)
  const stateUserLoggedIn = useSelector((state) => state.userLoggedIn.userInfo)
  const { rutasFav } = stateUserLoggedIn

  const handleShowAlert = () => {
    setShowAlert(prevShowAlert => !prevShowAlert)
  }

  useEffect(() => {
    setIsRutasFavEmpty((prevIsRutasFavEmpty) => rutasFav.length === 0)
  }, [stateUserLoggedIn])

  return (
    <>
      <AlertSimple
        show={showAlert}
        title='¡AGREGA FÁCILMENTE UNA RUTA A FAVORITOS!'
        titleStyle={{ fontWeight: 'bold' }}
        message={'1. Selecciona una ruta.\n2. Pulsa la estrella en la parte inferior de la pantalla.\n3. Listo.'}
        cancelText='ENTENDIDO'
        onCancelPressed={handleShowAlert}
      />
      {
        isRutasFavEmpty
          ? <LearnAddNewRutaFav handleShowAlert={handleShowAlert} />
          : (
            <>
              <TabBarSectionBusetas sectionTitle='RUTAS FAVORITAS' />
              <BusetasFavCardsContainer navigation={navigation} />
            </>
            )
      }
    </>
  )
}
