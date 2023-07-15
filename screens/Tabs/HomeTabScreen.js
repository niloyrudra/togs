import { StyleSheet, View, SafeAreaView, ScrollView, ActivityIndicator } from 'react-native'
import React from 'react'

// Components
import SearchComponent from '../../components/SearchComponent'
import CategoryListComponent from '../../components/CategoryListComponent'
import EventListComponent from '../../components/EventListComponent'
import ElementListComponent from '../../components/ElementListComponent'

// Constants
import colors from '../../constants/colors'
import sizes from '../../constants/sizes'

// Context
import { useTogsContext } from '../../providers/AppProvider'

const HomeTabScreen = () => {
  const { onFetchAllEvents, events, onFetchAllPosts } = useTogsContext();

  const [isLoading, setIsLoading] = React.useState(false)
  const [feeds, setFeeds] = React.useState(events)

  React.useEffect(() => {
    const unSubscriber = async () => {
        setIsLoading(true);
        await Promise.all([
          onFetchAllEvents(),
          onFetchAllPosts()
        ]);
        setIsLoading(false);
      }
      unSubscriber();
    }, [])
    
  React.useEffect(() => {
    setFeeds( prevValue => prevValue = events)
    console.log("Home feeds >> ",feeds)

  }, [events.length])

  return (
    <SafeAreaView style={styles.mainContainer} mode="margin" edges={['right', 'bottom', 'left']} >

      {/* Search Bar */}
      <SearchComponent onChangeFeeds={setFeeds} data={events} />

      {/* Category Section */}
      <View style={styles.catContainer}>
        <CategoryListComponent />
      </View>

      {/* Body Content */}
      <ScrollView style={styles.container}>

        {/* Popular Events */}
        <EventListComponent label="Popular Events" dataType={{type:'popular-event'}}>
          {
            isLoading ?
              (
                <View
                  style={{
                    height: 100,
                    width: '100%',
                    justifyContent:"center",
                    alignItems:"center"
                  }}
                >
                  <ActivityIndicator size="large" color={colors.primaryColor} />
                </View>
              )
              :
              (
                <ElementListComponent data={feeds} />
              )
          }
        </EventListComponent>

        {/* Nearby Events */}
        <EventListComponent label="Nearby Events" dataType={{type:'nearby-event'}}>
          {
            isLoading ?
              (
                <View
                  style={{
                    height: 100,
                    width: '100%',
                    justifyContent:"center",
                    alignItems:"center"
                  }}
                >
                  <ActivityIndicator size="large" color={colors.primaryColor} />
                </View>
              )
              :
              (
                <ElementListComponent data={feeds} style={{transform: [{scale: 0.9}], marginHorizontal: -4, marginTop: -4 }} />
              )
          }
          
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