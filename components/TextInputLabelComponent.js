import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

// Constants
import colors from '../constants/colors'
import fonts from '../constants/fonts'
import sizes from '../constants/sizes'

const TextInputLabelComponent = ({ label }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {label}
      </Text>
    </View>
  )
}

export default TextInputLabelComponent

const styles = StyleSheet.create({
    container: {
        marginBottom: 8
    },
    title: {
        fontFamily: fonts.bold,
        fontWeight: '600',
        fontSize: sizes.label,
        color: colors.dark,
        fontStyle: 'normal'
    }
})