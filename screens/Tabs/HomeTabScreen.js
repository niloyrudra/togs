import { StyleSheet, View, SafeAreaView, ScrollView } from 'react-native'
import React from 'react'

// Components
import SearchComponent from '../../components/SearchComponent'
import CategoryListComponent from '../../components/CategoryListComponent'
import EventListComponent from '../../components/EventListComponent'
import ElementListComponent from '../../components/ElementListComponent'

// Constants
import colors from '../../constants/colors'
import sizes from '../../constants/sizes'

const HomeTabScreen = ({ navigation }) => {
  const [searchTerm, setSearchTerm] = React.useState('')

  // Handlers
  const onChangeHandler = ( value ) => {
    setSearchTerm( prevVal => prevVal = value)
  }

  console.log(navigation.getParent())
  console.log(navigation.getState())

  return (
    <SafeAreaView style={styles.mainContainer} mode="margin" edges={['right', 'bottom', 'left']} >

      {/* Search Bar */}
      <SearchComponent onChangeText={onChangeHandler} />

      {/* Category Section */}
      <View style={styles.catContainer}>
        <CategoryListComponent />
      </View>

      {/* Body Content */}
      <ScrollView style={styles.container}>

        {/* Popular Events */}
        <EventListComponent label="Popular Events">
          <ElementListComponent/>
        </EventListComponent>

        {/* Nearby Events */}
        <EventListComponent label="Nearby Events">
          <ElementListComponent style={{transform: [{scale: 0.9}], marginHorizontal: -4, marginTop: -4 }} />
        </EventListComponent>

      </ScrollView>


    </SafeAreaView>
  )
}

export default HomeTabScreen

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    // justifyContent: 'flex-start',
    paddingVertical: 10,
    paddingHorizontal: 20
  },
  catContainer: {
    backgroundColor: colors.dark,
    paddingVertical: 12,
    paddingHorizontal: 20
  },
  title: {
    fontSize: sizes.fontTitle,
    color: colors.white,
    lineHeight: sizes.fontTitle,
    fontWeight: '800'
  }
})