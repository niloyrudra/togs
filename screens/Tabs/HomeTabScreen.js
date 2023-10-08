import { StyleSheet, View, SafeAreaView, ScrollView, ActivityIndicator } from 'react-native'
import React from 'react'
// import { useFocusEffect } from '@react-navigation/native'

// Components
import SearchComponent from '../../components/SearchComponent'
import CategoryListComponent from '../../components/CategoryListComponent'
import EventListComponent from '../../components/EventListComponent'
import ElementListComponent from '../../components/ElementListComponent'
import ActivityIndicatorComponent from '../../components/ActivityIndicatorComponent'

// Constants
import colors from '../../constants/colors'
import sizes from '../../constants/sizes'

// Context
import { useTogsContext } from '../../providers/AppProvider'
import { StatusBar } from 'expo-status-bar'

const HomeTabScreen = () => {
  const { onFetchAllEvents, events, updatedEventList, user, onFetchAllUsers } = useTogsContext();
  const filterRef = React.useRef(null);
  const [isLoading, setIsLoading] = React.useState(false)
  const [feeds, setFeeds] = React.useState(events)
  // useFocusEffect(
  //   React.useCallback(() => {
  //     // StatusBar.setBarStyle('light-content'); // 'light-content' 'dark-content'
  //     // StatusBar.setBackgroundColor('black'); //add color code
  //     // StatusBar.setTranslucent(true);
  //     console.log("StatusBar Action")
  //   }, []),
  // );

  React.useEffect(() => {
    const unSubscriber = async () => {
        try {
          setIsLoading( prevValue => prevValue = true);
          await Promise.all([
            onFetchAllEvents(),
            // onFetchAllPosts(),
            onFetchAllUsers(user?.userId)
          ]);
          setIsLoading( prevValue => prevValue = false);
        }
        catch(e) {
          console.log(e)
          setIsLoading( prevValue => prevValue = false);
        }
      }
      unSubscriber();
    }, [])

  React.useEffect(() => {
    setIsLoading(true);
    if(filterRef.current != 'all' ) {
      setFeeds( prevValue => prevValue = updatedEventList)
      setIsLoading(false);
    }
    else {
      setFeeds( prevValue => prevValue = events)
      setIsLoading(false);
    }
  }, [filterRef?.current])
    
  React.useEffect(() => {
    setFeeds( prevValue => prevValue = events)
  }, [events?.length])

  return (
    <SafeAreaView style={styles.mainContainer} mode="margin" edges={['right', 'bottom', 'left']} >

      {/* Status Bar */}
      <StatusBar
        animated={true}
        style="light"
      />

      {/* Search Bar */}
      <SearchComponent onChangeFeeds={setFeeds} data={events} />

      {/* Category Section */}
      <View style={styles.catContainer}>
        <CategoryListComponent filterRef={filterRef} />
      </View>

      {/* Body Content */}
      <ScrollView style={styles.container}>

        {/* Tournaments */}
        <EventListComponent label="Tournaments">
          {
            isLoading ?
              (<ActivityIndicatorComponent style={{height: 100}} />)
              :
              (
                <ElementListComponent data={ feeds.filter(item => item.services == 'tournament') } />
              )
          }
        </EventListComponent>

        {/* Venues */}
        <EventListComponent label="Venues">
          {
            isLoading ?
              (<ActivityIndicatorComponent style={{height: 100}} />)
              :
              (
                <ElementListComponent data={ feeds.filter(item => item.services == 'venue') } />
              )
          }
        </EventListComponent>

        {/* Memberships */}
        <EventListComponent label="Memberships">
          {
            isLoading ?
              (<ActivityIndicatorComponent style={{height: 100}} />)
              :
              (
                <ElementListComponent data={ feeds.filter(item => item.services == 'membership') } />
              )
          }
        </EventListComponent>

        {/* Workshops */}
        <EventListComponent label="Workshops">
          {
            isLoading ?
              (<ActivityIndicatorComponent style={{height: 100}} />)
              :
              (
                <ElementListComponent data={ feeds.filter(item => item.services == 'workshop') } />
              )
          }
        </EventListComponent>

        {/* Solo Events */}
        <EventListComponent label="Solo Events">
          {
            isLoading ?
              (<ActivityIndicatorComponent style={{height: 100}} />)
              :
              (
                <ElementListComponent data={ feeds.filter(item => item.services == 'solo-events') } />
              )
          }
        </EventListComponent>

        {/* Nearby Events */}
        {/* <EventListComponent label="Nearby Events" dataType={{type:'nearby-event'}}>
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
          
        </EventListComponent> */}

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
    backgroundColor: "transparent", // colors.dark,
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