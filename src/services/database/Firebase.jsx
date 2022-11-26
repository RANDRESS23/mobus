import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import Constants from 'expo-constants'

/* ➡ Se realiza las respectivas asignaciones de las Api - Keys para que Firebase nos de el visto bueno para poder empezar a usar sus funcionalidades. */
const firebaseConfig = {
  apiKey: Constants.manifest.extra.apiKey,
  authDomain: Constants.manifest.extra.authDomain,
  projectId: Constants.manifest.extra.projectId,
  storageBucket: Constants.manifest.extra.storageBucket,
  messagingSenderId: Constants.manifest.extra.messagingSenderId,
  appId: Constants.manifest.extra.appId
}

initializeApp(firebaseConfig)

export const database = getFirestore()
export const storage = getStorage()
