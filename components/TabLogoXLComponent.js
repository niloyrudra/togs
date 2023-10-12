import { Image } from 'react-native'
import React from 'react'

const TabLogoXLComponent = ({style=null}) => (
    <Image
        source={require( '../assets/logo/logoXL.png' )} // logo-xl.png
        style={ style ? {...style} : {
            width: 95,
            // height: 36
            resizeMode: 'contain',
        }}
        fadeDuration={300}
    />
);

export default TabLogoXLComponent;