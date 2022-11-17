import { database } from './database/Firebase'
import { collection, onSnapshot, query } from 'firebase/firestore'

export default function GetBusetas ({ firebaseKeyCollection, setRutas, setLoading, isRecentBusetas }) {
  const collectionRef = collection(database, firebaseKeyCollection)
  const q = query(collectionRef)
  // FALTA CORREGIR EL LOADING DE LAS RUTAS
  const unsuscribe = onSnapshot(q, querySnapshot => {
    setLoading(true)

    setRutas(
      querySnapshot.docs.map((doc) => {
        const rutaInfo = {
          id: doc.id,
          nameRuta: doc.data().nameRuta,
          numRuta: doc.data().numRuta,
          horarioServicio: doc.data().horarioServicio,
          paradasRuta: doc.data().paradasRuta,
          polylineCoordinates: doc.data().polylineCoordinates
        }

        if (isRecentBusetas) {
          if (firebaseKeyCollection === 'rutasVeredales') {
            return {
              ...rutaInfo,
              isBusVeredal: true
            }
          }

          return {
            ...rutaInfo,
            isBusVeredal: false
          }
        }

        return rutaInfo
      })
    )
    setLoading(false)
  })

  return unsuscribe
}
