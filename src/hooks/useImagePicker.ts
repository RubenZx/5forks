import * as ImagePicker from 'expo-image-picker'
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
  return { openLibrary, images }
}

export default useImagePicker
