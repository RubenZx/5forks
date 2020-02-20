/* eslint-disable react-native/no-raw-text */
import Loading from '@Components/Loading'
import SubmitButton from '@Components/SubmitButton'
import TextInput from '@Components/TextInput'
import useFirebase from '@Utils/firebase/hooks'
import { Formik } from 'formik'
import React from 'react'
import * as yup from 'yup'

type ChangeEmailProps = {
  onOk: () => void
}

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Incorrect format')
    .required('Email must not be empty'),
  password: yup.string().required('Introduces your password')
})

export default ({ onOk }: ChangeEmailProps) => {
  const { auth, emailAuthProvider } = useFirebase()
  return (
    <Formik
      initialValues={{ email: auth.currentUser.email, password: '' }}
      onSubmit={async ({ email, password }, helpers) => {
        try {
          const { user } = await auth.currentUser.reauthenticateWithCredential(
            emailAuthProvider(auth.currentUser.email, password)
          )
          await user.updateEmail(email)
          onOk()
        } catch (e) {
          helpers.setErrors({ password: 'Invalid password' })
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
            Change password
          </SubmitButton>
          <Loading isVisible={isSubmitting} />
        </>
      )}
    </Formik>
  )
}
