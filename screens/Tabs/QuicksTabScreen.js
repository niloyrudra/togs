import { StatusBar, StyleSheet, FlatList, View, SafeAreaView } from 'react-native'
import React from 'react'
import { ActivityIndicator } from 'react-native'
import { useIsFocused } from '@react-navigation/native'

// Components
import SearchComponent from '../../components/SearchComponent'
import FeedCardComponent from '../../components/FeedCardComponent'

// Constants
import colors from '../../constants/colors'
import sizes from '../../constants/sizes'

// Context
import { useTogsContext } from '../../providers/AppProvider'

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

  const isFocused = useIsFocused()

  const { events, posts, comments } = useTogsContext()

  const [event, setEvent] = React.useState( route?.params?.event ?? {} )

  const [isLoading, setIsLoading] = React.useState(false)
  const [searchTerm, setSearchTerm] = React.useState('')

  // Handlers
  const onChangeHandler = ( value ) => {
    setSearchTerm( prevVal => prevVal = value)
  }

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
          key={Math.random().toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => {
            const commentData = comments.filter( snapshot => snapshot.eventId == item.id && snapshot );
            console.log("commentData >> ", commentData)
            return (
            <FeedCardComponent item={item} hasComments={commentData.length ? commentData[0] : null} onPress={() => item?.services ? navigation.navigate( 'EventScreen', {event: item, prevScreen: 'Quicks'} ) : navigation.navigate('PostScreen', {post: item, prevScreen: 'Quicks'}) } />
          )}}
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