import Loading from '@Components/Loading'
import SubmitButton from '@Components/SubmitButton'
import TextInput from '@Components/TextInput'
import useFirebase from '@Utils/firebase/hooks'
import { Formik } from 'formik'
import React from 'react'
import * as yup from 'yup'

type ChangeNameProps = {
  onOk: () => void
}

const validationSchema = yup.object().shape({
  name: yup.string().required('Introduces a new name')
})

export default ({ onOk }: ChangeNameProps) => {
  const { auth } = useFirebase()
  return (
    <Formik
      initialValues={{ name: '' }}
      onSubmit={async ({ name }) => {
        await auth.currentUser.updateProfile({ displayName: name })
        onOk()
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
            value={values.name}
            error={errors.name && touched.name}
            mode="outlined"
            label={errors.name ? errors.name : 'Name'}
            onChangeText={handleChange('name')}
          />
          <SubmitButton mode="contained" onPress={handleSubmit}>
            Change name
          </SubmitButton>
          <Loading isVisible={isSubmitting} />
        </>
      )}
    </Formik>
  )
}
