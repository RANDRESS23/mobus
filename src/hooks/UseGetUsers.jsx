import { useState, useEffect } from 'react'
import GetUsers from '../services/GetUsers'

/* ➡ Método que se encarga de obtener los usuarios que están registrados en MoBus y retornarlos. */
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
