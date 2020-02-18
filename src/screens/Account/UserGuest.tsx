/* eslint-disable react-native/no-raw-text */
import image from '@Assets/img/user-guest.jpg'
import { AccountStackNavigationProp } from '@Navigation/tabs/tabs'
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Button } from 'react-native-paper'
import styled from 'styled-components/native'

const ScrollView = styled.ScrollView`
  margin-top: 30px;
  margin-left: 30px;
  margin-right: 30px;
`

const Image = styled.Image`
  height: 300px;
  width: 100%;
  margin-bottom: 40px;
`

const Title = styled.Text`
  font-weight: bold;
  font-size: 19px;
  margin-bottom: 10px;
  text-align: center;
`
const Description = styled.Text`
  margin-bottom: 20px;
  text-align: center;
`

const View = styled.View`
  flex: 1;
  align-items: center;
`

const StyledButton = styled(Button)`
  width: 70%;
`

const UserGuest = () => {
  const { navigate } = useNavigation<AccountStackNavigationProp>()

  return (
    <ScrollView centerContent>
      <Image source={image} resizeMode="contain" />
      <Title>Check your profile</Title>
      <Description>
        How do you describe your best restaurant experience? Look up for your
        best restaurants, vote for which you prefere and comment your
        experience!
      </Description>
      <View>
        <StyledButton mode="contained" onPress={() => navigate('Login')}>
          My profile
        </StyledButton>
      </View>
    </ScrollView>
  )
}

export default UserGuest
