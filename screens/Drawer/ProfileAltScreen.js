import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity, useWindowDimensions, FlatList } from 'react-native'
import React from 'react'
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import { StatusBar } from 'expo-status-bar';

// Context API
import { useTogsContext } from '../../providers/AppProvider'

// Components
import PostAltRoute from '../../components/Tabs/PostAltRoute';
import EventAltRoute from '../../components/Tabs/EventAltRoute';
import ButtonComponent from '../../components/ButtonComponent'
import DefaultUserAvatarComponent from '../../components/DefaultUserAvatarComponent';

// Modal
// import ProfileEditModal from '../Profile/ProfileEditModal';

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

// const renderScene = SceneMap({
//   posts: () => (<PostRoute numCols={3} />),
//   events: () => (<EventRoute />),
// });


const ProfileAltScreen = ( {navigation, route} ) => {

  const layout = useWindowDimensions();
  const { events, getUserById } = useTogsContext();


  const [user, setUser] = React.useState(null)
  const [ownedEvents, setOwnedEvents] = React.useState([]);
  
  const [index, setIndex] = React.useState(0);

  const [routes] = React.useState([
    { key: 'posts', title: 'Posts' },
    { key: 'events', title: 'Events' },
  ]);

  React.useEffect(() => {

    if( route?.params?.userId ) {

      const userId = route?.params?.userId ?? null;

      const attendUser = async () => {
        const creator = await getUserById(userId)
        setUser(prevValue => prevValue = creator)
      }
      attendUser();

      const userEvents = events.filter( event => event.creatorId == userId )
      setOwnedEvents(userEvents)
      
    }
    
  },[route?.params?.userId])

  return (
    <SafeAreaView style={styles.mainContainer} mode="margin" edges={['right', 'bottom', 'left']} >

      <StatusBar
        animated={true}
        style= "dark" //"auto"
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
                <Text style={styles.userName}>{ user?.displayName ?? 'Anonymous'}</Text>
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
                <Text style={styles.userStatNum}>{user?.connections?.length ?? 0}</Text>
                <Text style={styles.userStatLabel}>Connections</Text>
              </View>

              <View style={styles.userStat}>
                <Text style={styles.userStatNum}>{ownedEvents.length ?? '0'}</Text>
                <Text style={styles.userStatLabel}>
                  {/* { userRole == 'individual' ? 'Events joined' : 'No. of Events' } */}
                  Events
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

          {/* User Interest */}
          <View
            style={{
              marginBottom: 10
            }}
          >
            <Text style={{color:colors.primaryColor,fontFamily:fonts.bold,fontSize:sizes.label,marginBottom:10}}>Interest</Text>
            <Text style={{color:colors.infoColor,fontFamily:fonts.regular,fontSize:sizes.fontText}}>{user?.interest ? user.interest : 'No information yet!'}</Text>
          </View>

          {/* User Bio */}
          <View
            style={{
              marginBottom: 30
            }}
          >
            <Text style={{color:colors.primaryColor,fontFamily:fonts.bold,fontSize:sizes.label,marginBottom:10}}>Bio</Text>
            <Text style={{color:colors.infoColor,fontFamily:fonts.regular,fontSize:sizes.fontText}}>{user?.bio ? user.bio : 'No information yet!'}</Text>
          </View>

          {/* Tab Scenes for Posts and Events */}
          <TabView
            navigationState={{ index, routes }}
            // renderScene={renderScene}

            renderScene={
              SceneMap({
                posts: () => (<PostAltRoute numCols={3} userId={route?.params?.userId} />),
                events: () => (<EventAltRoute numCols={3} ownedEvents={ownedEvents} />),
              })
            }

            renderTabBar={renderTabBar}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}

            lazy={({ route }) => {
              // console.log( route.title )
            }}
          />
            
        </View>
    </SafeAreaView>
  )
}

export default ProfileAltScreen;

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