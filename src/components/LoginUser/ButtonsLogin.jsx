import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { database } from '../../services/database/Firebase'
import { collection, addDoc } from 'firebase/firestore'
import { useDispatch } from 'react-redux'
import { changeUserLoggedIn, changeNewUserLoggedIn } from '../../redux/UserLoggedInSliceReducer'
import UseGetUsers from '../../hooks/UseGetUsers'

export default function ButtonsLogin ({ isLoginButton, handleSubmit, txtButton, fieldsResetForm, handleShowAlert, navigation }) {
  const { users } = UseGetUsers()
  const auth = getAuth()
  const dispatch = useDispatch()

  const saveUserDatabse = async (newUser) => {
    await addDoc(collection(database, 'usersMoBus'), newUser)
  }

  const handleCreateAccount = (data) => {
    const { name, lastName, username, email } = data

    createUserWithEmailAndPassword(auth, email, data.password)
      .then((userCredential) => {
        const user = userCredential.user

        const newUser = {
          uid: user.uid,
          name,
          lastName,
          username,
          email,
          rutasFav: [],
          isLoggedIn: true
        }

        saveUserDatabse(newUser)
        dispatch(changeNewUserLoggedIn({ newUser }))
        fieldsResetForm()
        navigation.navigate('MainViews')
      })
      .catch((error) => {
        console.log(error)

        handleShowAlert()
      })
  }

  const handleSignIn = (data) => {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        const { uid } = userCredential.user
        fieldsResetForm()

        dispatch(changeUserLoggedIn({ users, uid }))

        navigation.navigate('MainViews')
      })
      .catch((error) => {
        console.log(error)

        handleShowAlert()
      })
  }

  return (
    <>
      {
        isLoginButton
          ? (
            <>
              <TouchableOpacity
                style={{ ...styles.buttonForm, marginTop: 15 }}
                onPress={txtButton === 'REGISTRARSE'
                  ? handleSubmit(handleCreateAccount)
                  : handleSubmit(handleSignIn)}
              >
                <Text style={styles.txtButton}>{txtButton}</Text>
              </TouchableOpacity>
              {txtButton === 'REGISTRARSE'
                ? (
                  <TouchableOpacity
                    style={{ ...styles.buttonForm, backgroundColor: '#00a400', marginTop: 10 }}
                    onPress={() => navigation.navigate('LoginUser')}
                  >
                    <Text style={styles.txtButton}>VOLVER AL INICIO DE SESIÓN</Text>
                  </TouchableOpacity>
                  )
                : <></>}
            </>
            )
          : (
            <View style={{ width: '80%', marginTop: 15 }}>
              <TouchableOpacity
                style={{ ...styles.buttonForm, backgroundColor: '#00a400' }}
                onPress={() => navigation.navigate('RegisterUser')}
              >
                <Text style={styles.txtButton}>CREAR NUEVA CUENTA DE MOBUS</Text>
              </TouchableOpacity>
            </View>
            )
      }
    </>
  )
}

const styles = StyleSheet.create({
  buttonForm: {
    width: '100%',
    backgroundColor: '#7900ac',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  txtButton: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
    padding: 10,
    color: '#fff'
  }
})
