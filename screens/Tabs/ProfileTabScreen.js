import { StyleSheet, ScrollView, Text, View, SafeAreaView, Image, TouchableOpacity, useWindowDimensions, FlatList } from 'react-native'
import React from 'react'
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { FloatingAction } from 'react-native-floating-action';

// Icons
import { Ionicons, SimpleLineIcons } from '@expo/vector-icons';

// Context API
import { useTogsContext } from '../../providers/AppProvider'

// Components
import ButtonComponent from '../../components/ButtonComponent'
// import ButtonIconComponent from '../../components/ButtonIconComponent';

// Modal
import ProfileEditModal from '../Profile/ProfileEditModal';

// Constants
import colors from '../../constants/colors'
import sizes from '../../constants/sizes'
import fonts from '../../constants/fonts'

// Dummy Data
const POSTS=[
  {id:1, img: require('../../assets/temp/posts/post-1.png'), title: 'Post 1', metaData: 'Created at 12/06/2023.', description: 'Post 1 description goes here...' },
  {id:2, img: require('../../assets/temp/posts/post-2.png'), title: 'Post 2', metaData: 'Created at 12/06/2023.', description: 'Post 2 description goes here...' },
  {id:3, img: require('../../assets/temp/posts/post-3.png'), title: 'Post 3', metaData: 'Created at 12/06/2023.', description: 'Post 3 description goes here...' },
  {id:4, img: require('../../assets/temp/posts/post-4.png'), title: 'Post 4', metaData: 'Created at 12/06/2023.', description: 'Post 4 description goes here...' },
  {id:5, img: require('../../assets/temp/posts/post-5.png'), title: 'Post 5', metaData: 'Created at 12/06/2023.', description: 'Post 5 description goes here...' },
  {id:6, img: require('../../assets/temp/posts/post-6.png'), title: 'Post 6', metaData: 'Created at 12/06/2023.', description: 'Post 6 description goes here...' },
  {id:7, img: require('../../assets/temp/posts/post-7.png'), title: 'Post 7', metaData: 'Created at 12/06/2023.', description: 'Post 7 description goes here...' },
  {id:8, img: require('../../assets/temp/posts/post-8.png'), title: 'Post 7', metaData: 'Created at 12/06/2023.', description: 'Post 8 description goes here...' },
  {id:9, img: require('../../assets/temp/posts/post-1.png'), title: 'Post 8', metaData: 'Created at 12/06/2023.', description: 'Post 9 description goes here...' },
  {id:10, img: require('../../assets/temp/posts/post-2.png'), title: 'Post 9', metaData: 'Created at 12/06/2023.', description: 'Post 10 description goes here...' },
  {id:11, img: require('../../assets/temp/posts/post-3.png'), title: 'Post 10', metaData: 'Created at 12/06/2023.', description: 'Post 11 description goes here...' },
  {id:12, img: require('../../assets/temp/posts/post-4.png'), title: 'Post 11', metaData: 'Created at 12/06/2023.', description: 'Post 12 description goes here...' },
  {id:13, img: require('../../assets/temp/posts/post-5.png'), title: 'Post 12', metaData: 'Created at 12/06/2023.', description: 'Post 13 description goes here...' },
  {id:14, img: require('../../assets/temp/posts/post-6.png'), title: 'Post 13', metaData: 'Created at 12/06/2023.', description: 'Post 14 description goes here...' },
  {id:15, img: require('../../assets/temp/posts/post-7.png'), title: 'Post 14', metaData: 'Created at 12/06/2023.', description: 'Post 15 description goes here...' },
  {id:16, img: require('../../assets/temp/posts/post-8.png'), title: 'Post 15', metaData: 'Created at 12/06/2023.', description: 'Post 16 description goes here...' },
];

const EVENTS=[
  {id:1, img: require('../../assets/temp/events/event-1.png'), title: 'Event 1', metaData: 'Created at 23/06/2023', description: 'Event 1 description is here...', navName: ''},
  {id:2, img: require('../../assets/temp/events/event-2.png'), title: 'Event 2', metaData: 'Created at 15/07/2023', description: 'Event 2 description is here...', navName: ''},
  {id:3, img: require('../../assets/temp/events/event-3.png'), title: 'Event 3', metaData: 'Created at 03/08/2023', description: 'Event 3 description is here...', navName: ''},
  {id:4, img: require('../../assets/temp/events/event-4.png'), title: 'Event 4', metaData: 'Created at 13/08/2023', description: 'Event 4 description is here...', navName: ''},
  {id:5, img: require('../../assets/temp/events/event-5.png'), title: 'Event 5', metaData: 'Created at 20/08/2023', description: 'Event 5 description is here...', navName: ''},
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
          onPress={() => navigation.navigate( 'PostScreen', {post: item} ) }
        >
          <Image
            source={item.img}
          />
        </TouchableOpacity>
      )}
      ListFooterComponent={(
        <View style={{
          marginTop: 100,
        }}>      
          <FloatingAction
            floatingIcon={<Ionicons name="add-outline" style={{marginTop:0}} size={50} color={colors.white} />}
            onPressMain={() => navigation.navigate('PostEdit')}
            position='right'
          />
        </View>
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
          gap: 20,
          position: 'relative'
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

        {/* Add Event Button */}
        <View style={{
          marginTop: 50,
          // position:'relative'
        }}>      
          <FloatingAction
            floatingIcon={<Ionicons name="add-outline" style={{marginTop:0}} size={50} color={colors.white} />}
            onPressMain={() => navigation.navigate('EventEdit')}
            position='right'
            
            
            // actions={actions}
            // actionsPaddingTopBottom={10}
            // onPressItem={
            //   (name) => {
            //     console.log(`selected button: ${name}`);
            //   }
            // }
          />
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
  const { user } = useTogsContext();
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
                <Text style={styles.userStatNum}>{user?.connections?.length}</Text>
                <Text style={styles.userStatLabel}>Connection</Text>
              </View>

              <View style={styles.userStat}>
                <Text style={styles.userStatNum}>{user?.events?.length}</Text>
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
          <ButtonComponent label="Edit Profile" onPress={() => setShowEditModal(true)} />

          {/* Tab Scenes for Posts and Events */}
          <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            renderTabBar={renderTabBar}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}

            lazy={({ route }) => console.log( route.name )}
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