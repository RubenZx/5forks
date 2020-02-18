import { Component } from 'react'
import { StyleProps, ViewStyle } from 'react-native'

declare module 'react-native-avatar-gravatar' {
  export interface GravatarProps extends StyleProps<ViewStyle> {
    emailAddress: string
    size?: number
    mask?: 'circle' | 'square' | 'rounded'
    defaultImage?:
      | '404'
      | 'mm'
      | 'identicon'
      | 'monsterid'
      | 'wavatar'
      | 'retro'
      | 'robohash'
      | 'blank'
    resizeMode?: 'cover' | 'contain' | 'stretch' | 'repeat' | 'center'
  }

  export default class Gravatar extends Component<GravatarProps> {}
}
