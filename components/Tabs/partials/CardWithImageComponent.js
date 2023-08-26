import { StyleSheet, Image, View } from 'react-native'
import React from 'react'

// Constants
import colors from '../../../constants/colors'

const CardWithoutImageComponent = ({image}) => {
  return (
        <View
            style={{
                flexGrow:1,
                // shadow
                elevation: 4,
                shadowColor: colors.shadowColor,
                shadowOffset: {width: -2, height: 4},
                shadowOpacity: 0.5,
                shadowRadius: 3,

                margin:2
            }}
        >
            <Image
            source={{uri:image}}
            style={{
                flexGrow:1,
                width: '100%',
                height: '100%',
                maxWidth: 120,
                maxHeight: 120,
                borderRadius: 8,
            }}
            />
        </View>
  )
}

export default CardWithoutImageComponent

const styles = StyleSheet.create({})