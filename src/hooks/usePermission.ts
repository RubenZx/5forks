import * as Permissions from 'expo-permissions'

type CameraPermissionArgs = {
  onRequest: (status: Permissions.PermissionStatus) => void
}

const useCameraPermission = ({ onRequest }: CameraPermissionArgs) => {
  const request = async () => {
    const result = await Permissions.askAsync(Permissions.CAMERA_ROLL)
    onRequest(result.permissions.cameraRoll.status)
  }
  return { request }
}

export default useCameraPermission
