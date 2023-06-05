import { StyleSheet, Text } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import fonts from '../constants/fonts'
import colors from '../constants/colors'

const ViewAllComponent = () => {
  return (
    <TouchableOpacity
      onPress={() => console.log("VIEW ALL EVENTS")}
    >
      <Text style={styles.viewAllText}>View All</Text>
    </TouchableOpacity>
  )
}

export default ViewAllComponent

const styles = StyleSheet.create({
  viewAllText:{
    fontSize: 12,
    fontFamily: fonts.regular,
    lineHeight: 12,
    fontWeight: '500',
    color: colors.textColor
  }
})