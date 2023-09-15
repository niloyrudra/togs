import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, ActivityIndicator, } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'

// Components
import ButtonComponent from "../../../components/ButtonComponent"
import DefaultUserAvatarComponent from '../../../components/DefaultUserAvatarComponent'

// Modal
import ProfileModal from './ProfileModal'

// Constants
import colors from '../../../constants/colors'
import fonts from '../../../constants/fonts'
import sizes from '../../../constants/sizes'

const UserListScreen = ({navigation, route}) => {
  const profileRef = React.useRef();
  const [ selectedUserId, setSelectedUserId ] = React.useState(null)
  const [ people, setPeople ] = React.useState([])
  const [ showModal, setShowModal ] = React.useState(false)
  const [ isLoading, setIsLoading ] = React.useState(false)

  React.useEffect(() => {
    setIsLoading(true)
    if( route?.params?.people?.length ) setPeople( prevValue => prevValue = route?.params?.people )
    else setPeople( prevValue => prevValue = [] )
    setIsLoading(false)
  }, [route?.params?.people?.length])

  if( isLoading ) return (
    <View
      style={{
        flex:1,
        justifyContent: 'center',
        alignItems: "center"
      }}
    >
      <ActivityIndicator size={sizes.xxlLoader} color={colors.primaryColor} />
    </View>
  );

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
          Total number of people - {people.length}
        </Text>
        {
          people?.length ? 
            (
              <FlatList
                data={people}
                keyExtraction= {item => item.userId}
                renderItem={({item, index}) => (
                  <TouchableOpacity
                    style={styles.list}
                    onPress={() => {
                      setSelectedUserId( prevValue => prevValue = item.userId )
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
              selectedUserId={selectedUserId}
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
  });