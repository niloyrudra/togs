import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import colors from '../constants/colors'
import fonts from '../constants/fonts'
import sizes from '../constants/sizes'

const ButtonIconComponent = ( { label, icon, bgColor = colors.primaryColor, color=colors.white, enableShadow=null, onPress } ) => {
  return (
    <TouchableOpacity
        style={enableShadow ? { backgroundColor: bgColor, ...styles.button, ...styles.shadow } : { backgroundColor: bgColor, ...styles.button }}
        onPress={onPress}
    >
        {icon && icon}
        <Text
            style={{
                fontFamily: fonts.medium,
                fontSize: sizes.fontText,
                color: color,
                fontWeight: '500',

            }}
        >
            { label && label }
        </Text>
    </TouchableOpacity>
  )
}

export default ButtonIconComponent

const styles = StyleSheet.create({
    button: {
        borderRadius: 42,
        height: 52,
        flexDirection: "row",
        gap: 15,
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