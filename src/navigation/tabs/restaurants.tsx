import { createStackNavigator } from '@react-navigation/stack'
import Restaurants from '@Screens/Restaurants'
import React from 'react'
import { RestaurantStackParamList } from './tabs'

const Stack = createStackNavigator<RestaurantStackParamList>()

const RestaurantsStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Restaurants" component={Restaurants} />
    </Stack.Navigator>
  )
}

export default RestaurantsStack
