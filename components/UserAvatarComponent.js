import { Image, View } from 'react-native'
import React from 'react'

const UserAvatarComponent = ({source=null, style=null, key=null}) => {
    if(!source) return (<View />);

    return (<Image
        source={source}
        style={style ? {...style} : {
            width: 72,
            height: 72,
            borderRadius: 36,
        }}
    />)
}

export default UserAvatarComponent