import React from 'react'
import { Modal, Portal } from 'react-native-paper'
import styled from 'styled-components/native'

type ModalProps = {
  visible: boolean
  handleDismiss: () => void
  children: React.ReactNode
}

const View = styled.View`
  height: auto;
  width: 90%;
  align-self: center;
  background-color: #fff;
  padding: ${({ theme }) => theme.spacing.padding};
`

export default ({ children, visible, handleDismiss }: ModalProps) => {
  return (
    <Portal>
      <Modal visible={visible} dismissable onDismiss={handleDismiss}>
        <View>{children}</View>
      </Modal>
    </Portal>
  )
}
