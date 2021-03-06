import Navigation from '@Navigation'
import { FirebaseProvider } from '@Utils/firebase'
import { paperTheme, styledTheme } from '@Utils/theme'
import React from 'react'
import { Provider as PaperProvider } from 'react-native-paper'
import { ThemeProvider } from 'styled-components/native'

export default function App() {
  return (
    <FirebaseProvider>
      <ThemeProvider theme={styledTheme}>
        <PaperProvider theme={paperTheme}>
          <Navigation />
        </PaperProvider>
      </ThemeProvider>
    </FirebaseProvider>
  )
}
