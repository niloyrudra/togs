import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { useNavigation } from '@react-navigation/native'

// Components
import ButtonComponent from "../../../components/ButtonComponent"
import DefaultUserAvatarComponent from '../../../components/DefaultUserAvatarComponent'


// Constants
import colors from '../../../constants/colors'
import fonts from '../../../constants/fonts'
import sizes from '../../../constants/sizes'


const EventListScreen = ({route}) => {
  const navigation = useNavigation();

  // console.log("Event List Screen >> ", route?.params?.events)
  const [visitedEvents, setVisistedEvents] = React.useState(route?.params?.events)
  
  React.useEffect(() => {
    setVisistedEvents(prevValue => prevValue = route?.params?.events)
  }, [route?.params?.events.length])

  return (
    <View style={styles.container}>
      <StatusBar
        style="dark"
      />

      <View
        style={{
          flex:1,
          width:"100%"
        }}
      >
        <Text
          style={{
            fontFamily: fonts.bold,
            fontSize: sizes.fontSubTitle,
            color: colors.infoColor,
            marginBottom: 10
          }}
        >
          Total number of event(s) - {visitedEvents?.length}
        </Text>
        {
          visitedEvents?.length ? 
            (
              <FlatList
                data={visitedEvents}
                keyExtraction= {item => item.id}
                renderItem={({item, index}) => (
                  <TouchableOpacity
                    style={styles.list}
                    onPress={() => {
                        navigation.navigate("EventScreen", {event: item, prevScreen: 'EventList'})
                    }}
                  >
                    <View
                      style={{
                        flexDirection:"row",
                        alignItems:"center",
                        justifyContent:"flex-start"
                      }}
                    >
                      {
                        item?.image ?
                          (
                            <Image
                              source={{uri: item.image}}
                              style={{
                                width: 40,
                                height: 40,
                                borderRadius: 20,
                                marginRight: 20
                              }}
                            />
                          )
                          :
                          (
                            <DefaultUserAvatarComponent style={{width:40,height:40,marginRight:20}} />
                          )
                      }
                      <View>
                        <Text style={styles.services}>{item?.title ?? 'Anonymous'}</Text>
                        <Text style={styles.activities}>{item?.activities}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                )}
                ListFooterComponent={
                  <View style={{height:50}} />
                }
              />
            )
            :
            (
              <View
                style={{
                  marginVertical: 15,
                  marginHorizontal: 15,
                  gap: 20
                }}
              >
                <Text
                  style={{
                    fontFamily: fonts.regular,
                    fontSize: sizes.fontText,
                    color:colors.infoColor,
                  }}
                >No event available yet.</Text>
                <ButtonComponent
                  label="Go Back"
                  onPress={() => navigation.navigate("Profile")}
                  
                  bgColor={colors.dark}
                />
              </View>
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
    list: {
      marginVertical: 5,
      borderRadius: 10,
      marginHorizontal: 4,
      padding: 6,
      backgroundColor: colors.white,
       
      shadowColor: colors.shadowColor,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.15,
      shadowRadius: 3.84,

      elevation: 3,
    },
    services: {
      fontFamily: fonts.bold,
      fontSize: sizes.fontSubTitle,
      fontWeight: '800',
      color: colors.secondaryColor
    },
    activities: {
      fontFamily: fonts.italic,
      fontSize: sizes.fontText,
      fontWeight: '600',
      color: colors.infoColor
    }
})