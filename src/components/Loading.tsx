import React from 'react'
import { ActivityIndicator, Modal, Portal } from 'react-native-paper'
import styled from 'styled-components/native'

const SafeAreaView = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
`

interface LoadingProps {
  isVisible: boolean
}

const Loading = ({ isVisible }: LoadingProps) => {
  return (
    <Portal>
      <Modal visible={isVisible} dismissable={false}>
        <SafeAreaView>
          <ActivityIndicator size="large" />
        </SafeAreaView>
      </Modal>
    </Portal>
  )
}

export default Loading
