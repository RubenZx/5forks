import { createStackNavigator } from '@react-navigation/stack'
import TopRestaurants from '@Screens/TopRestaurants'
import React from 'react'
import { RankingStackParamList } from './tabs'

const Stack = createStackNavigator<RankingStackParamList>()

const RankingStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Ranking"
        component={TopRestaurants}
        options={{ title: 'Top restaurants' }}
      />
    </Stack.Navigator>
  )
}

export default RankingStack
