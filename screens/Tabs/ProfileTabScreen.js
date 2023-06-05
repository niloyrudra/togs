import { StatusBar, StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity, useWindowDimensions, FlatList } from 'react-native'
import React from 'react'
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import { Ionicons, SimpleLineIcons } from '@expo/vector-icons';

import { FloatingAction } from 'react-native-floating-action';

// Context API
import { AppContext } from '../../providers/AppProvider'

// Components
import ButtonComponent from '../../components/ButtonComponent'

// Constants
import colors from '../../constants/colors'
import sizes from '../../constants/sizes'
import fonts from '../../constants/fonts'
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import ButtonIconComponent from '../../components/ButtonIconComponent';
import ProfileEditModal from '../Profile/ProfileEditModal';

const POSTS=[
  {id:1, img: require('../../assets/temp/posts/post-1.png'), navName: ''},
  {id:2, img: require('../../assets/temp/posts/post-2.png'), navName: ''},
  {id:3, img: require('../../assets/temp/posts/post-3.png'), navName: ''},
  {id:4, img: require('../../assets/temp/posts/post-4.png'), navName: ''},
  {id:5, img: require('../../assets/temp/posts/post-5.png'), navName: ''},
  {id:6, img: require('../../assets/temp/posts/post-6.png'), navName: ''},
  {id:7, img: require('../../assets/temp/posts/post-7.png'), navName: ''},
  {id:8, img: require('../../assets/temp/posts/post-8.png'), navName: ''},
  {id:9, img: require('../../assets/temp/posts/post-1.png'), navName: ''},
  {id:10, img: require('../../assets/temp/posts/post-2.png'), navName: ''},
  {id:11, img: require('../../assets/temp/posts/post-3.png'), navName: ''},
  {id:12, img: require('../../assets/temp/posts/post-4.png'), navName: ''},
  {id:13, img: require('../../assets/temp/posts/post-5.png'), navName: ''},
  {id:14, img: require('../../assets/temp/posts/post-6.png'), navName: ''},
  {id:15, img: require('../../assets/temp/posts/post-7.png'), navName: ''},
  {id:16, img: require('../../assets/temp/posts/post-8.png'), navName: ''},
];
const EVENTS=[
  {id:1, img: require('../../assets/temp/events/event-1.png'), navName: ''},
  {id:2, img: require('../../assets/temp/events/event-2.png'), navName: ''},
  {id:3, img: require('../../assets/temp/events/event-3.png'), navName: ''},
  {id:4, img: require('../../assets/temp/events/event-4.png'), navName: ''},
  {id:5, img: require('../../assets/temp/events/event-5.png'), navName: ''},
];
const PEOPLE=[
  {id:1, img: require('../../assets/temp/people/people-1.png'), navName: ''},
  {id:2, img: require('../../assets/temp/people/people-2.png'), navName: ''},
  {id:3, img: require('../../assets/temp/people/people-3.png'), navName: ''},
  {id:4, img: require('../../assets/temp/people/people-4.png'), navName: ''},
  {id:5, img: require('../../assets/temp/people/people-5.png'), navName: ''},
];

// dynamically changing number of columns
// const numCols = orientation === constants.PORTRAIT ? 3 : 8


// Helper
const PostRoute = ( {numCols=3} ) => {
  const navigation = useNavigation()
  return (
  <View
    style={{
      flex: 1,
      paddingTop: 20,
    }}
  >
    <FlatList
      data={POSTS}
      keyExtractor={item => item.id}
      numColumns={numCols}
      renderItem={({item, index}) => (
        <TouchableOpacity
          style={{
            margin: 4,
            flex: 1,
          }}
          onPress={() => console.log("Click on Post")}
        >
          <Image
            source={item.img}
          />
        </TouchableOpacity>
      )}
      ListFooterComponent={(
        <>
          {/* Add/Edit Event Button */}
          <ButtonIconComponent
            icon={<Ionicons name="add-circle-outline" size={50} color={colors.primaryColor} />}
            onPress={() => navigation.navigate('PostEdit')}
            bgColor={colors.bgColorDefault }
          />
        </>
      )}
    />
  </View>
)};

