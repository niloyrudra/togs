import { StatusBar, StyleSheet, FlatList, View, SafeAreaView, Image, FlatArea, TouchableOpacity } from 'react-native'
import React from 'react'
import { ActivityIndicator } from 'react-native'
import { useIsFocused } from '@react-navigation/native'

// Components
import SearchComponent from '../../components/SearchComponent'
import FeedCardComponent from '../../components/FeedCardComponent'

// Constants
import colors from '../../constants/colors'
// import sizes from '../../constants/sizes'
// import fonts from '../../constants/fonts'

// Context
import { useTogsContext } from '../../providers/AppProvider'
import { Dimensions } from 'react-native'
import sizes from '../../constants/sizes'

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
  // console.log(route.params)

  const isFocused = useIsFocused()

  const { events, posts, onFetchAllPosts } = useTogsContext();

  const [isLoading, setIsLoading] = React.useState(false)
  const [searchTerm, setSearchTerm] = React.useState('')

  // Handlers
  const onChangeHandler = ( value ) => {
    setSearchTerm( prevVal => prevVal = value)
  }

  React.useEffect(() => {
    const unSubscriber = async () => {
      setIsLoading(true);
      await onFetchAllPosts();
      setIsLoading(false);
    }
    unSubscriber();
  }, [])

  if( isLoading ) return (
    <View style={styles.container}>
      <ActivityIndicator size={sizes.xxlLoader} color={colors.primaryColor} />
    </View>
  );

  return (
    <SafeAreaView style={styles.mainContainer} mode="margin" edges={['right', 'bottom', 'left']} >

      {/* Search Bar */}
      <SearchComponent onChangeText={onChangeHandler} />

      <View style={styles.container}>
        <FlatList
          data={[...events, ...posts]}
          // keyExtractor={item => item.createdAt}
          key={Math.random().toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <FeedCardComponent item={item} />
          )}
          ListFooterComponent={(
            <View style={{height:50}} />
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
    flex: 1,
    paddingVertical: 30,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },

})