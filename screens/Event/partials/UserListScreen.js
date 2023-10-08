import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'

// Components
import ButtonComponent from "../../../components/ButtonComponent"
import DefaultUserAvatarComponent from '../../../components/DefaultUserAvatarComponent'
import BackHomeButtonComponent from '../../../components/BackHomeButtonComponent'
import ActivityIndicatorComponent from '../../../components/ActivityIndicatorComponent'

// Modal
import ProfileModal from './ProfileModal'

// Constants
import colors from '../../../constants/colors'
import fonts from '../../../constants/fonts'
import sizes from '../../../constants/sizes'
import PeopleMetRectangularCardComponent from '../../../components/PeopleMetRectangularCardComponent'

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

  // Initial Loading Stage
  if( isLoading ) return (<ActivityIndicatorComponent />);

  // Content
  return (
    <View style={styles.container}>
      <StatusBar
        animated={true}
        style="light"
      />

      <View style={styles.content}>

        <Text style={styles.title}>Total number of people - {people.length}</Text>

        {
          people?.length ? 
            (
              <FlatList
                data={people}
                keyExtraction= {item => item?.userId}
                renderItem={({item, index}) => (
                  <PeopleMetRectangularCardComponent
                    item={item}
                    onPress={() => {
                      setSelectedUserId( prevValue => prevValue = item?.userId )
                      setShowModal( prevValue => prevValue = true )
                    }}
                  />
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
  });