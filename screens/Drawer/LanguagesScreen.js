import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar';

const LanguagesScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar
        style="light"
      />
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