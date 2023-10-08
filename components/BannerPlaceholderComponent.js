import { Image } from 'react-native'
import React from 'react'

const BannerPlaceholderComponent = ({source=null, style=null}) => (<Image source={source ? {uri: source} : require('../assets/bg/no-image.jpg')} fadeDuration={300} style={style} />);

export default BannerPlaceholderComponent