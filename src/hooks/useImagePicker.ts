import * as ImagePicker from 'expo-image-picker'
import * as R from 'ramda'
import { useState } from 'react'

type ImagePickerArgs = {
  onCancel: () => void
  options: ImagePicker.ImagePickerOptions
}

const useImagePicker = ({ onCancel, options }: ImagePickerArgs) => {
  const [images, setImages] = useState<
    Exclude<ImagePicker.ImagePickerResult, { cancelled: true }>[]
  >([])

  const openLibrary = async () => {
    const result = await ImagePicker.launchImageLibraryAsync(options)
    if (result.cancelled === true) {
      onCancel()
      return
    }
    setImages(prev => [...prev, result])
  }

  const removeImage = (uri: string) => {
    setImages(R.reject(image => image.uri === uri))
  }

  return { openLibrary, images, removeImage }
}

export default useImagePicker
