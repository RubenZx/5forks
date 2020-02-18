import { createStackNavigator } from '@react-navigation/stack'
import Account from '@Screens/Account/Account'
import Login from '@Screens/Account/Login'
import Register from '@Screens/Account/Register'
import React from 'react'
import { AccountStackParamList } from './tabs'

const Stack = createStackNavigator<AccountStackParamList>()

const AccountStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Account"
        component={Account}
        options={{ title: 'My account' }}
      />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  )
}

export default AccountStack
