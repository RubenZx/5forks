import { Button as PaperButton } from 'react-native-paper'
import styled from 'styled-components/native'

const SubmitButton = styled(PaperButton)`
  margin-top: ${({ theme }) => theme.spacing.marginTop};
`

export default SubmitButton
