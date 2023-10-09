import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'

// Components
import DefaultUserAvatarComponent from './DefaultUserAvatarComponent';
import UserAvatarComponent from './UserAvatarComponent';

// Constants
import fonts from '../constants/fonts';
import colors from '../constants/colors'
import sizes from '../constants/sizes'

const PeopleMetRectangularCardComponent = ({item, onPress}) => (
    <TouchableOpacity
        style={styles.list}
        onPress={onPress}
    >
        <View style={styles.cardContainer}>
            {
                item?.photoURL ?
                    (<UserAvatarComponent source={{uri: item.photoURL}} style={styles.thumb} />)
                    :
                    (<DefaultUserAvatarComponent style={styles.thumb} />)
            }
            <View>
                <Text style={styles.userName}>{item?.displayName ?? 'Anonymous'}</Text>
                <Text style={styles.email}>{item?.email}</Text>
            </View>
        </View>
    </TouchableOpacity>
);


export default PeopleMetRectangularCardComponent;

const styles = StyleSheet.create({
    list: {
        marginVertical: 5,
        borderRadius: 10,
        marginHorizontal: 4,
        padding: 6,
        backgroundColor: colors.white,
        
        shadowColor: colors.shadowColor,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.15,
        shadowRadius: 3.84,

        elevation: 3,
    },
    cardContainer: {
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"flex-start"
    },
    thumb: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 20
    },
    userName: {
        fontFamily: fonts.bold,
        fontSize: sizes.fontSubTitle,
        fontWeight: '800',
        color: colors.secondaryColor
    },
    email: {
        fontFamily: fonts.italic,
        fontSize: sizes.fontText,
        fontWeight: '600',
        color: colors.infoColor
    }
});