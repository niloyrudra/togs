import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'

// Components
import ButtonComponent from "./ButtonComponent"

// Constants
import fonts from '../constants/fonts';
import colors from '../constants/colors'
import sizes from '../constants/sizes'

const EventRectagularCardComponent = ({item}) => (
    <TouchableOpacity
        style={styles.list}
        onPress={() => {
            navigation.navigate("EventScreen", {event: item, prevScreen: 'EventList'})
        }}
        >
        <View
            style={{
                flexDirection:"row",
                alignItems:"center",
                justifyContent:"flex-start"
            }}
        >
            {
                item?.image ?
                    (
                        <Image
                            source={{uri: item.image}}
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
                        <DefaultUserAvatarComponent style={{width:40,height:40,marginRight:20}} />
                    )
            }
            <View>
                <Text style={styles.services}>{item?.title ?? 'Anonymous'}</Text>
                <Text style={styles.activities}>{item?.activities}</Text>
            </View>
        </View>
    </TouchableOpacity>
);


export default EventRectagularCardComponent;

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
    services: {
      fontFamily: fonts.bold,
      fontSize: sizes.fontSubTitle,
      fontWeight: '800',
      color: colors.secondaryColor
    },
    activities: {
      fontFamily: fonts.italic,
      fontSize: sizes.fontText,
      fontWeight: '600',
      color: colors.infoColor
    }
});