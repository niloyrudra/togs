import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const HelpScreen = () => {
  return (
    <View style={styles.container}>
      <Text>HelpScreen</Text>
    </View>
  )
}

export default HelpScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:"center",
    alignItems:"center",
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
})