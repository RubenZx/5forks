import { Component, ReactNode } from 'react'
import { StyleProp, TextStyle, ViewStyle } from 'react-native'

declare module 'react-native-easy-toast' {
  export interface DURATION {
    LENGTH_SHORT: number
    FOREVER: number
  }

  export interface ToastProps {
    ref: React.Ref<Toast>
    position?: 'top' | 'center' | 'bottom'
    positionValue?: number
    fadeInDuration?: number
    fadeOutDuration?: number
    opacity?: number
    style?: StyleProp<ViewStyle>
    textStyle?: StyleProp<TextStyle>
  }

  export default class Toast extends Component<ToastProps> {
    show: (
      text: string | ReactNode,
      duration?: number,
      callback?: () => void
    ) => void

    close: (duration?: number) => void
  }
}
