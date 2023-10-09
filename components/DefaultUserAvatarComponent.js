import { View, Image } from 'react-native'
import React from 'react'

const DefaultUserAvatarComponent = ({style=null, key=null}) => {
  return (
    <View key={key}>
      <Image
        source={require('../assets/user/avatar-alt.jpg')}
        style={ style ? {...style} : {
            width: 72,
            height: 72,
            borderRadius: 36
        }}
      />
    </View>
  )
}

export default DefaultUserAvatarComponent