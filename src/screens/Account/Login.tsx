/* eslint-disable react-native/no-raw-text */
import Container from '@Components/Container'
import Loading from '@Components/Loading'
import Logo from '@Components/Logo'
import SubmitButton from '@Components/SubmitButton'
import TextInput from '@Components/TextInput'
import Toast, { ToastType } from '@Components/Toast'
import { Octicons } from '@expo/vector-icons'
import { AccountStackNavigationProp } from '@Navigation/tabs/tabs'
import { useNavigation } from '@react-navigation/native'
import useFirebase from '@Utils/firebase/hooks'
import { Formik } from 'formik'
import React, { useRef, useState } from 'react'
import { ScrollView } from 'react-native'
import { Button, Divider as PapeDivider } from 'react-native-paper'
import styled from 'styled-components/native'
import * as yup from 'yup'

const GitHub = styled(Button)`
  background-color: black;
`

const RegisterText = styled.Text`
  margin-top: 15px;
  margin-left: 10px;
  margin-right: 10px;
`

const RegisterButton = styled.Text`
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
`

const Divider = styled(PapeDivider)`
  margin-top: ${({ theme }) => theme.spacing.marginTop};
  margin-bottom: ${({ theme }) => theme.spacing.marginBottom};
  margin-right: ${({ theme }) => theme.spacing.marginRight};
  margin-left: ${({ theme }) => theme.spacing.marginLeft};
  height: 1px;
  background-color: ${({ theme }) => theme.colors.primary};
`

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Incorrect format')
    .required('Email is a required field'),
  password: yup
    .string()
    .required('Password is a required field')
    .min(8, 'Too short')
    .max(20, 'Too long')
})

const Login = () => {
  const { navigate } = useNavigation<AccountStackNavigationProp>()
  const { auth, signInWithGitHubPopup } = useFirebase()
  const toastRef = useRef<ToastType>()

  const [submitting, setSubmitting] = useState(false)

  return (
    <ScrollView>
      <Logo />
      <Container>
        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={async ({ email, password }) => {
            try {
              await auth.signInWithEmailAndPassword(email, password)
              navigate('Account')
            } catch (e) {
              toastRef.current.show(e.message)
            }
          }}
          validationSchema={validationSchema}>
          {({
            values,
            handleChange,
            errors,
            touched,
            handleSubmit,
            isSubmitting
          }) => (
            <>
              <TextInput
                value={values.email}
                error={errors.email && touched.email}
                mode="outlined"
                label={errors.email ? errors.email : 'Email'}
                onChangeText={handleChange('email')}
              />
              <TextInput
                value={values.password}
                mode="outlined"
                error={errors.password && touched.password}
                label={errors.password ? errors.password : 'Password'}
                onChangeText={handleChange('password')}
                secureTextEntry
              />
              <SubmitButton mode="contained" onPress={handleSubmit}>
                Log in
              </SubmitButton>
              <Loading isVisible={isSubmitting} />
            </>
          )}
        </Formik>
        <RegisterText>
          Still unregistered?{' '}
          <RegisterButton onPress={() => navigate('Register')}>
            Register
          </RegisterButton>
        </RegisterText>
      </Container>
      <Divider />
      <Container>
        <GitHub
          uppercase={false}
          mode="contained"
          onPress={async () => {
            try {
              setSubmitting(true)
              await signInWithGitHubPopup()
              navigate('Account')
            } catch ({ message }) {
              toastRef.current.show(message)
            } finally {
              setSubmitting(false)
            }
          }}
          icon={({ size, color }) => (
            <Octicons size={size} color={color} name="mark-github" />
          )}>
          continue with github
        </GitHub>
      </Container>
      <Loading isVisible={submitting} />
      <Toast position="center" opacity={0.5} ref={toastRef} />
    </ScrollView>
  )
}

export default Login
