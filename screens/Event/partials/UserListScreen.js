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

const PEOPLE = [
  {
    age: "",
    bio: "",
    chosenSports: [5],
    connections: [],
    createdAt: "June 12th 2023, 5:19:55 am",
    displayName: "XYZ pqr",
    email: "xyz@gmail.com",
    firstName: "XYZ",
    interest: "Soccer",
    lastName: "pqr",
    modifiedAt: null,
    peopleYouMet: [],
    phoneNumber: "",
    photoURL: "",
    rating: 0,
    userId: "btPSHBhhNtfDXm5ggStyskfokN73",
    visitedEvents: []
  },
  {
    age: "",
    bio: "",
    chosenSports: [9],
    connections: [],
    createdAt: "May 1st 2023, 12:17:15 am",
    displayName: "Harry Handerson",
    email: "abcd@gmail.com",
    firstName: "Harry",
    interest: "Soccer",
    lastName: "Handerson",
    modifiedAt: null,
    peopleYouMet: [],
    phoneNumber: "",
    photoURL: "",
    rating: 0,
    userId: "btW2PKGvIjWMHFvawPa1wNUfjVK2",
    visitedEvents: []
  },
  {
    address: "Middle Badda, Dhaka 1212, Bangladesh",
    age: "34",
    bio: "This is a bio....",
    birthDate: "10/02/1989",
    chosenSports: [8, 9, 5, 3],
    connections: [],
    createdAt: "June 5th 2023, 2:17:15 am",
    displayName: "Niloy Rudra",
    email: "nill@gmail.com",
    firstName: "Niloy",
    interest: "Chess",
    lastName: "Rudra",
    modifiedAt: "June 14th 2023, 4:33:56 am",
    peopleYouMet: [],
    phoneNumber: "111-222-333",
    photoURL: "https://firebasestorage.googleapis.com/v0/b/togs-abcca.appspot.com/o/831000a6-b78f-471c-9977-deeb7896af7e.jpeg?alt=media&token=6c3563b6-b579-4d48-8743-f7949e13aec2",
    rating: 0,
    userId: "1webeW8Bfbf3r9FsCOX2XghKbLx1",
    visitedEvents: [ "5K7DxMOWV8ANxiqGU5e0", "KoV9otZJYh2SkGXS6lm9", "qPoLtqRhQjp8WdKS9Apb" ],
  }
];

const UserListScreen = ({people=PEOPLE}) => {
  const navigation = useNavigation();

  const profileRef = React.useRef();
  const [ selectedUser, setSelectedUser ] = React.useState(null)
  const [ showModal, setShowModal ] = React.useState(false)
  const [ isLoading, setIsLoading ] = React.useState(false)

  return (
    <View style={styles.container}>
      <StatusBar
        style="dark"
      />

      <View
        style={{
          // marginVertical: 20
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
          Total number of people - {people.length}
        </Text>
        {
          people.length ? 
            (
              <FlatList
                data={people}
                keyExtraction= {item => item.userId}
                // key ={Math.random().toString()}
                // ListHeaderComponent={
                //   <View style={{height:30}} />
                // }
                renderItem={({item, index}) => (
                  <TouchableOpacity
                    style={styles.list}
                    onPress={() => {
                      setSelectedUser( prevValue => prevValue = item )
                      setShowModal( prevValue => prevValue = true )
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
                        item?.photoURL ?
                          (
                            <Image
                              source={{uri: item.photoURL}}
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
                            <DefaultUserAvatarComponent
                              style={{
                                width: 40,
                                height: 40,
                                borderRadius: 20,
                                marginRight: 20
                              }}
                            />
                          )
                      }
                      <View>
                        <Text style={styles.userName}>{item?.displayName ?? 'Anonymous'}</Text>
                        <Text style={styles.email}>{item?.email}</Text>
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
                >No people available yet.</Text>
                <ButtonComponent
                  label="Go Back"
                  onPress={() => navigation.navigate("Profile")}
                  
                  bgColor={colors.dark}
                />
              </View>
            )
        }
      </View>

      {
        showModal &&
          (
            <ProfileModal
              refEle={profileRef}
              navigation={navigation}
              isVisible={showModal}
              selectedUser={selectedUser}
              onClose={() => setShowModal(false)}
            />
          )
      }

    </View>
  )
}

export default UserListScreen

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
    userName: {
      fontFamily: fonts.bold,
      fontSize: sizes.fontSubTitle,
      fontWeight: '800',
      color: colors.secondaryColor
    },
    email: {
      fontFamily: fonts.italic,
      fontSize: sizes.fontText,
      fontWeight: '600',
      color: colors.infoColor
    }
  })