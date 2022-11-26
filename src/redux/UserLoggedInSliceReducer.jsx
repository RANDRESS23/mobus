import { createSlice } from '@reduxjs/toolkit'
import { doc, updateDoc } from 'firebase/firestore'
import { database } from '../services/database/Firebase'

const ACTIONS_RUTA_FAV = {
  ADD_NEW_RUTA_FAV: 'AddNewFavRuta',
  DELETE_RUTA_FAV: 'DeleteFavRuta'
}

/* ➡ Configurando el slice del reducer de redux para tener la información del usuario en el store de la aplicación. */
export const UserLoggedInSliceReducer = createSlice({
  name: 'user',
  initialState: { userInfo: {} },
  reducers: {
    changeUserLoggedIn: (state, action) => {
      const { users, uid } = action.payload

      users.forEach(user => {
        if (user.uid === uid) {
          const docRef = doc(database, 'usersMoBus', user.id)
          const infoUserLoggedIn = { ...user, isLoggedIn: true }

          updateDoc(docRef, infoUserLoggedIn)
            .then(() => {
              // console.log('INICIO DE SESIÓN EXITOSAMENTE')
            }).catch((error) => {
              console.log({ error })
            })

          state.userInfo = infoUserLoggedIn
        }
      })
    },
    changeUserLogOut: (state, action) => {
      const { users, uid } = action.payload

      users.forEach(user => {
        if (user.uid === uid) {
          const docRef = doc(database, 'usersMoBus', user.id)
          const infoUserLoggedIn = { ...user, isLoggedIn: false }

          updateDoc(docRef, infoUserLoggedIn)
            .then(() => {
              // console.log('INICIO DE SESIÓN EXITOSAMENTE')
            }).catch((error) => {
              console.log({ error })
            })

          state.userInfo = { rutasFav: [] }
        }
      })
    },
    changeNewUserLoggedIn: (state, action) => {
      const { newUser } = action.payload
      state.userInfo = newUser
    },
    changeUserRutasFav: (state, action) => {
      const { users, uid, type, isRutaVeredal, newRuta } = action.payload

      users.forEach(user => {
        if (user.uid === uid) {
          const docRef = doc(database, 'usersMoBus', user.id)
          let newRutasFav = []

          switch (type) {
            case ACTIONS_RUTA_FAV.ADD_NEW_RUTA_FAV:
              newRutasFav = [...user.rutasFav, { ...newRuta, isRutaVeredal }]
              break
            case ACTIONS_RUTA_FAV.DELETE_RUTA_FAV:
              newRutasFav = user.rutasFav
                .map((ruta) => {
                  if (ruta.nameRuta !== newRuta.nameRuta) return ruta
                  return { nameRuta: 'DELETED' }
                })
                .filter((ruta) => ruta.nameRuta !== 'DELETED')
              break
            default:
              break
          }

          const updatedInfoUser = { ...user, rutasFav: newRutasFav }

          updateDoc(docRef, updatedInfoUser)
            .then(() => {
              // console.log('ACTUALIZACIÓN ELABORADA EXITOSAMENTE')
            }).catch((error) => {
              console.log({ error })
            })

          state.userInfo = updatedInfoUser
        }
      })
    }
  }
})

export const { changeUserLoggedIn, changeUserLogOut, changeNewUserLoggedIn, changeUserRutasFav } = UserLoggedInSliceReducer.actions
export default UserLoggedInSliceReducer.reducer
