import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

// Constants
import colors from '../constants/colors'
import fonts from '../constants/fonts'
import sizes from '../constants/sizes'

const TitleComponent = ({ label }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {label}
      </Text>
    </View>
  )
}

export default TitleComponent

const styles = StyleSheet.create({
    container: {
        marginBottom: 8
    },
    title: {
        fontFamily: fonts.bold,
        fontWeight: '700',
        fontSize: sizes.fontTitle,
        color: colors.dark
    }
})