import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'

// Components
import ButtonComponent from "./ButtonComponent"
import DefaultUserAvatarComponent from './DefaultUserAvatarComponent';

// Constants
import fonts from '../constants/fonts';
import colors from '../constants/colors'
import sizes from '../constants/sizes'

const PeopleMetRectangularCardComponent = ({item, onPress}) => (
    <TouchableOpacity
        style={styles.list}
        onPress={onPress}
    >
        <View
            style={{
                flexDirection:"row",
                alignItems:"center",
                justifyContent:"flex-start"
            }}
        >
            {
                item?.photoURL ?
                    (
                        <Image
                            source={{uri: item.photoURL}}
                            style={{
                                width: 40,
                                height: 40,
                                borderRadius: 20,
                                marginRight: 20
                            }}
                        />
                    )
                    :
                    (
                        <DefaultUserAvatarComponent
                            style={{
                                width: 40,
                                height: 40,
                                borderRadius: 20,
                                marginRight: 20
                            }}
                        />
                    )
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