import { View, TouchableOpacity, Image } from 'react-native';
import { DrawerActions } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// Screens
import HomeTabScreen from '../screens/Tabs/HomeTabScreen'
import ProfileTabScreen from '../screens/Tabs/ProfileTabScreen'
import QuicksTabScreen from '../screens/Tabs/QuicksTabScreen'

// Components
import DefaultUserAvatarComponent from '../components/DefaultUserAvatarComponent';

// Constants
import colors from '../constants/colors';
import sizes from '../constants/sizes';
import { useTogsContext } from '../providers/AppProvider';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    const {user} = useTogsContext()
    return (
        <Tab.Navigator
            screenOptions={({route,  navigation }) => ({
                tabBarActiveTintColor: colors.tabActiveTint,
                tabBarInactiveTintColor: colors.tabInactiveTint,
                tabBarStyle:{
                    height: sizes.tabBarHeight, // 58
                    alignItems: "center",
                    justifyContent: "center",
                    paddingTop: 10,
                    paddingBottom: 20,
                    backgroundColor: colors.white
                },
                headerStyle: {
                    backgroundColor: colors.dark,
                    height: 110
                },
                headerTintColor: colors.white,
                headerTitleAlign: "center",
                // headerTitleStyle: {
                //     fontWeight: 'bold',
                // },
                
            })}
        >
            <Tab.Screen name="Home" component={HomeTabScreen} options={({navigation, route}) => ({
                tabBarLabel: "Home",
                tabBarLabelStyle: {
                    fontWeight: "800"
                },
                tabBarIcon: ({color, size, focused}) => (
                    <Image
                        source={focused  ? require( '../assets/icons/tabs/home/home-active.png' ) : require( '../assets/icons/tabs/home/home-inactive.png' )}
                        style={{
                            width: 30,
                            height: 30
                        }}
                    />
                ),
                headerLeft: () => (
                    // <View
                    //     style={{
                    //         paddingLeft: 20
                    //     }}
                    // >
                    //     {
                    //         user?.photoURL ?
                    //             (
                    //                 <Image
                    //                     source={{uri: user.photoURL}}
                    //                     style={{
                    //                         width:60,
                    //                         height:60,
                    //                         borderRadius: 30
                    //                     }}
                    //                 />
                    //             )
                    //             :
                    //             (
                    //                 <DefaultUserAvatarComponent />
                    //             )
                    //     }
                    // </View>
                    <View style={{flex:1}} />
                ),
                headerTitle: () => (
                    <Image
                        source={require( '../assets/logo/logo-xl.png' )}
                        style={{
                            width: 95,
                            height: 36
                        }}
                    />
                ),
                headerRight: () => (
                    <View
                        style={{
                            // flexDirection: 'row',
                            // gap: 16,
                            paddingRight: 20
                        }}
                    >
                        {/* <TouchableOpacity
                            // onPress={() => navigation.openDrawer() }
                        >
                            <Image
                                source={require( '../assets/icons/setting.png' )}
                                style={{
                                    width: 20,
                                    height: 20
                                }}
                            />
                        </TouchableOpacity> */}

                        <TouchableOpacity
                            onPress={() => navigation.navigate( 'Notifications' )}
                        >
                            <Ionicons name="notifications-outline" size={20} color={colors.white} />
                        </TouchableOpacity>
                    </View>
                ),
            })} />

            <Tab.Screen name="Quicks" component={QuicksTabScreen} options={({navigation, route}) => ({
                tabBarLabel: "Quicks",
                tabBarLabelStyle: {
                    fontWeight: "800"
                },
                tabBarIcon: ({color, size, focused}) => (
                    <Image
                        source={focused  ? require( '../assets/icons/tabs/quicks/message-active.png' ) : require( '../assets/icons/tabs/quicks/message-inactive.png' )}
                        style={{
                            width: 30,
                            height: 30
                        }}
                    />
                ),
                headerLeft: () => (
                    // <View
                    //     style={{
                    //         paddingLeft: 20
                    //     }}
                    // >
                    //     {
                    //         user?.photoURL ?
                    //             (
                    //                 <Image
                    //                     source={{uri: user.photoURL}}
                    //                     style={{
                    //                         width:60,
                    //                         height:60,
                    //                         borderRadius: 30
                    //                     }}
                    //                 />
                    //             )
                    //             :
                    //             (
                    //                 <DefaultUserAvatarComponent />
                    //             )
                    //     }
                    // </View>
                    <View style={{flex:1}} />
                ),
                headerTitle: () => (
                    <Image
                        source={require( '../assets/logo/logo-xl.png' )}
                        style={{
                            width: 95,
                            height: 36
                        }}
                    />
                ),
                headerRight: () => (
                    <View
                        style={{
                            // flexDirection: 'row',
                            // gap: 16,
                            paddingRight: 20
                        }}
                    >
                        {/* <TouchableOpacity
                            // onPress={() => navigation.openDrawer()}
                        >
                            <Image
                                source={require( '../assets/icons/setting.png' )}
                                style={{
                                    width: 20,
                                    height: 20
                                }}
                            />
                        </TouchableOpacity> */}

                        <TouchableOpacity
                            onPress={() => navigation.navigate( 'Notifications' )}
                        >
                            <Ionicons name="notifications-outline" size={20} color={colors.white} />
                        </TouchableOpacity>
                    </View>
                ),
            })} />

            <Tab.Screen name="Profile" component={ProfileTabScreen} options={( {navigation, route} ) => {
                return ({
                tabBarLabel: "Profile",
                tabBarLabelStyle: {
                    fontWeight: "800"
                },
                tabBarIcon: ({color, size, focused }) => (
                    <Image
                        source={ focused  ? require( '../assets/icons/tabs/profile/profile-active.png' ) : require( '../assets/icons/tabs/profile/profile-inactive.png' )}
                        style={{
                            width: 30,
                            height: 30
                        }}
                    />
                ),
                headerLeft: () => (
                    <View
                        style={{
                            paddingLeft: 20
                        }}
                    >
                        {
                            user?.photoURL ?
                                (
                                    <Image
                                        source={{uri: user.photoURL}}
                                        style={{
                                            width:60,
                                            height:60,
                                            borderRadius: 30
                                        }}
                                    />
                                )
                                :
                                (
                                    <DefaultUserAvatarComponent />
                                )
                        }
                    </View>
                ),
                headerTitle: () => (
                    <Image
                        source={require( '../assets/logo/logo-xl.png' )}
                        style={{
                            width: 95,
                            height: 36
                        }}
                    />
                ),
                headerRight: () => (
                    <View
                        style={{
                            flexDirection: 'row',
                            gap: 16,
                            paddingRight: 20
                        }}
                    >
                        <TouchableOpacity
                            onPress={() => navigation.dispatch( DrawerActions.openDrawer() )}
                        >
                            <Image
                                source={require( '../assets/icons/setting.png' )}
                                style={{
                                    width: 20,
                                    height: 20
                                }}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => navigation.navigate( 'Notifications' )}
                        >
                            <Ionicons name="notifications-outline" size={20} color={colors.white} />
                        </TouchableOpacity>
                    </View>
                ),                
            })}} />
        </Tab.Navigator>
    )

}

export default TabNavigator;