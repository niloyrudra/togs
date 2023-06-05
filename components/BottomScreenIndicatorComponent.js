import { StyleSheet, Image, View } from 'react-native'
import React from 'react'

const BottomScreenIndicatorComponent = () => {
  return (
    <View
        style={{
            // paddingTop: 50,
            // paddingBottom: 15,
            flex:1,
            justifyContent: 'flex-end',
            alignItems: 'center'
            // backgroundColor:"red"
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