import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const LanguagesScreen = () => {
  return (
    <View style={styles.container}>
      <Text>LanguagesScreen</Text>
    </View>
  )
}

export default LanguagesScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:"center",
    alignItems:"center",
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
})