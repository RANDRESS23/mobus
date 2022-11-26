import { database } from './database/Firebase'
import { collection, onSnapshot, query } from 'firebase/firestore'

/* ➡ Método que se encargará de obtener las busetas guardadas en la BD de Firebase. */
export default function GetBusetas ({ firebaseKeyCollection, setRutas, setLoading, isRecentBusetas }) {
  const collectionRef = collection(database, firebaseKeyCollection)
  const q = query(collectionRef)

  /* ➡ Se recorre el resultado obtenido (rutas municipales o veredales) de la BD (arreglo de objetos) y se van guardando en una variable de estado, que es otro arreglo de objetos, dichos resultados (busetas). */
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
