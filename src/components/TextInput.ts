import { TextInput as PaperTextInput } from 'react-native-paper'
import styled from 'styled-components/native'

const TextInput = styled(PaperTextInput)`
  margin-top: ${({ theme }) => theme.spacing.marginTop};
`

export default TextInput
