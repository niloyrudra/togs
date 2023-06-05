import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'

// Components
import FeedImageTitleComponent from './FeedImageTitleComponent';
import MetaWidgetComponent from './MetaWidgetComponent';

// Constants
import colors from '../constants/colors';
import fonts from '../constants/fonts';

const HomeFeedCardComponent = ({item, style=null}) => {
  return (
    <TouchableOpacity
        style={{
            backgroundColor: colors.white,
            borderRadius: 7,
            margin: 8,
            width: 230, // 229
            overflow: 'hidden',

            elevation: 5,
            shadowColor: colors.shadowColor,
            shadowRadius: 5,
            shadowOffset: 5,
            shadowOpacity: 5,

            ...style
        }}
    >
        <Image
            source={item.banner}
            style={{
            width: '100%',
            height: 128
            }}
        />

        {/* Content */}
        <View style={styles.container}>

            <View style={{...styles.content, marginBottom: 10, justifyContent: 'space-between'}}>

                {/* Title */}
                <FeedImageTitleComponent title={item.title} img={item.author.img}  />

                {/* Price */}
                <View style={styles.content}>
                    <Text style={styles.price}>${item.price}</Text>
                </View>

            </View>

            <View style={{...styles.content, gap: 15}}>
                <MetaWidgetComponent location={item.date} iconName="clock" />
                <MetaWidgetComponent location={item.location} iconName="location-pin" />
            </View>

        </View>
    </TouchableOpacity>
  )
}

export default HomeFeedCardComponent

const styles = StyleSheet.create({
    container:{
        paddingVertical: 10,
        paddingHorizontal: 15
    },
    content: {
        flexDirection:"row",
        gap:6,
        alignItems:"center"
    },
    price: {
        color: colors.textGreen,
        fontSize: 14,
        fontWeight: '700',
        fontFamily: fonts.bold
    }
})