import { View, Image } from 'react-native'
import React from 'react'

const DefaultUserAvatarComponent = ({style=null}) => {
  return (
    <View>
      <Image
        source={require('../assets/user/avatar.png')}
        style={{
            width: 72,
            height: 72,
            borderRadius: 36,
            ...style
        }}
      />
    </View>
  )
}

export default DefaultUserAvatarComponent