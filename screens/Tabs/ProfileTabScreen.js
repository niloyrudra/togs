import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity, useWindowDimensions, FlatList } from 'react-native'
import React from 'react'
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import { StatusBar } from 'expo-status-bar';

// Context API
import { useTogsContext } from '../../providers/AppProvider'

// Components
import PostRoute from '../../components/Tabs/PostRoute';
import EventRoute from '../../components/Tabs/EventRoute';
import ButtonComponent from '../../components/ButtonComponent'
import DefaultUserAvatarComponent from '../../components/DefaultUserAvatarComponent';

// Modal
import ProfileEditModal from '../Profile/ProfileEditModal';

// Constants
import colors from '../../constants/colors'
import sizes from '../../constants/sizes'
import fonts from '../../constants/fonts'

const renderTabBar = props => (
  <TabBar
    {...props}
    indicatorStyle={{ backgroundColor: colors.primaryColor}}
    renderLabel={({ route, focused, color }) => (
      <Text style={ focused ? { ...styles.tabTitle, color: colors.primaryColor, margin: 8 } : { ...styles.tabTitle,color: colors.tabTextColor, margin: 8 }}>
        {route.title}
      </Text>
    )}
    style={{
      backgroundColor: colors.bgColorDefault,
      color: colors.dark
    }}
  />
);

const renderScene = SceneMap({
  posts: () => (<PostRoute numCols={3} />),
  events: () => (<EventRoute />),
});


