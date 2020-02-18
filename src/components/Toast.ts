import EasyToast from 'react-native-easy-toast'
import styled from 'styled-components'

const Toast = styled(EasyToast)`
  margin-left: ${({ theme }) => theme.spacing.marginLeft};
  margin-right: ${({ theme }) => theme.spacing.marginRight};
`

export type ToastType = EasyToast
export default Toast
