import { MaterialCommunityIcons } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import AccountStack from './account'
import RestaurantsStack from './restaurants'
import SearchStack from './search'
import RankingStack from './topRestaurants'

const Tab = createBottomTabNavigator()

const TabNavigation = () => {
  return (
    <Tab.Navigator initialRouteName="Restaurants">
      <Tab.Screen
        name="Restaurants"
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              size={size}
              color={color}
              name="silverware-fork-knife"
            />
          )
        }}
        component={RestaurantsStack}
      />
      <Tab.Screen
        name="Ranking"
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              size={size}
              color={color}
              name="star-outline"
            />
          )
        }}
        component={RankingStack}
      />
      <Tab.Screen
        name="Search"
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons size={size} color={color} name="magnify" />
          )
        }}
        component={SearchStack}
      />
      <Tab.Screen
        name="Account"
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              size={size}
              color={color}
              name="account-outline"
            />
          )
        }}
        component={AccountStack}
      />
    </Tab.Navigator>
  )
}

export default TabNavigation
