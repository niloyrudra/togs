import { Image } from 'react-native'
import React from 'react'

const DefaultBannerPlaceholderComponent = ({style=null}) => (<Image source={require('../assets/bg/no-image.jpg')} style={{...style}} />);

export default DefaultBannerPlaceholderComponent