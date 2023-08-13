import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

// Constants
import colors from '../constants/colors'
import sizes from '../constants/sizes'

const NoDataNoticeComponent = ({label, message=null}) => {
  return (
        <View
            style={{
                margin: 20
            }}
        >
            <Text
                style={{
                color: colors.infoColor,
                fontSize: sizes.label
                }}
            >{ message ? message : 'No '+label+' available now. Please try later!'}</Text>
        </View>
  )
}

export default NoDataNoticeComponent

const styles = StyleSheet.create({})