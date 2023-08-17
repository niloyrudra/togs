import { Image } from 'react-native'
import React from 'react'

const AppLogoComponent = ({style=null}) => {
  return (
    <>
      <Image
            source={require( '../assets/logo/logo-xl.png' )}
            style={{
                width: 95,
                height: 36,
                ...style
            }}
        />
    </>
  )
}

export default AppLogoComponent