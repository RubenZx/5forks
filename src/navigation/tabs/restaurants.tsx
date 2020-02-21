import { createStackNavigator } from '@react-navigation/stack'
import { AddRestaurant, Restaurants } from '@Screens/Restaurants'
import React from 'react'
import { RestaurantStackParamList } from './tabs'

const Stack = createStackNavigator<RestaurantStackParamList>()

const RestaurantsStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Restaurants" component={Restaurants} />
      <Stack.Screen
        name="AddRestaurant"
        component={AddRestaurant}
        options={{ title: 'Add restaurant' }}
      />
    </Stack.Navigator>
  )
}

export default RestaurantsStack
