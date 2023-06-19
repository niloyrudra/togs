import { StyleSheet, Text } from 'react-native'
import React from 'react'
import { Image } from 'react-native'
import { TouchableOpacity } from 'react-native'

import { getWidgetIcon } from '../utils/utils'
import colors from '../constants/colors'
import fonts from '../constants/fonts'

const StatWidgetComponent = ({count=null, iconName, style=null, onPress, counterBelow=false }) => {
  return (
    <TouchableOpacity
      style={ counterBelow ? {...styles.container2} : {...styles.container}}
      onPress={onPress}
    >
      {count != null && (<Text style={ counterBelow ? {...styles.count2} : {...styles.count}}>{count}</Text>)}
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
    container2: {
      flexDirection: "column-reverse",
      alignItems:"center",
      gap: 0
    },
    count: {
      fontSize: 16,
      fontWeight: '400'
    },
    count2: {
      fontSize: 12,
      fontWeight: '800',
      fontFamily: fonts.bold,
      color: colors.tabInactiveTint,
    },
    icon: {
      width: 20,
      height: 20
    }
})