import { useState, useEffect } from 'react'
import GetUsers from '../services/GetUsers'

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
