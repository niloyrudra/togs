import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { useNavigation } from '@react-navigation/native'

// Components
import ButtonComponent from "../../../components/ButtonComponent"
import DefaultUserAvatarComponent from '../../../components/DefaultUserAvatarComponent'

// Modal
import ProfileModal from './ProfileModal'

// Constants
import colors from '../../../constants/colors'
import fonts from '../../../constants/fonts'
import sizes from '../../../constants/sizes'

// Context
// import { useTogsContext } from '../../../providers/AppProvider'

// const EVENTS = [
//   {
//     activities: "yoga",
//     content: "The yoga event...!",
//     createdAt: "June 10th 2023, 3:17:15 am",
//     creator: {
//     name: "Nill Rudra",
//     photoURL: "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252Ftogs-eafe6928-6d96-47bf-87a8-d31b20d344bc/ImagePicker/80129fff-8f5b-498e-91a6-ce4812977a36.jpeg"},
//     creatorId: "1webeW8Bfbf3r9FsCOX2XghKbLx1",
//     endDate: "31/07/2023",
//     id: "5K7DxMOWV8ANxiqGU5e0",
//     image: "https://firebasestorage.googleapis.com/v0/b/togs-abcca.appspot.com/o/7f8bf514-40a7-42b4-be5f-662558c12963.jpeg?alt=media&token=ec4e9fd4-3a1b-4e73-97ed-2e80e0da77a8",
//     likes: [ "PGsyqeBFKDSXq4EvpzZqnix0mMK2", "0Slm53iDVaPBVsxKetaOA1Jem2u1" ],
//     location: "Gulshan-1, Dhaka",
//     price: "510",
//     services: "venue",
//     shares: [ "Jun 21, 2023 7:03 PM", "Jun 21, 2023 7:06 PM" ],
//     startDate: "30/06/2023",
//     time: "",
//     workingHours: "6:30 pm",
//   },
//   {
//     activities: "soccer",
//     content: "Here is soccer tournament in Madrid.",
//     createdAt: "June 12th 2023, 3:53:02 am",
//     creator: {
//     name: "Nill Rudra",
//     photoURL: "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252Ftogs-eafe6928-6d96-47bf-87a8-d31b20d344bc/ImagePicker/80129fff-8f5b-498e-91a6-ce4812977a36.jpeg"},
//     creatorId: "1webeW8Bfbf3r9FsCOX2XghKbLx1",
//     endDate: "31/07/2023",
//     id: "qPoLtqRhQjp8WdKS9Apb",
//     image: "",
//     likes: [],
//     location: "Madrid",
//     price: "1569",
//     services: "tournament",
//     shares: [],
//     startDate: "01/07/2023",
//     time: "6:30 pm",
//   }
// ];

const EventListScreen = ({route}) => {
  const navigation = useNavigation();


  const [ selectedEvent, setSelectedEvent ] = React.useState(route.params?.events?.length ?? [])
//   const [ isLoading, setIsLoading ] = React.useState(false)

  React.useEffect(() => {
    if(route.params?.events) setSelectedEvent( prevValue => prevValue = route.params?.events )
  }, [route.params?.events?.length]);

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
          Total number of event(s) - {selectedEvent.length}
        </Text>
        {
          selectedEvent.length ? 
            (
              <FlatList
                data={selectedEvent}
                keyExtraction= {item => item.id}
                // key ={Math.random().toString()}
                // ListHeaderComponent={
                //   <View style={{height:30}} />
                // }
                renderItem={({item, index}) => (
                  <TouchableOpacity
                    style={styles.list}
                    onPress={() => {
                        navigation.navigate("EventScreen", {event: item, prevScreen: 'EventList'})
                    //   setSelectedEvent( prevValue => prevValue = item )
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
                            <View
                              style={{
                                width: 40,
                                height: 40,
                                borderRadius: 20,
                                marginRight: 20,
                                backgroundColor: colors.secondaryColor
                              }}
                            />
                          )
                      }
                      <View>
                        <Text style={styles.title}>{item?.title ?? 'Anonymous'}</Text>
                        {/* <Text style={styles.services}>{item?.services ?? 'Anonymous'}</Text> */}
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
      // flex:1,
      marginVertical: 5,
      // borderWidth: 1,
      // borderColor: colors.infoColor,
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
    title: {
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