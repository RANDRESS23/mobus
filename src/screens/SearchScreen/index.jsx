import React, { useState, useEffect } from 'react'
import { View, ScrollView, BackHandler } from 'react-native'
import MainToolbar from '../../components/SearchScreen/MainToolbar'
import ItemCardFavoriteAddress from '../../components/SearchScreen/ItemCardFavoriteAddress'
import ImageBackgroundSearch from '../../components/SearchScreen/ImageBackgroundSearch'
import InputSearch from '../../components/SearchScreen/InputSearch'
import TabBarSection from '../../components/SearchScreen/TabBarSection'
import { useSelector, useDispatch } from 'react-redux'
import { changeUserLogOut } from '../../redux/UserLoggedInSliceReducer'
import UseGetUsers from '../../hooks/UseGetUsers'
import AwesomeAlert from 'react-native-awesome-alerts'

/* ➡ Componente que se encarga de renderizar el stack donde el usuario va a poder realizar busquedas de direcciones y agregar lugares a favoritos para así tener un acceso más rápido. */
export default function SearchScreen ({ navigation }) {
  const [showAlert, setShowAlert] = useState(false)
  const { users } = UseGetUsers()
  const stateUserLoggedIn = useSelector((state) => state.userLoggedIn.userInfo)
  const dispatch = useDispatch()

  const handleShowAlert = () => {
    setShowAlert(prevShowAlert => !prevShowAlert)
  }

  const handleBackButtonClick = () => {
    if (navigation.isFocused()) handleShowAlert()
    else navigation.goBack()

    return true
  }

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick)

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick)
    }
  }, [])

  return (
    <>
      <AwesomeAlert
        show={showAlert}
        showProgress={false}
        title='⚠ ¡ADVERTENCIA! ⚠'
        titleStyle={{ fontWeight: 'bold' }}
        message='¿Está segur@ que desea cerrar su sesión de MoBus?'
        closeOnTouchOutside={false}
        closeOnHardwareBackPress={false}
        showCancelButton
        showConfirmButton
        cancelText='CANCELAR'
        confirmText='CERRAR SESIÓN'
        cancelButtonColor='#8395a7'
        cancelButtonTextStyle={{ fontWeight: 'bold' }}
        confirmButtonColor='#7900ac'
        confirmButtonTextStyle={{ fontWeight: 'bold' }}
        onCancelPressed={handleShowAlert}
        onConfirmPressed={() => {
          navigation.goBack()
          dispatch(changeUserLogOut({ users, uid: stateUserLoggedIn.uid }))
        }}
      />
      <ScrollView>
        <View>
          <MainToolbar navigation={navigation} isFirstToolbar />
          <ImageBackgroundSearch />
          <InputSearch navigation={navigation} />
        </View>
        <TabBarSection navigation={navigation} />
        <ItemCardFavoriteAddress nameIcon='home' nameAddress='Casa' />
        <ItemCardFavoriteAddress nameIcon='briefcase-variant' nameAddress='Trabajo' />
      </ScrollView>
    </>
  )
}
