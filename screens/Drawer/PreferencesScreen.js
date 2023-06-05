import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const PreferencesScreen = () => {
  return (
    <View style={styles.container}>
      <Text>PreferencesScreen</Text>
    </View>
  )
}

export default PreferencesScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:"center",
    alignItems:"center",
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
})