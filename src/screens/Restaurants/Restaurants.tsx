import { RestaurantStackNavigationProp } from '@Navigation/tabs/tabs'
import { useNavigation } from '@react-navigation/native'
import useFirebase from '@Utils/firebase/hooks'
import { styledTheme } from '@Utils/theme'
import React, { useEffect, useState } from 'react'
import { Text } from 'react-native'
import ActionButton from 'react-native-action-button'
import styled from 'styled-components/native'

const View = styled.View`
  flex: 1;
`

export default () => {
  const { auth } = useFirebase()
  const { navigate } = useNavigation<RestaurantStackNavigationProp>()
  const [user, setUser] = useState(null)

  useEffect(() => auth.onAuthStateChanged(userInfo => setUser(userInfo)), [
    auth
  ])

  return (
    <View>
      <Text>Restaurants view</Text>
      {user && (
        <ActionButton
          buttonColor={styledTheme.colors.primary}
          onPress={() => navigate('AddRestaurant')}
        />
      )}
    </View>
  )
}
