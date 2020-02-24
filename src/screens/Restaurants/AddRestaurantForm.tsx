import SubmitButton from '@Components/SubmitButton'
import Toast, { ToastType } from '@Components/Toast'
import useImagePicker from '@Hooks/useImagePicker'
import useCameraPermission from '@Hooks/usePermission'
import { Formik } from 'formik'
import React, { useRef } from 'react'
import { View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Avatar } from 'react-native-paper'
import styled from 'styled-components/native'

type AddRestaurantFormProps = {
  setLoading: () => void
}

type UploadImageProps = {
  imagesSelected: any
  setImagesSelected: any
}

const ViewImage = styled.ScrollView`
  flex-direction: row;
  margin-left: 20px;
  margin-right: 20px;
  margin-top: 20px;
`

const Miniature = styled(Avatar.Image)`
  margin-left: 20px;
  border-radius: 0px;
  background-color: transparent;
`

const SquareAvatar = styled(Avatar.Icon)`
  background-color: #cdcdcd;
`

export default ({ setLoading }: AddRestaurantFormProps) => {
  const toastRef = useRef<ToastType>()
  const { images, openLibrary } = useImagePicker({
    onCancel: () => toastRef.current.show('You have not selected any image'),
    options: { allowsEditing: true, aspect: [4, 3] }
  })
  const { request } = useCameraPermission({
    onRequest: async status => {
      if (status === 'denied') {
        toastRef.current.show('Permisos denegados')
      } else if (status === 'granted') {
        await openLibrary()
      }
    }
  })
  return (
    <>
      <ViewImage horizontal>
        <TouchableOpacity onPress={request}>
          <SquareAvatar icon="camera" size={100} />
        </TouchableOpacity>
        {images.map(({ uri }) => (
          <Miniature key={uri} source={{ uri }} size={100} />
        ))}
      </ViewImage>
      <Formik
        initialValues={{}}
        onSubmit={() => {
          console.log('Adding restaurants')
        }}>
        {({ handleSubmit }) => (
          <View>
            <SubmitButton onPress={handleSubmit}>Add</SubmitButton>
          </View>
        )}
      </Formik>
      <Toast position="center" opacity={0.5} ref={toastRef} />
    </>
  )
}
