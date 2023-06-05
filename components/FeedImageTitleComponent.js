import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

// Constants
import colors from '../constants/colors'
import fonts from '../constants/fonts'

const FeedImageTitleComponent = ({title, img}) => {
  return (
    <View style={styles.content}>
        <Image
        source={img}
        style={styles.image}
        />
        <Text style={styles.title}>{title}</Text>
    </View>
  )
}

export default FeedImageTitleComponent

const styles = StyleSheet.create({
    content: {
        flexDirection:"row",
        gap:12,
        alignItems:"center"
    },
    image: {
        width: 36,
        height: 36
    },
    title: {
        color: colors.dark,
        fontSize: 16,
        fontWeight: '600',
        fontFamily: fonts.regular
    }
})