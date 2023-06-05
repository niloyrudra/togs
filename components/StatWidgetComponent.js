import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Image } from 'react-native'

const getWidgetIcon = ( iconName ) => {
    switch( iconName ) {
        case 'heart' :
            return require('../assets/icons/widget/heart.png')
            break;
        case 'message' :
            return require('../assets/icons/widget/message.png')
            break;
        case 'export' :
            return require('../assets/icons/widget/export.png')
            break;
    }
}

const StatWidgetComponent = ({count, iconName }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.count}>{count}</Text>
      <Image
        source={getWidgetIcon(iconName)}
        style={styles.icon}
      />
    </View>
  )
}

export default StatWidgetComponent

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        gap: 12
    },
    count: {
        fontSize: 16,
        fontWeight: '400'
    },
    icon: {
        width: 20,
        height: 20
    }
})