const EventRoute = () => {
  const navigation = useNavigation();
  return (
    <ScrollView>

      <View
        style={{
          flex: 1,
          paddingTop: 20,
          gap: 20
        }}
      >

        {/* Events Attended */}
        <View>
          <Text style={styles.eventTitle}>Events Attended</Text>
          <TouchableOpacity
            style={{
              borderRadius: 7,
              backgroundColor: colors.white,
              padding: 10,
              flexDirection: 'row',
              justifyContent:"space-between",
              alignItems: "center"
            }}
          >
            <View
              style={{
                flexDirection:"row"
              }}
            >
              {EVENTS.map( (item, index) => (
                <Image
                  key={item.id}
                  source={item.img}
                  style={{
                    width: 92,
                    height: 103,
                    borderRadius: 7,
                    marginRight: -60
                  }}
                />
              ))}
            </View>

            <View
            style={{
              flexDirection: 'row',
              justifyContent:"space-between",
              alignItems: "center",
              gap: 10
            }}
            >
              <Text
                style={{
                  color: '#8E8E93',
                  fontSize:16,
                  fontWeight: '400'
                }}
              >+32</Text>
              <SimpleLineIcons name="arrow-right" size={15} color="black" />
            </View>

          </TouchableOpacity>
        </View>

        {/* People you meet */}
        <View>
          <Text style={styles.eventTitle}>People you met</Text>
          <TouchableOpacity
            style={{
              borderRadius: 7,
              backgroundColor: colors.white,
              padding: 10,
              flexDirection: 'row',
              justifyContent:"space-between",
              alignItems: "center"
            }}
          >
            <View
              style={{
                flexDirection:"row"
              }}
            >
              {PEOPLE.map( (item, index) => (
                <Image
                  key={item.id}
                  source={item.img}
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 18,
                    marginRight: -20
                  }}
                />
              ))}
            </View>

            <View
            style={{
              flexDirection: 'row',
              justifyContent:"space-between",
              alignItems: "center",
              gap: 10
            }}
            >
              <Text
                style={{
                  color: '#8E8E93',
                  fontSize:16,
                  fontWeight: '400'
                }}
              >+12</Text>
              <SimpleLineIcons name="arrow-right" size={15} color="black" />
            </View>

          </TouchableOpacity>
        </View>


      </View>

    </ScrollView>
  )
};

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
  posts: () => (<PostRoute numCols={3}/>),
  events: EventRoute,
});


const ProfileTabScreen = ( {navigation} ) => {

  const { user, setUser } = React.useContext( AppContext );

  console.log(user)

  const editRef = React.useRef();
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'posts', title: 'Posts' },
    { key: 'events', title: 'Events' },
  ]);
  const [showEditModal, setShowEditModal] = React.useState(false)

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
              <Image
                source={require('../../assets/user/user.png')}
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: 36
                }}
              />
              <View
                style={{
                  marginTop: 12
                }}
              >
                <Text style={styles.UserName}>{user?.displayName ?? 'Anonymous'}</Text>
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
                <Text style={styles.userStatNum}>1000+</Text>
                <Text style={styles.userStatLabel}>Connection</Text>
              </View>

              <View style={styles.userStat}>
                <Text style={styles.userStatNum}>32</Text>
                <Text style={styles.userStatLabel}>No. of Events</Text>
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
                  <Text style={styles.userStatNum}>5</Text>
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
          <ButtonComponent label="Edit Profile" onPress={() => setShowEditModal(true)} />

          {/* Tab Scenes for Posts and Events */}
          <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            renderTabBar={renderTabBar}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}

            lazy={({ route }) => console.log( route.name )}

            style={{
              // marginVertical: 20,
            }}
          />

          {
            showEditModal &&
              <ProfileEditModal
                  refEle={editRef}
                  navigation={navigation}
                  isVisible={showEditModal}
                  // searchResultData={ searchResultData }
                  // query={searchQuery}
                  onClose={() => setShowEditModal(false)}
              />
          }

        </View>

      {/* Add Event Button */}
      <FloatingAction
        // actions={actions}
        floatingIcon={<Ionicons name="add-outline" size={50} color={colors.white} />}
        onPressMain={() => navigation.navigate('EventEdit')}
        position='right'
        // onPressItem={
        //   (name) => {
        //     console.log(`selected button: ${name}`);
        //   }
        // }
      />

    </SafeAreaView>
  )
}

export default ProfileTabScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    // paddingHorizontal: 20,
    justifyContent: 'center',
    // backgroundColor: colors.white
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
    // backgroundColor: colors.white
  },
  eventTitle: {
    fontSize: 16,
    color: colors.dark,
    lineHeight: sizes.fontTitle,
    fontWeight: '700',
    fontFamily: fonts.bold,
    marginVertical: 10,
  },
  UserName: {
    fontSize: 14,
    color: colors.dark,
    lineHeight: sizes.fontTitle,
    fontWeight: '600',
    fontFamily: fonts.bold
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