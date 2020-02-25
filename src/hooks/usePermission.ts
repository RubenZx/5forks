import * as Permissions from 'expo-permissions'

type CameraPermissionArgs = {
  onRequest: (status: Permissions.PermissionStatus) => void
}

type LocationPermissionArgs = {
  onRequest: (status: Permissions.PermissionStatus) => void
}

const useCameraPermission = ({ onRequest }: CameraPermissionArgs) => {
  const request = async () => {
    const result = await Permissions.askAsync(Permissions.CAMERA_ROLL)
    onRequest(result.permissions.cameraRoll.status)
  }
  return { request }
}

export const useLocationPermission = ({
  onRequest
}: LocationPermissionArgs) => {
  const request = async () => {
    const result = await Permissions.askAsync(Permissions.LOCATION)
    onRequest(result.permissions.location.status)
  }
  return { request }
}

export default useCameraPermission
