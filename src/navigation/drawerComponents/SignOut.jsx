import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { changeUserLogOut } from '../../redux/UserLoggedInSliceReducer'
import { useSelector, useDispatch } from 'react-redux'
import UseGetUsers from '../../hooks/UseGetUsers'
import AwesomeAlert from 'react-native-awesome-alerts'

export default function SignOut ({ navigation }) {
  const [showAlert, setShowAlert] = useState(false)
  const stateUserLoggedIn = useSelector((state) => state.userLoggedIn.userInfo)
  const { users } = UseGetUsers()
  const dispatch = useDispatch()

  const handleShowAlert = () => {
    setShowAlert(prevShowAlert => !prevShowAlert)
  }

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
          navigation.navigate('LoginUser')
          dispatch(changeUserLogOut({ users, uid: stateUserLoggedIn.uid }))
        }}
      />
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={handleShowAlert}
      >
        <Ionicons name='exit-outline' style={styles.iconListItem} />
        <Text style={styles.itemList}>Cerrar sesión</Text>
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
