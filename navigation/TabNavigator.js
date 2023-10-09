import { View, Image } from 'react-native';
import { DrawerActions } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Screens
import HomeTabScreen from '../screens/Tabs/HomeTabScreen'
import ProfileTabScreen from '../screens/Tabs/ProfileTabScreen'
import QuicksTabScreen from '../screens/Tabs/QuicksTabScreen'

// Components
import TabLogoXLComponent from '../components/TabLogoXLComponent'
import AppBarRightSectionComponent from '../components/AppBarRightSectionComponent';

// Constants
import colors from '../constants/colors';
import sizes from '../constants/sizes';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
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
                    // height: 110
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
                headerShadowVisible: false,
                tabBarIcon: ({color, size, focused}) => (
                    <Image
                        source={focused  ? require( '../assets/icons/tabs/home/home-active.png' ) : require( '../assets/icons/tabs/home/home-inactive.png' )}
                        style={{
                            width: 30,
                            height: 30
                        }}
                    />
                ),
                headerLeft: () => (<View style={{flex:1}} />),
                headerTitle: () => (<TabLogoXLComponent />),
                headerRight: () => (
                    <AppBarRightSectionComponent
                        onNavigation={() => navigation.navigate( 'Notifications' )}
                    />
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
                headerLeft: () => (<View style={{flex:1}} />),
                headerTitle: () => (<TabLogoXLComponent />),
                headerRight: () => (
                    <AppBarRightSectionComponent
                        // onMenu={() => navigation.dispatch( DrawerActions.openDrawer() )}
                        onNavigation={() => navigation.navigate( 'Notifications' )}
                    />
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
                headerLeft: () => (<View style={{flex:1}} />),
                headerTitle: () => (<TabLogoXLComponent />),
                headerRight: () => (
                    <AppBarRightSectionComponent
                        onMenu={() => navigation.dispatch( DrawerActions.openDrawer() )}
                        onNavigation={() => navigation.navigate( 'Notifications' )}
                    />
                ),                
            })}} />
        </Tab.Navigator>
    )

}

export default TabNavigator;