import { useState, useEffect } from 'react'
import GetUsers from '../services/GetUsers'

/* ➡ Método que se encarga de obtener el usuario que se logueó en la aplicación y retornarlo. */
export default function UseUserLoggedIn () {
  const [users, setUsers] = useState([])
  const [userLoggedIn, setUserLoggedIn] = useState({})

  useEffect(() => {
    GetUsers({ setUsers })
  }, [])

  useEffect(() => {
    users.forEach((user) => {
      const { isLoggedIn } = user

      if (isLoggedIn) setUserLoggedIn(user)
    })
  }, [users])

  return { userLoggedIn }
}
