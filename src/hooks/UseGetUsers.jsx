import { useState, useEffect } from 'react'
import GetUsers from '../services/GetUsers'

export default function UseGetUsers () {
  const [users, setUsers] = useState([])

  useEffect(() => {
    GetUsers({ setUsers })

    return () => {
      setUsers([])
    }
  }, [])

  return { users }
}
