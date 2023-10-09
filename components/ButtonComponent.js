import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import colors from '../constants/colors'
import fonts from '../constants/fonts'
import sizes from '../constants/sizes'

const ButtonComponent = ( { label, style=null, disabled=false, onPress, bgColor = colors.primaryColor, color=colors.white, enableShadow=null } ) => {
  return (
    <TouchableOpacity
        style={enableShadow ? { backgroundColor: bgColor, ...styles.button, ...styles.shadow, ...style, opacity: disabled ? 0.5 : 1 } : { backgroundColor: bgColor, ...styles.button, ...style, opacity: disabled ? 0.5 : 1 }}
        onPress={onPress}
        disabled={disabled}
    >
        <Text
            style={{
                fontFamily: fonts.medium,
                fontSize: sizes.fontText,
                color: color,
                fontWeight: '500',
            }}
        >
            {label}
        </Text>
    </TouchableOpacity>
  )
}

export default ButtonComponent

const styles = StyleSheet.create({
    button: {
        borderRadius: 42,
        height: 52,
        justifyContent: 'center',
        alignItems: "center",
        marginVertical: 12,
    },
    shadow: {
        elevation: 4,
        shadowColor: colors.shadowColor,
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
    }
})