import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { useNavigation } from '@react-navigation/native'

// Components
import EventRectagularCardComponent from '../../../components/EventRectagularCardComponent'
import BackHomeButtonComponent from '../../../components/BackHomeButtonComponent'


// Constants
import colors from '../../../constants/colors'
import fonts from '../../../constants/fonts'
import sizes from '../../../constants/sizes'


const EventListScreen = ({route}) => {
  const navigation = useNavigation();

  const [visitedEvents, setVisistedEvents] = React.useState(route?.params?.events)
  
  React.useEffect(() => {
    setVisistedEvents(prevValue => prevValue = route?.params?.events)
  }, [route?.params?.events.length])

  return (
    <View style={styles.container}>
      <StatusBar
        animated={true}
        style="dark"
      />

      <View style={styles.content}>

        <Text style={styles.title}>Total number of event(s) - {visitedEvents?.length}</Text>

        {
          visitedEvents?.length ? 
            (
              <FlatList
                data={visitedEvents}
                keyExtraction= {item => item.id}
                renderItem={({item, index}) => (
                  <EventRectagularCardComponent item={item} />
                )}
                ListFooterComponent={
                  <View style={{height:50}} />
                }
              />
            )
            :
            (
              <BackHomeButtonComponent />
            )
        }
      </View>

    </View>
  )
}

export default EventListScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:"center",
    alignItems:"center",
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  content: {
    flex:1,
    width:"100%"
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: sizes.fontSubTitle,
    color: colors.infoColor,
    marginBottom: 10
  }
    
})