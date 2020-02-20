/* eslint-disable react-native/no-raw-text */
import Loading from '@Components/Loading'
import SubmitButton from '@Components/SubmitButton'
import TextInput from '@Components/TextInput'
import useFirebase from '@Utils/firebase/hooks'
import { Formik } from 'formik'
import React from 'react'
import * as yup from 'yup'

const validationSchema = yup.object().shape({
  currentPassword: yup.string().required('Introduces your password'),
  newPassword: yup
    .string()
    .required('Introduces your new password')
    .min(8, 'Too short')
    .max(20, 'Too long'),
  confirmNewPassword: yup
    .string()
    .oneOf([yup.ref('newPassword')], 'Passwords should match')
})

type ChangePasswordProps = {
  onOk: () => void
}

export default ({ onOk }: ChangePasswordProps) => {
  const { auth, emailAuthProvider } = useFirebase()
  return (
    <Formik
      initialValues={{
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: ''
      }}
      validationSchema={validationSchema}
      onSubmit={async ({ currentPassword, newPassword }, helpers) => {
        try {
          const { user } = await auth.currentUser.reauthenticateWithCredential(
            emailAuthProvider(auth.currentUser.email, currentPassword)
          )
          await user.updatePassword(newPassword)
          onOk()
        } catch (e) {
          helpers.setErrors({ newPassword: 'Unable to change' })
        }
      }}>
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
            value={values.currentPassword}
            mode="outlined"
            error={errors.currentPassword && touched.currentPassword}
            label={errors.currentPassword ? errors.currentPassword : 'Password'}
            onChangeText={handleChange('currentPassword')}
            secureTextEntry
          />
          <TextInput
            value={values.newPassword}
            mode="outlined"
            error={errors.newPassword && touched.newPassword}
            label={errors.newPassword ? errors.newPassword : 'New password'}
            onChangeText={handleChange('newPassword')}
            secureTextEntry
          />
          <TextInput
            value={values.confirmNewPassword}
            mode="outlined"
            error={errors.confirmNewPassword && touched.confirmNewPassword}
            label={
              errors.confirmNewPassword
                ? errors.confirmNewPassword
                : 'Confirm new password'
            }
            onChangeText={handleChange('confirmNewPassword')}
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
