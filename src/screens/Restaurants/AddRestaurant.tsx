import Loading from '@Components/Loading'
import SubmitButton from '@Components/SubmitButton'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { RestaurantStackNavigationProp } from '@Navigation/tabs/tabs'
import { useNavigation } from '@react-navigation/native'
import { Formik } from 'formik'
import React, { useRef, useState } from 'react'
import { ScrollView, View } from 'react-native'
import Toast from 'react-native-easy-toast'
import { Surface } from 'react-native-paper'
import styled from 'styled-components/native'

const ViewImage = styled.View`
  flex-direction: row;
  margin-left: 20px;
  margin-right: 20px;
  margin-top: 30px;
`

const Miniature = styled(Surface)`
  width: 70px;
  height: 70px;
  margin-right: 10px;
  align-items: center;
  justify-content: center;
`

const UploadImage = ({ imagesSelected, setImagesSelected }) => {
  return (
    <ViewImage>
      <MaterialCommunityIcons
        name="camera"
        color="#7a7a7a"
        onPress={() => {
          console.log('Image added')
        }}
        size={30}
      />
    </ViewImage>
  )
}

export default () => {
  const { navigate } = useNavigation<RestaurantStackNavigationProp>()
  const toastRef = useRef()
  const [isLoading, setIsLoading] = useState(false)
  const [imagesSelected, setImagesSelected] = useState([])

  return (
    <ScrollView>
      <UploadImage
        imagesSelected={imagesSelected}
        setImagesSelected={setImagesSelected}
      />
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
      <Toast ref={toastRef} position="center" opacity={0.5} />
      <Loading isVisible={isLoading} />
    </ScrollView>
  )
}
