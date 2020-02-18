import { NavigationContainer } from '@react-navigation/native'
import { navigationTheme } from '@Utils/theme'
import React from 'react'
import TabNavigation from './tabs'

const Navigation = () => {
  return (
    <NavigationContainer theme={navigationTheme}>
      <TabNavigation />
    </NavigationContainer>
  )
}

export default Navigation
