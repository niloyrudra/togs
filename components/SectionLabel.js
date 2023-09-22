import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import fonts from '../constants/fonts'

const SectionLabel = ({label}) => {
    return (<View
        style={{
            backgroundColor: '#F3F4F6',
            paddingHorizontal: 20,
            paddingVertical: 15,
        }}
    >
        <Text
            style={{
                fontSize: 12,
                fontFamily: fonts.bold,
                fontWeight: '700',
                color: "#9CA3AF",
                textTransform: "uppercase"
            }}
        >{label}</Text>
    </View>)
}

export default SectionLabel

const styles = StyleSheet.create({})