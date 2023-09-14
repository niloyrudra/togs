import { StyleSheet, Text, View, SafeAreaView, Image, useWindowDimensions } from 'react-native'
import React from 'react'
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import { StatusBar } from 'expo-status-bar';
import { useFocusEffect } from '@react-navigation/native';

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
import FeedRoute from '../../components/Tabs/FeedRoute';

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

// const renderScene = SceneMap({
//   left: () => (<PostRoute numCols={3} />),
//   right: () => (<EventRoute />),
// });


const ProfileTabScreen = ( {navigation} ) => {

  const { user, events } = useTogsContext();
  const editRef = React.useRef();
  const layout = useWindowDimensions();


  const [ownedEvents, setOwnedEvents] = React.useState([]);
  const [userRole, setUserRole] = React.useState(user?.role ?? 'individual');

  const [visitedEvents, setVisitedEvents] = React.useState([]);
  const [joinedEvents, setJoinedEvents] = React.useState([]);
  
  const [index, setIndex] = React.useState(0);

  const [routes] = React.useState([
    { key: 'left', title: (userRole == 'individual' ? 'Joined Events' : 'Posts') },
    { key: 'right', title: (userRole == 'individual' ? 'Visited Events' : 'Events') },
  ]);

  const [showEditModal, setShowEditModal] = React.useState(false)

  React.useEffect(() => {
    if( user?.userId ) {

      setUserRole( prevValue => prevValue = user?.role ?? 'individual')

      // if( user?.role == 'service-provider' ) {
      //   const userEvents = events?.length ? events?.filter( event => event.creatorId == user?.userId ) : []
      //   setOwnedEvents(previousValue => previousValue = userEvents)
      // }
    }
  },[user?.userId, events?.length])

  useFocusEffect(
    React.useCallback(() => {

      const userEvents = user?.userId ? events?.filter( event => event?.creatorId == user?.userId ) : []
      setOwnedEvents(previousValue => previousValue = userEvents)

      const eventsVisited = user?.userId ? events.filter( event => user.visitedEvents.includes(event.id)) : []
      setVisitedEvents(previousValue = previousValue = eventsVisited)

      const userJoinedEvents = user?.userId ? events.filter( event => event.joinedUsers.includes(user?.userId)) : []
      setJoinedEvents(previousValue = previousValue = userJoinedEvents)

      return () => {
        setOwnedEvents([])
        setJoinedEvents([])
        setVisitedEvents([])
      }
    }, [])
  );

  // console.log("Joined Events >> ", joinedEvents);
  // console.log("Visited Events >> ", visitedEvents);


  if( userRole && userRole == 'individual' ) {
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
              <View>
                {
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
                  <Text style={styles.userName}>{user?.displayName ?? 'Anonymous'}</Text>
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
                  <Text style={styles.userStatNum}>{user?.connections?.length ?? '0'}</Text>
                  <Text style={styles.userStatLabel}>Connections</Text>
                </View>

                <View style={styles.userStat}>
                  <Text style={styles.userStatNum}>{joinedEvents?.length ?? '0'}</Text>
                  <Text style={styles.userStatLabel}>Events joined</Text>
                </View>


              </View>

            </View>

            {/* Profile Edit Button */}
            <ButtonComponent disabled={ user?.userId ? false : true } label="Edit Profile" onPress={() => setShowEditModal(true)} />

            {/* Tab Scenes for Posts and Events */}
            <TabView
              navigationState={{ index, routes }}
              renderScene={SceneMap({
                left: () => (<FeedRoute eventsData={joinedEvents} />),
                right: () => (<FeedRoute eventsData={visitedEvents} />),
              })}
              renderTabBar={renderTabBar}
              onIndexChange={setIndex}
              initialLayout={{ width: layout.width }}

              lazy={({ route }) => {
                // console.log( route.title )
              }}
            />

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
    );
}
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
            <View>
              {
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
                <Text style={styles.userName}>{user?.displayName ?? 'Anonymous'}</Text>
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
                <Text style={styles.userStatNum}>{user?.connections?.length ?? '0'}</Text>
                <Text style={styles.userStatLabel}>Connections</Text>
              </View>

              <View style={styles.userStat}>
                <Text style={styles.userStatNum}>{ownedEvents.length ?? '0'}</Text>
                <Text style={styles.userStatLabel}>
                  { userRole == 'individual' ? 'Events joined' : 'No. of Events' }
                </Text>
              </View>

              <View style={styles.userStat}>
                <View
                  style={{
                    flexDirection: "row",
                    gap: 4,
                    alignItems:"center",
                    justifyContent:"center"
                  }}
                >
                  <Text style={styles.userStatNum}>{user?.ratings ?? 0}</Text>
                  <Image
                    source={ require('../../assets/icons/star.png') }
                    style={styles.star}
                  />
                </View>
                <Text style={styles.userStatLabel}>Ratings</Text>
              </View>
              
            </View>

          </View>

          {/* Profile Edit Button */}
          <ButtonComponent disabled={ user?.userId ? false : true } label="Edit Profile" onPress={() => setShowEditModal(true)} />

          {/* Tab Scenes for Posts and Events */}
          <TabView
            navigationState={{ index, routes }}
            renderScene={SceneMap({
              left: () => (<PostRoute numCols={3} />),
              right: () => (<EventRoute ownedEvents={ownedEvents} />),
            })}
            renderTabBar={renderTabBar}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}

            lazy={({ route }) => {
              // console.log( route.title )
            }}
          />

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