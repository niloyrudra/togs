import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

// Constants
import colors from '../constants/colors'
import fonts from '../constants/fonts'

const FeedImageTitleComponent = ({title, img=null}) => {
    // console.log(img)
  return (
    <View style={styles.content}>
        {img ?
            (
                <Image
                    source={{ uri: img}}
                    style={styles.image}
                />
            )
            :
            (
                <Image
                    source={require('../assets/user/user-icon-3.png')}
                    style={styles.image}
                />
            )
        }
        <Text style={styles.title}>{title?.substr(0,11)}{title?.length > 12 ? '...' : ''}</Text>
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
        height: 36,
        borderRadius: 18
    },
    title: {
        color: colors.dark,
        fontSize: 16,
        fontWeight: '600',
        fontFamily: fonts.regular
    }
})