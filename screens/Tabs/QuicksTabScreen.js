import { StatusBar, StyleSheet, FlatList, View, SafeAreaView, Image, FlatArea, TouchableOpacity } from 'react-native'
import React from 'react'

// Components
import SearchComponent from '../../components/SearchComponent'
import FeedCardComponent from '../../components/FeedCardComponent'

// Constants
import colors from '../../constants/colors'
import sizes from '../../constants/sizes'
import fonts from '../../constants/fonts'

// Dummy data
const DATA = [
  {
      id: 1,
      title: 'Slack',
      img: require( '../../assets/icons/slack.png' ),
      content: 'It was a nice experience at combo bar club. Thank you @sgav123',
      time: '9:29 am',
      likes: 101,
      comments: 12,
      share: 2,
      gallery: [
          require('../../assets/temp/events/event-1.png'),
          require('../../assets/temp/events/event-1.png'),
          require('../../assets/temp/events/event-1.png'),
      ]
  },
  {
      id: 2,
      title: 'Katherine',
      img: require( '../../assets/icons/katherine.png' ),
      content: 'It was a nice experience at combo bar club. Thank you @sgav123',
      time: '1 day ago',
      likes: 152,
      comments: 21,
      share: 9,
      gallery: [
          require('../../assets/temp/events/event-1.png'),
          require('../../assets/temp/events/event-1.png'),
          require('../../assets/temp/events/event-1.png'),
      ]
  }
];

const QuicksTabScreen = ( {navigation, route} ) => {
  console.log(route.params)
  const [searchTerm, setSearchTerm] = React.useState('')

  // Handlers
  const onChangeHandler = ( value ) => {
    setSearchTerm( prevVal => prevVal = value)
  }

  return (
    <SafeAreaView style={styles.mainContainer} mode="margin" edges={['right', 'bottom', 'left']} >

      {/* Search Bar */}
      <SearchComponent onChangeText={onChangeHandler} />

      <View style={styles.container}>
        <FlatList
          data={DATA}
          keyExtractor={item => item.id}
          // horizontal={true}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <FeedCardComponent item={item} />
          )}
        />
      </View>

    </SafeAreaView>
  )
}

export default QuicksTabScreen

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    // justifyContent: 'space-between'
  },
  container:{
    paddingVertical: 30,
    paddingHorizontal: 20
  },

})