const ProfileTabScreen = ( {navigation, route} ) => {

  // const { user, events, userRole, getUserById } = useTogsContext();
  const { user, events, getUserById } = useTogsContext();
  const editRef = React.useRef();
  const layout = useWindowDimensions();

  const [userRole, setUserRole] = React.useState(user?.role)
  const [userAlt, setUserAlt] = React.useState(null)
  const [isUserAlt, setIsUserAlt] = React.useState(false)

  const [ownedEvents, setOwnedEvents] = React.useState([]);
  const [visitedEvents, setVisitedEvents] = React.useState([]);
  
  // const [profilePic, setProfilePic] = React.useState(user?.photoURL ?? '');
  const [index, setIndex] = React.useState(0);

  const [routes] = React.useState([
    { key: 'posts', title: 'Posts' },
    { key: 'events', title: 'Events' },
  ]);
  const [showEditModal, setShowEditModal] = React.useState(false)

  React.useEffect(() => {

    // if( route?.params?.userId && route?.params?.userId != user?.userId ) {

    //   const altUserId = route?.params?.userId;
    //   setIsUserAlt(prevValue => prevValue = true)

    //   const attendAltUser = async () => {

    //     const altUser = await getUserById(altUserId)

    //     setUserAlt(prevValue => prevValue = altUser)
    //   }
    //   attendAltUser();

    //   const userEvents = events.filter( event => event.creatorId == userAlt?.userId )
    //   setOwnedEvents(userEvents)
      
    // }
    
    if( user?.userId ) {
      if( userRole == 'individual' ) {
        setOwnedEvents([])
        const eventsVisited = events.filter( event => user.visitedEvents.includes(event.id))
        setVisitedEvents(eventsVisited)
      }
      if( userRole == 'service-provider' ) {
        const userEvents = events.filter( event => event.creatorId == user?.userId )
        setOwnedEvents(userEvents)
      }
    }
  },[user?.userId, route?.params?.userId])

  return (
    <SafeAreaView style={styles.mainContainer} mode="margin" edges={['right', 'bottom', 'left']} >

      <StatusBar
        animated={true}
        style= "light" //"auto"
      />
              
        <View
          style={styles.container}
        >
        
          {/* Profile Info */}
          <View
            style={{
              flexDirection: "row",
              gap: 20,
              justifyContent:"space-between",
              alignItems:"center",
              marginVertical: 20
            }}
          >

            {/* User's Profile Pic & Name */}
            <View
              style={{
                // flexDirection: "row",
                // gap: 20,
                justifyContent:"center",
                alignItems:"center",
                // marginVertical: 20
                width: 90
              }}
            >
              {
                isUserAlt
                ?
                  userAlt?.photoURL ?
                    (
                      <Image
                        source={{ uri: userAlt.photoURL }}
                        style={{
                          width: 72,
                          height: 72,
                          borderRadius: 36
                        }}
                      />
                    )
                    :
                    (
                      <DefaultUserAvatarComponent />
                    )
                :
                  user?.photoURL ?
                    (
                      <Image
                        source={{ uri: user.photoURL }}
                        style={{
                          width: 72,
                          height: 72,
                          borderRadius: 36
                        }}
                      />
                    )
                    :
                    (
                      <DefaultUserAvatarComponent />
                    )
              }

              <View
                style={{
                  marginTop: 12
                }}
              >
                <Text style={styles.userName}>{isUserAlt ? userAlt?.displayName ?? 'Anonymous' : user?.displayName ?? 'Anonymous'}</Text>
              </View>
            </View>

            {/* User's Stats */}
            <View
              style={{
                flex:1,
                flexDirection: "row",
                justifyContent: "space-around"
              }}
            >

              <View style={styles.userStat}>
                <Text style={styles.userStatNum}>{isUserAlt ? userAlt?.connections?.length ?? 0 : user?.connections?.length ?? '0'}</Text>
                <Text style={styles.userStatLabel}>Connections</Text>
              </View>

              <View style={styles.userStat}>
                <Text style={styles.userStatNum}>{ownedEvents.length ?? '0'}</Text>
                <Text style={styles.userStatLabel}>
                  {/* { userRole == 'individual' ? 'Events joined' : 'No. of Events' } */}
                  { userRole == 'individual' ? 'Events joined' : 'Events' }
                </Text>
              </View>

              {
                userRole == 'service-provider' && (
                  <View style={styles.userStat}>
                    <View
                      style={{
                        flexDirection: "row",
                        gap: 4,
                        alignItems:"center",
                        justifyContent:"center"
                      }}
                    >
                      <Text style={styles.userStatNum}>{isUserAlt ? userAlt?.ratings ?? 0 : user?.ratings ?? 0}</Text>
                      <Image
                        source={ require('../../assets/icons/star.png') }
                        style={styles.star}
                      />
                    </View>
                    <Text style={styles.userStatLabel}>Ratings</Text>
                  </View>
                )
              }

            </View>

          </View>

          {/* Profile Edit Button */}
          {!isUserAlt && <ButtonComponent disabled={ user?.userId ? false : true } label="Edit Profile" onPress={() => setShowEditModal(true)} />}

          {/* Tab Scenes for Posts and Events */}
          {
            !isUserAlt && userRole == 'service-provider' && (
              <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                renderTabBar={renderTabBar}
                onIndexChange={setIndex}
                initialLayout={{ width: layout.width }}

                lazy={({ route }) => {
                  // console.log( route.title )
                }}
              />
            )
          }

          {
            !isUserAlt && userRole == 'individual' && (
              <View
                style={{
                  marginVertical: 20
                }}
              >
                <Text
                  style={{
                    fontFamily: fonts.bold,
                    fontSize: sizes.fontSubTitle,
                    color:colors.primaryColor,
                  }}
                >
                  Events you visited
                </Text>
                {
                  visitedEvents.length ? 
                    (
                      <FlatList
                        data={visitedEvents}
                        key={Math.random().toString()}
                        ListHeaderComponent={
                          <View style={{height:30}} />
                        }
                        renderItem={({item, index}) => (
                          <TouchableOpacity
                            style={{
                              marginVertical: 5,
                              borderWidth: 1,
                              borderColor: colors.infoColor,
                              borderRadius: 10,
                              padding: 6
                            }}
                            onPress={() => navigation.navigate( 'EventScreen', {event: item, prevScreen: 'Profile'} )}
                          >
                            <View
                              style={{
                                flexDirection:"row",
                                alignItems:"center"
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
                                    <View style={{width:40,height:40,borderRadius:20,marginRight:20,backgroundColor:colors.secondaryColor}}/>
                                  )
                              }
                              <Text>{item?.title ?? item?.creator?.name}</Text>
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
                        >You haven't visited any event yet.</Text>
                        <ButtonComponent
                          label="Visit Events"
                          onPress={() => navigation.navigate("Quicks")}
                          
                          bgColor={colors.dark}
                        />
                      </View>
                    )
                }
              </View>

            )
          }

          {
            showEditModal &&
              (
                <ProfileEditModal
                  refEle={editRef}
                  navigation={navigation}
                  isVisible={showEditModal}
                  onClose={() => setShowEditModal(false)}
                />
              )
          }

        </View>
    </SafeAreaView>
  )
}

export default ProfileTabScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    // justifyContent: 'center',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    // justifyContent: 'center',
  },
  eventTitle: {
    fontSize: 16,
    color: colors.dark,
    lineHeight: sizes.fontTitle,
    fontWeight: '700',
    fontFamily: fonts.bold,
    marginVertical: 10,
  },
  userName: {
    fontSize: 14,
    color: colors.dark,
    lineHeight: sizes.fontTitle,
    fontWeight: '600',
    fontFamily: fonts.bold,
    textAlign:"center"
  },
  userStat: {
    justifyContent:"center",
    alignItems:"center",
  },
  userStatLabel: {
    fontSize: 12,
    fontFamily: fonts.bold,
    fontWeight: '500',
    color: colors.statColor
  },
  userStatNum: {
    fontSize: 16,
    fontFamily: fonts.bold,
    fontWeight: '700',
    color: colors.dark
  },
  star: {
    width: 16, // 18,
    height: 16 // 18
  },
  tabTitle: {
    fontSize: fonts.fontTitle,
    fontWeight: '400'
  }
})