import React from 'react'
import { Image, TouchableOpacity } from 'react-native'

const DrawerMenuButtonComponent = ({onPress}) => {
    return (
        <TouchableOpacity
            style={{
                paddingRight: 20
            }}
            onPress={onPress}
        >
            <Image
                source={require( '../assets/icons/setting.png' )}
                style={{
                    width: 20,
                    height: 20
                }}
            />
        </TouchableOpacity>

    );
}

export default DrawerMenuButtonComponent;