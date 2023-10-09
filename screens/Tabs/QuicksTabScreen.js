import { StyleSheet, FlatList, View, SafeAreaView } from 'react-native'
import React from 'react'
import { ActivityIndicator } from 'react-native'

// Components
// import SearchComponent from '../../components/SearchComponent'
import FeedCardComponent from '../../components/FeedCardComponent'
import NoDataNoticeComponent from '../../components/NoDataNoticeComponent'
import ActivityIndicatorComponent from '../../components/ActivityIndicatorComponent'

// Constants
// import colors from '../../constants/colors'
// import sizes from '../../constants/sizes'

// Context
import { useTogsContext } from '../../providers/AppProvider'
import { StatusBar } from 'expo-status-bar'


const QuicksTabScreen = ( {navigation} ) => {
  // const { events, posts } = useTogsContext();
  const { posts, onFetchAllPosts } = useTogsContext();

  // const [feeds, setFeeds] = React.useState( events != "undefined" && posts != "undefined" ? [...events, ...posts] : [] );
  const [feeds, setFeeds] = React.useState( posts != "undefined" ? posts : [] );
  const [isLoading, setIsLoading] = React.useState(true);

  // React.useEffect(() => {
  //   const unSubscriber = async () => {
  //       try {
  //         await onFetchAllPosts();
  //       }
  //       catch(e) {
  //         console.log(e)
  //       }
  //     }
  //     unSubscriber();
  // }, [])

  React.useEffect(() => {
    setIsLoading(true);
    // setFeeds( prevValue => prevValue =  (events != "undefined" && posts != "undefined") ? [...events, ...posts] : []  );
    setFeeds( prevValue => prevValue =  ( posts != "undefined") ? posts : []  );
    setIsLoading(false);
  // }, [events?.length, posts?.length]);
  }, [posts?.length]);

  // React.useEffect(() => {
  //   setIsLoading(true);
  //   setFeeds( prevValue => prevValue = posts)
  //   setIsLoading(false);
  // }, [posts?.length])

  if( isLoading ) return (<ActivityIndicatorComponent />);

  return (
    <SafeAreaView style={styles.mainContainer} mode="margin" edges={['right', 'bottom', 'left']} >

      <StatusBar
        animated={true}
        style='light'
      />

      <View style={styles.container}>
        {
          feeds?.length > 0 ?
            (
              <FlatList
                data={feeds}
                key={Math.random().toString()}
                showsVerticalScrollIndicator={false}
                // ListHeaderComponentStyle={(
                //   <View style={{height: 20}} />
                // )}
                renderItem={({item}) => (
                  <FeedCardComponent
                    item={item}
                    commentCount={item?.commentCount ?? 0}
                    onPress={() => navigation.navigate( 'ProfileAlt', {userId: item?.creatorId} ) }
                  />
                )}
                ListFooterComponent={(
                  <View style={{height: 50}} />
                )}
              />
            )
            :
            (<NoDataNoticeComponent label="feeds" />)
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
    // paddingVertical: 30,
    // MarginVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
})