import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

// Constants
import colors from '../../../constants/colors'
import fonts from '../../../constants/fonts'

const CardWithoutImageComponent = ({title}) => {
  return (
        <View
            style={{
                flex:1,
                maxWidth: '100%',
                minHeight: 75,
                borderRadius: 15,
                backgroundColor: colors.secondaryColor,
                justifyContent:"center",
                alignItems:"center"
            }}
        >
            <Text style={{color:colors.white,fontWeight:'800',fontFamily:fonts.bold}}>{title ?? 'Anonymous Post'}</Text>
        </View>
  )
}

export default CardWithoutImageComponent

const styles = StyleSheet.create({})