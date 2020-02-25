import Modal from '@Components/Modal'
import { useLocationPermission } from '@Hooks/usePermission'
import * as Location from 'expo-location'
import React, { useEffect, useRef, useState } from 'react'
import MapView, { Marker, Region } from 'react-native-maps'
import { Button } from 'react-native-paper'
import styled from 'styled-components/native'
import Toast, { ToastType } from './Toast'

const MyMap = styled(MapView)`
  width: 100%;
  height: 550px;
`

const MapBtnView = styled.View`
  flex-direction: row;
  justify-content: center;
  margin-top: 10px;
`

const SaveMapButton = styled(Button)`
  margin-right: 5px;
`

const DismissMapButton = styled(Button)`
  margin-left: 5px;
`

type MapProps = {
  visible: boolean
  handleDismiss: () => void
  handleMapLocation: (region: Region) => void
}

export default ({ visible, handleDismiss, handleMapLocation }: MapProps) => {
  const ref = useRef<ToastType>()
  const [location, setLocation] = useState<Region>(null)

  const { request } = useLocationPermission({
    onRequest: async status => {
      if (status === 'denied') {
        console.log('denied!!')
      } else if (status === 'granted') {
        const loc = await Location.getCurrentPositionAsync({})
        setLocation({
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
          latitudeDelta: 0.001,
          longitudeDelta: 0.001
        })
      }
    }
  })

  useEffect(() => {
    if (visible) {
      ;(async () => await request())()
    }
  }, [visible])

  const confirmLocation = () => {
    handleMapLocation(location)
    ref.current.show('Location saved correctly')
    handleDismiss()
  }
  return (
    <Modal visible={visible} handleDismiss={handleDismiss}>
      {location && (
        <MyMap
          initialRegion={location}
          showsUserLocation
          onRegionChange={region => setLocation(region)}>
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude
            }}
            draggable
          />
        </MyMap>
      )}
      <MapBtnView>
        <SaveMapButton mode="contained" onPress={confirmLocation}>
          Save location
        </SaveMapButton>
        <DismissMapButton
          mode="contained"
          color="#a60d0d"
          onPress={handleDismiss}>
          Dismiss
        </DismissMapButton>
      </MapBtnView>
      <Toast position="center" opacity={0.5} ref={ref} />
    </Modal>
  )
}
