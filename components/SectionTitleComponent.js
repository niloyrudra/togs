import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import fonts from '../constants/fonts'
import colors from '../constants/colors'

const SectionTitleComponent = ({label}) => {
  return (
    <View style={styles.titleContainer}>
      <Text style={styles.title}>{label}</Text>
    </View>
  )
}

export default SectionTitleComponent

const styles = StyleSheet.create({
    titleContainer:{
        marginBottom: 10
    },
    title:{
        fontFamily: fonts.bold,
        fontSize: 18,
        lineHeight: 18,
        color: colors.dark,
        fontWeight: '700'
    }
})