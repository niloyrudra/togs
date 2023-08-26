import { StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
// Icons
import { Ionicons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';

// Utils
import { getCatList } from '../utils/utils';

// Constants
import colors from '../constants/colors';

// Context
import { useTogsContext } from '../providers/AppProvider';

const CAT_LIST = getCatList();

const renderIcon = ( icon ) => {
    switch( icon ) {
        case 'basketball' :
        case 'tennisball' :
        case 'baseball' :
        case 'football' :
        case 'md-football' :
        case 'american-football' :
            return ( <Ionicons name={icon} size={20} color={colors.dark} /> );
            break;
        case 'football-australian' :
        case 'yoga' :
        case 'cricket' :
            return ( <MaterialCommunityIcons name={icon} size={20} color={colors.dark} /> );
            break;
        case 'volleyball-ball' :
            return ( <FontAwesome5 name={icon} size={20} color={colors.dark} /> );
            break;
    }
}

const CategoryListComponent = ({filterRef}) => {

    const {onFilteredEventList} = useTogsContext()

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
                    borderColor: colors.dark,
                    flexDirection: "row",
                    // justifyContent: 'space-between',
                    alignItems: "center",
                    gap: 6
                }}
                onPress={() => {
                    onFilteredEventList( item?.name?.toLocaleLowerCase() )
                    filterRef.current = item?.name?.toLocaleLowerCase()
                }}
            >
                {
                    item.icon && renderIcon( item.icon )
                }
                <Text
                    style={{
                        color: colors.dark
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