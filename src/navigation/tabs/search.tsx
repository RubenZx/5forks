import { createStackNavigator } from '@react-navigation/stack'
import Search from '@Screens/Search'
import React from 'react'
import { SearchStackParamList } from './tabs'

const Stack = createStackNavigator<SearchStackParamList>()

const SearchStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Search"
        component={Search}
        options={{ title: 'Search...' }}
      />
    </Stack.Navigator>
  )
}

export default SearchStack
