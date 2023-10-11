import { StyleSheet, FlatList, View, SafeAreaView } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'

// Components
// import SearchComponent from '../../components/SearchComponent'
import FeedCardComponent from '../../components/FeedCardComponent'
import NoDataNoticeComponent from '../../components/NoDataNoticeComponent'
import ActivityIndicatorComponent from '../../components/ActivityIndicatorComponent'


// Context
import { useTogsContext } from '../../providers/AppProvider'


const QuicksTabScreen = ( {navigation} ) => {
  const { posts } = useTogsContext();
  console.log("Quicks Screen")
  return (
    <SafeAreaView style={styles.mainContainer} mode="margin" edges={['right', 'bottom', 'left']} >

      <StatusBar
        animated={true}
        style='light'
      />

      <View style={styles.container}>
        {
          // feeds?.length > 0 ?
          posts?.length > 0 ?
            (
              <FlatList
                // data={feeds}
                data={posts}
                keyExtractor={item => item?.id}
                showsVerticalScrollIndicator={false}
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
    justifyContent: 'center',
    alignItems: 'center'
  },
})