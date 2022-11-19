import { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { FontAwesome, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'
import { useSelector, useDispatch } from 'react-redux'
import { changeUserRutasFav } from '../../redux/UserLoggedInSliceReducer'
import UseGetUsers from '../../hooks/UseGetUsers'
import AlertSimple from '../LoginUser/AlertSimple'

const ACTIONS_RUTA_FAV = {
  ADD_NEW_RUTA_FAV: 'AddNewFavRuta',
  DELETE_RUTA_FAV: 'DeleteFavRuta'
}

export default function BottomOptions ({ navigation, infoBuseta, markedFocused, principalColors }) {
  const { paradasRuta } = infoBuseta
  const [imgsParada, setImgsParada] = useState(paradasRuta[0].imgsParada)
  const [nameParada, setNameParada] = useState('')
  const stateUserLoggedIn = useSelector((state) => state.userLoggedIn.userInfo)
  const [isRutaFav, setIsRutaFav] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const { users } = UseGetUsers()
  const dispatch = useDispatch()

  const handleShowAlert = () => {
    setShowAlert(prevShowAlert => !prevShowAlert)
  }

  const handleNewRutaFav = () => {
    if (!isRutaFav) {
      dispatch(changeUserRutasFav({
        users,
        uid: stateUserLoggedIn.uid,
        type: ACTIONS_RUTA_FAV.ADD_NEW_RUTA_FAV,
        isRutaVeredal: principalColors.primaryColor === '#4930AF',
        newRuta: infoBuseta
      }))
      setIsRutaFav(true)
      handleShowAlert()
    } else {
      dispatch(changeUserRutasFav({
        users,
        uid: stateUserLoggedIn.uid,
        type: ACTIONS_RUTA_FAV.DELETE_RUTA_FAV,
        isRutaVeredal: principalColors.primaryColor === '#4930AF',
        newRuta: infoBuseta
      }))
      setIsRutaFav(false)
      handleShowAlert()
    }
  }

  useEffect(() => {
    paradasRuta.forEach((parada) => {
      const { numParada, imgsParada, nameParada } = parada
      if (markedFocused === numParada) {
        setNameParada(nameParada)
        setImgsParada(imgsParada)
      }
    })
  }, [markedFocused])

  useEffect(() => {
    const { rutasFav } = stateUserLoggedIn

    rutasFav.forEach((ruta) => {
      if (ruta.nameRuta === infoBuseta.nameRuta) setIsRutaFav(true)
    })
  }, [])

  return (
    <>
      <AlertSimple
        show={showAlert}
        title={isRutaFav
          ? '¡RUTA AGREGADA A FAVORITOS!'
          : '¡RUTA ELIMINADA DE FAVORITOS!'}
        titleStyle={{ fontWeight: 'bold' }}
        message={isRutaFav
          ? 'Has agregado esta ruta al apartado de "rutas favoritas".'
          : 'Has eliminado esta ruta del apartado de "rutas favoritas".'}
        cancelText='ENTENDIDO'
        onCancelPressed={handleShowAlert}
      />
      <View style={styles.bottomOptionsContainer}>
        <View style={styles.bottomOptions}>
          <View style={styles.bottomOption}>
            <TouchableOpacity
              style={styles.buttonOption}
              onPress={handleNewRutaFav}
            >
              <FontAwesome
                name={isRutaFav ? 'star' : 'star-o'}
                style={isRutaFav ? styles.iconOptionBottomActive : styles.iconOptionBottom}
              />
              <Text
                style={isRutaFav ? styles.txtOptionBottomActive : styles.txtOptionBottom}
              >Favorito
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.bottomOption}>
            <TouchableOpacity style={styles.buttonOption}>
              <MaterialIcons name='report' style={styles.iconOptionBottom} />
              <Text style={styles.txtOptionBottom}>Reportar</Text>
            </TouchableOpacity>
          </View>
        </View>
        {
          imgsParada.length !== 0
            ? (
              <View style={styles.bottomOptionSend}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('PreviewImageParada',
                      { infoBuseta, imgsParada, nameParada, principalColors })}
                >
                  <MaterialCommunityIcons
                    name='tooltip-image'
                    style={{
                      ...styles.iconOptionBottomSend,
                      color: principalColors.primaryColor
                    }}
                  />
                </TouchableOpacity>
              </View>
              )
            : null
        }
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  bottomOptionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#DCDDE1'
  },
  bottomOptions: {
    flexDirection: 'row'
  },
  bottomOption: {
    justifyContent: 'center',
    marginRight: 30
  },
  buttonOption: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  bottomOptionSend: {
    justifyContent: 'center'
  },
  iconOptionBottom: {
    fontSize: 24,
    color: '#227DC4'
  },
  iconOptionBottomActive: {
    fontSize: 24,
    color: '#f7a10c'
  },
  iconOptionBottomSend: {
    fontSize: 55
  },
  txtOptionBottom: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#227DC4'
  },
  txtOptionBottomActive: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#f7a10c'
  }
})
