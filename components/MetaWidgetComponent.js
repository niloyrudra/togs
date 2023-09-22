import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

// Components
import { SimpleLineIcons } from '@expo/vector-icons'

// Constants
import colors from '../constants/colors'

const MetaWidgetComponent = ( {iconName, location } ) => {
  return (
    <View style={styles.content}>
        <SimpleLineIcons name={iconName} size={12} color={colors.infoColor} />
        <Text style={styles.info}>{location}</Text>
    </View>
  )
}

export default MetaWidgetComponent

const styles = StyleSheet.create({
    content: {
        flexDirection:"row",
        gap:6,
        alignItems:"center"
    },
    info: {
        color: colors.infoColor,
        fontSize: 12,
        fontWeight: '500'
    }
})