import { database } from './database/Firebase'
import { collection, onSnapshot, query } from 'firebase/firestore'

/* ➡ Método que se encargará de obtener los usuarios registrados en la BD de Firebase. */
export default function GetUsers ({ setUsers }) {
  const collectionRef = collection(database, 'usersMoBus')
  const q = query(collectionRef)

  /* ➡ Se recorre el resultado obtenido de la BD (arreglo de objetos) y se van guardando en una variable de estado, que es otro arreglo de objetos, dichos resultados (usuarios). */
  const unsuscribe = onSnapshot(q, querySnapshot => {
    setUsers(
      querySnapshot.docs.map((doc) => {
        const rutaInfo = {
          id: doc.id,
          uid: doc.data().uid,
          name: doc.data().name,
          lastName: doc.data().lastName,
          username: doc.data().username,
          email: doc.data().email,
          rutasFav: doc.data().rutasFav,
          isLoggedIn: doc.data().isLoggedIn
        }
        return rutaInfo
      })
    )
  })

  return unsuscribe
}
