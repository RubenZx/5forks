import Loading from '@Components/Loading'
import useFirebase from '@Utils/firebase/hooks'
import React, { useEffect, useState } from 'react'
import UserGuest from './UserGuest'
import UserLogged from './UserLogged'

const Account = () => {
  const [login, setLogin] = useState<boolean | null>(null)
  const { auth } = useFirebase()

  useEffect(() => {
    auth.onAuthStateChanged(user => setLogin(Boolean(user)))
  }, [auth])

  if (login === null) {
    return <Loading isVisible />
  }

  return login ? <UserLogged /> : <UserGuest />
}

export default Account
