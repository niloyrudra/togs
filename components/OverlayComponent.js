import { Image } from 'react-native'
import React from 'react'

const OverlayComponent = ({style=null}) => {
  return (
    <>
      <Image
        source={require('../assets/bg/overlay/overlay.png')}
        style={{ position: "absolute", ...style}}
      />
    </>
  )
}

export default OverlayComponent