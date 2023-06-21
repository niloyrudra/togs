import { StyleSheet, View, SafeAreaView, ScrollView, ActivityIndicator } from 'react-native'
import React from 'react'
// import { useIsFocused } from '@react-navigation/native'

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

const HomeTabScreen = ({ navigation }) => {
  const { onFetchAllEvents, events, onFetchAllPosts, comments } = useTogsContext();

  const [isLoading, setIsLoading] = React.useState(false)
  const [searchTerm, setSearchTerm] = React.useState('')

  // Handlers
  const onChangeHandler = ( value ) => {
    setSearchTerm( prevVal => prevVal = value)
  }

  React.useEffect(() => {
    const unSubscriber = async () => {
        setIsLoading(true);
        await Promise.all([
          onFetchAllEvents(),
          onFetchAllPosts()
        ])
        setIsLoading(false);
      }
      unSubscriber();
    }, [])

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
                <ElementListComponent data={events} />
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
                <ElementListComponent data={events} style={{transform: [{scale: 0.9}], marginHorizontal: -4, marginTop: -4 }} />
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