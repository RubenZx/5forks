import { styledTheme } from '@Utils/theme'
import 'styled-components/native'

type CustomTheme = typeof styledTheme

declare module 'styled-components/native' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends CustomTheme {}
}
