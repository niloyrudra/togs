import { StyleSheet, Image, View } from 'react-native'
import React from 'react'

const BottomScreenIndicatorComponent = () => {
  return (
    <View
      style={{
        flex:1,
        justifyContent: 'flex-end',
        alignItems: 'center'
      }}
    >
      <Image
        source={require('../assets/indicator/indicator.png')}
      />
    </View>
  )
}

export default BottomScreenIndicatorComponent

const styles = StyleSheet.create({})