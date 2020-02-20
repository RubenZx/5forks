import Container from '@Components/Container'
import Modal from '@Components/Modal'
import Gravatar from '@krosben/react-native-gravatar'
// eslint-disable-next-line import/no-extraneous-dependencies
import useFirebase from '@Utils/firebase/hooks'
import React, { useState } from 'react'
import { Text, View } from 'react-native'
import { Button as PaperButton, Divider, List } from 'react-native-paper'
import styled from 'styled-components/native'
import ChangeEmail from './ChangeEmail'
import ChangeName from './ChangeName'
import ChangePassword from './ChangePassword'

const Avatar = styled.View`
  margin-top: ${({ theme }) => theme.spacing.marginTop};
  margin-bottom: ${({ theme }) => theme.spacing.marginBottom};
  margin-right: ${({ theme }) => theme.spacing.marginTop};
`

const LoggedContainer = styled(Container)`
  align-items: center;
  justify-content: center;
  flex-direction: row;
`

const Name = styled.Text`
  font-weight: bold;
`

const Item = styled(List.Item)`
  background-color: #ffffff;
`

const Button = styled(PaperButton)`
  background-color: #ffffff;
  margin-top: ${({ theme }) => theme.spacing.marginTop};
`

const listItems = [
  {
    title: 'Change your firstname and lastname',
    leftIcon: 'account-circle'
  },
  {
    title: 'Change your email',
    leftIcon: 'at'
  },
  {
    title: 'Change your password',
    leftIcon: 'lock-reset'
  }
]

const forms = [ChangeName, ChangeEmail, ChangePassword]

const UserLogged = () => {
  const { auth } = useFirebase()
  const [visible, setVisible] = useState(false)
  const [currentForm, setCurrentForm] = useState(0)
  const [isOAuth, setOAuth] = useState(
    auth.currentUser.providerData.some(
      ({ providerId }) => providerId === 'github.com'
    )
  )
  return (
    <>
      <LoggedContainer>
        <Avatar>
          <Gravatar
            email={auth.currentUser.email}
            borderStyle="circle"
            size={200}
          />
        </Avatar>
        <View>
          <Name>{auth.currentUser.displayName || 'Nameless'}</Name>
          <Text>{auth.currentUser.email}</Text>
        </View>
      </LoggedContainer>
      <View>
        {listItems.map(({ title, leftIcon }, idk, { length }) => (
          <View key={title}>
            <Item
              title={title}
              left={({ color }) => <List.Icon color={color} icon={leftIcon} />}
              right={({ color }) => (
                <List.Icon color={color} icon="chevron-right" />
              )}
              onPress={() => {
                setCurrentForm(idk)
                setVisible(true)
              }}
            />
            {idk < length - 1 && <Divider />}
          </View>
        ))}
      </View>
      <Button mode="text" onPress={() => auth.signOut()}>
        Logout
      </Button>
      <Modal visible={visible} handleDismiss={() => setVisible(false)}>
        {isOAuth && currentForm > 0 ? (
          <Text>Unable to change</Text>
        ) : (
          React.createElement(forms[currentForm], {
            onOk: () => setVisible(false)
          })
        )}
      </Modal>
    </>
  )
}

export default UserLogged
