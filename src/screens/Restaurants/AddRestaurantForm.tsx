import NoImage from '@Assets/img/no-image.png'
import Map from '@Components/Map'
import SubmitButton from '@Components/SubmitButton'
import TextInput from '@Components/TextInput'
import Toast, { ToastType } from '@Components/Toast'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import useImagePicker from '@Hooks/useImagePicker'
import useCameraPermission from '@Hooks/usePermission'
import { Formik } from 'formik'
import React, { useRef, useState } from 'react'
import { Dimensions } from 'react-native'
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

const ImageView = styled.View`
  align-items: center;
  height: 200px;
  margin-bottom: 20px;
`

const BannerImage = styled.Image`
  height: 200px;
  width: ${Dimensions.get('window').width}px;
`

const FormView = styled.View`
  margin-left: 20px;
  margin-right: 20px;
`

export default ({ setLoading }: AddRestaurantFormProps) => {
  const toastRef = useRef<ToastType>()
  const [visible, setVisible] = useState(false)
  const handleDismiss = () => setVisible(false)
  const handleOpen = () => setVisible(true)
  const [mapLocation, setMapLocation] = useState(null)

  const { images, openLibrary, removeImage } = useImagePicker({
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
      <ImageView>
        <BannerImage
          source={images.length > 0 ? { uri: images[0].uri } : NoImage}
        />
      </ImageView>
      <ViewImage horizontal>
        <TouchableOpacity onPress={request}>
          <SquareAvatar icon="camera" size={100} />
        </TouchableOpacity>
        {images.map(({ uri }) => (
          <TouchableOpacity key={uri} onPress={() => removeImage(uri)}>
            <Miniature source={{ uri }} size={100} />
          </TouchableOpacity>
        ))}
      </ViewImage>
      <Formik
        initialValues={{
          name: '',
          location: '',
          description: ''
        }}
        onSubmit={() => {
          console.log('Adding restaurants')
        }}>
        {({ handleChange, handleSubmit, values, errors, touched }) => (
          <FormView>
            <TextInput
              value={values.name}
              error={errors.name && touched.name}
              mode="outlined"
              label={errors.name ? errors.name : 'Restaurant name'}
              onChangeText={handleChange('name')}
            />
            <TextInput
              value={values.location}
              error={errors.location && touched.location}
              mode="outlined"
              label={errors.location ? errors.location : 'Location'}
              onChangeText={handleChange('location')}
            />
            <MaterialCommunityIcons
              onPress={handleOpen}
              name="google-maps"
              size={20}
              color={mapLocation ? '#00a680' : '#c2c2c2'}
            />
            <TextInput
              value={values.description}
              error={errors.description && touched.description}
              mode="outlined"
              label={errors.description ? errors.description : 'Description'}
              multiline
              onChangeText={handleChange('description')}
            />
            <SubmitButton onPress={handleSubmit}>Add</SubmitButton>
          </FormView>
        )}
      </Formik>
      <Map
        visible={visible}
        handleDismiss={handleDismiss}
        handleMapLocation={location => setMapLocation(location)}
      />
      <Toast position="center" opacity={0.5} ref={toastRef} />
    </>
  )
}
