import { database } from './database/Firebase'
import { collection, onSnapshot, query } from 'firebase/firestore'

export default function GetUsers ({ setUsers }) {
  const collectionRef = collection(database, 'usersMoBus')
  const q = query(collectionRef)

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
