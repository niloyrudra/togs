import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

// Components
import ButtonComponent from "./ButtonComponent"

// Constants
import fonts from '../constants/fonts';
import colors from '../constants/colors'
import sizes from '../constants/sizes'

const NotificationsListCardComponent = ({item}) => (
    <TouchableOpacity
        style={styles.list}
        onPress={() => {}}
    >
        <View
            style={{
            flex:1,
            }}
        >

            <View
            style={{
                flex:1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: "flex-start"
            }}
            >
            <View>
                <Text style={styles.title}>{item?.title ?? 'Anonymous'}</Text>
                <Text style={styles.message}>{item?.message}</Text>
            </View>

            <Text style={styles.date}>{item?.date}</Text>

            </View>

        </View>
        
    </TouchableOpacity>
);


export default NotificationsListCardComponent;

const styles = StyleSheet.create({
    list: {
      marginVertical: 5,
      borderRadius: 10,
      marginHorizontal: 4,
      paddingVertical: 6,
      paddingHorizontal: 16,
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
    title: {
      fontFamily: fonts.bold,
      fontSize: sizes.fontSubTitle,
      fontWeight: '800',
      color: colors.secondaryColor
    },
    message: {
      fontFamily: fonts.italic,
      fontSize: sizes.fontText,
      fontWeight: '600',
      color: colors.infoColor
    },
    date: {
      fontFamily: fonts.italic,
      fontSize: 12,
      color: colors.infoColor
    }
 });