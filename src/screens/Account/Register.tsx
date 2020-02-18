/* eslint-disable react-native/no-raw-text */
import Container from '@Components/Container'
import Loading from '@Components/Loading'
import Logo from '@Components/Logo'
import SubmitButton from '@Components/SubmitButton'
import TextInput from '@Components/TextInput'
import Toast, { ToastType } from '@Components/Toast'
import { AccountStackNavigationProp } from '@Navigation/tabs/tabs'
import { useNavigation } from '@react-navigation/native'
import useFirebase from '@Utils/firebase/hooks'
import { Formik } from 'formik'
import React, { useRef } from 'react'
import { View } from 'react-native'
import * as yup from 'yup'

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Incorrect format')
    .required('Email is a required field'),
  password: yup
    .string()
    .required('Password is a required field')
    .min(8, 'Too short')
    .max(20, 'Too long'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords should match')
})

const Register = () => {
  const toastRef = useRef<ToastType>()
  const { auth } = useFirebase()
  const { navigate } = useNavigation<AccountStackNavigationProp>()

  return (
    <View>
      <Logo />
      <Container>
        <Formik
          initialValues={{ email: '', password: '', confirmPassword: '' }}
          onSubmit={async ({ email, password }) => {
            try {
              await auth.createUserWithEmailAndPassword(email, password)
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
              <TextInput
                value={values.confirmPassword}
                mode="outlined"
                error={errors.confirmPassword && touched.confirmPassword}
                label={
                  errors.confirmPassword
                    ? errors.confirmPassword
                    : 'Repeat your password'
                }
                onChangeText={handleChange('confirmPassword')}
                secureTextEntry
              />
              <SubmitButton mode="contained" onPress={handleSubmit}>
                Sign up
              </SubmitButton>
              <Loading isVisible={isSubmitting} />
            </>
          )}
        </Formik>
      </Container>
      <Toast position="center" opacity={0.5} ref={toastRef} />
    </View>
  )
}

export default Register
