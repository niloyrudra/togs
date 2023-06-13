import { StyleSheet, Text } from 'react-native'
import React from 'react'
import { Image } from 'react-native'
import { TouchableOpacity } from 'react-native'

import { getWidgetIcon } from '../utils/utils'

const StatWidgetComponent = ({count=null, iconName, style=null, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
    >
      {count != null && (<Text style={styles.count}>{count}</Text>)}
      <Image
        source={getWidgetIcon(iconName)}
        style={{...styles.icon, ...style}}
      />
    </TouchableOpacity>
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