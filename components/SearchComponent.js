import { StyleSheet, TextInput, View, Image } from 'react-native'
import React from 'react'

import colors from '../constants/colors'

const SearchComponent = () => {
    const [searchTerm, setSearchTerm] = React.useState('')

  // Handlers
  const onChangeHandler = ( value ) => {
    setSearchTerm( prevVal => prevVal = value)
  }

  return (
    <View>
        <View
        style={styles.searchContainer}
      >
        <Image
          source={require('../assets/icons/search-normal.png')}
          style={{
            width:20,
            height:20,
            position: 'absolute',
            top: 10,
            left: 32,
            zIndex: 1000
          }}
        />
        <TextInput
          style={styles.searchInput}
          onChangeText={onChangeHandler}
          value={searchTerm}
          placeholder="Search for sport"
          placeholderTextColor={colors.textColor}
        />
      </View>
    </View>
  )
}

export default SearchComponent

const styles = StyleSheet.create({
    searchContainer: {
        paddingBottom: 10,
        paddingHorizontal: 20,
        backgroundColor: colors.dark
    },
    searchInput: {
        width: '100%',
        height: 42,
        backgroundColor: '#2B2D2E',
        borderRadius: 7,
        paddingVertical: 14,
        paddingLeft: 47,
        paddingRight: 14,
        color: colors.textColor
    }
})