import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'

// Components
import FeedImageTitleComponent from './FeedImageTitleComponent';
import MetaWidgetComponent from './MetaWidgetComponent';

// Constants
import colors from '../constants/colors';
import fonts from '../constants/fonts';
import { useNavigation } from '@react-navigation/native';

const HomeFeedCardComponent = ({item, style=null}) => {
    const navigation = useNavigation()
  return (
    <TouchableOpacity
        key={Math.random().toString()}
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

        onPress={() => navigation.navigate('EventScreen', {event: item,  prevScreen: 'Home'})}
    >
        {
            item.image ?
                (
                    <Image
                        source={{uri: item.image}}
                        style={{
                        width: '100%',
                        height: 128
                        }}
                    />
                )
                :
                (
                    <View
                        style={{
                            width: '100%',
                            height: 128,
                            backgroundColor: colors.secondaryColor
                        }}
                    />
                )
        }


        {/* Content */}
        <View style={styles.container}>

            <View style={{...styles.content, marginBottom: 10, justifyContent: 'space-between'}}>

                {/* Title */}
                <FeedImageTitleComponent title={item?.creator?.name} img={item?.creator?.photoURL}  />

                {/* Price */}
                <View style={styles.content}>
                    <Text style={styles.price}>${item?.price ?? '0.00'}</Text>
                </View>

            </View>

            <View style={{...styles.content, gap: 15}}>
                <MetaWidgetComponent location={item.startDate} iconName="clock" />
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