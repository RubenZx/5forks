import useFirebase from '@Utils/firebase/hooks'
import React from 'react'
import { Text, View } from 'react-native'
import { Button } from 'react-native-paper'

const UserLogged = () => {
  const { auth } = useFirebase()
  return (
    <View>
      <Text>User logged</Text>
      <Button onPress={() => auth.signOut()}>Logout</Button>
    </View>
  )
}

export default UserLogged
