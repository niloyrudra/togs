import { StyleSheet, FlatList, View, SafeAreaView } from 'react-native'
import React from 'react'
import { ActivityIndicator } from 'react-native'

// Components
import SearchComponent from '../../components/SearchComponent'
import FeedCardComponent from '../../components/FeedCardComponent'
import NoDataNoticeComponent from '../../components/NoDataNoticeComponent'

// Constants
import colors from '../../constants/colors'
import sizes from '../../constants/sizes'

// Context
import { useTogsContext } from '../../providers/AppProvider'


const QuicksTabScreen = ( {navigation} ) => {

  // const { events, posts, comments } = useTogsContext()
  const { events, posts } = useTogsContext();

  const [feeds, setFeeds] = React.useState( events != "undefined" && posts != "undefined" ? [...events, ...posts] : [] );
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    setIsLoading(true);
    setFeeds( prevValue => prevValue =  (events != "undefined" && posts != "undefined") ? [...events, ...posts] : []  );
    setIsLoading(false);
  }, [events?.length, posts?.length]);
  // }, [comments?.length])

  if( isLoading ) return (
    <View style={styles.container}>
      <ActivityIndicator size={sizes.xxlLoader} color={colors.primaryColor} />
    </View>
  );

  return (
    <SafeAreaView style={styles.mainContainer} mode="margin" edges={['right', 'bottom', 'left']} >

      {/* Search Bar */}
      {/* <SearchComponent onChangeFeeds={setFeeds} data={feeds} /> */}

      <View style={styles.container}>
        {
          feeds?.length > 0 ?
            (
              <FlatList
                data={feeds}
                key={Math.random().toString()}
                showsVerticalScrollIndicator={false}
                renderItem={({item}) => {
                  return (
                  <FeedCardComponent
                    item={item}
                    commentCount={item?.commentCount ?? 0}
                    // onPress={() => item?.services ? navigation.navigate( 'EventScreen', {event: item, prevScreen: 'Quicks'} ) : navigation.navigate('PostScreen', {post: item, prevScreen: 'Quicks'}) }
                    onPress={() => navigation.navigate( 'Profile', {userId: item?.creatorId} ) }
                  />
                )}}
                ListFooterComponent={(
                  <View style={{height: 50}} />
                )}
              />
            )
            :
            (
              <NoDataNoticeComponent label="feeds" />
            )
        }
      </View>

    </SafeAreaView>
  )
}

export default QuicksTabScreen

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  container:{
    flex: 1,
    paddingVertical: 30,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
})