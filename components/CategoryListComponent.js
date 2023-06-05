import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native'
import React from 'react'

import { Ionicons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';


import colors from '../constants/colors';

const CAT_LIST = [
    {id:1, name:"All", icon:""},
    {id:2, name:"Baseball", icon:"baseball"},
    {id:3, name:"Basketball", icon:"basketball"},
    {id:4, name:"Cricket", icon:"cricket"},
    {id:5, name:"Football AUS", icon:"football-australian"},
    {id:6, name:"Football US", icon:"american-football"},
    {id:7, name:"Soccer", icon:"football"}, // md-football/football
    {id:8, name:"Tennis", icon:"tennisball"},
    {id:9, name:"Volleyball", icon:"volleyball-ball"},
];

const renderIcon = ( icon ) => {
    switch( icon ) {
        case 'basketball' :
        case 'tennisball' :
        case 'baseball' :
        case 'football' :
        case 'md-football' :
        case 'american-football' :
            return ( <Ionicons name={icon} size={20} color={colors.infoColor} /> );
            break;
        case 'football-australian' :
        case 'cricket' :
            return ( <MaterialCommunityIcons name={icon} size={20} color={colors.infoColor} /> );
            break;
        case 'volleyball-ball' :
            return ( <FontAwesome5 name={icon} size={20} color={colors.infoColor} /> );
            break;
    }
}

const CategoryListComponent = () => {
  return (
    <>
      <FlatList
        data={CAT_LIST}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
            <TouchableOpacity
                style={{
                    paddingVertical: 6,
                    paddingHorizontal: 10,
                    marginLeft: 6,
                    // height: 26,
                    borderRadius: 26,
                    borderWidth: 1,
                    borderColor: colors.infoColor,
                    flexDirection: "row",
                    // justifyContent: 'space-between',
                    alignItems: "center",
                    gap: 6
                }}
            >
                {
                    item.icon && renderIcon( item.icon )
                }
                <Text
                    style={{
                        color: colors.infoColor
                    }}
                >{item.name}</Text>
            </TouchableOpacity>
        )}
      />
    </>
  )
}

export default CategoryListComponent

const styles = StyleSheet.create({})