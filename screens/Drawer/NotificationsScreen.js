import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const NotificationsScreen = () => {
  return (
    <View style={styles.container}>
      <Text>NotificationsScreen</Text>
    </View>
  )
}

export default NotificationsScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:"center",
    alignItems:"center",
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
})