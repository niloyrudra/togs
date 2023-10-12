import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { createDrawerNavigator, DrawerItemList, DrawerItem, DrawerContentScrollView } from '@react-navigation/drawer'
import { DrawerActions } from '@react-navigation/native';

// Icons
import { AntDesign, SimpleLineIcons } from '@expo/vector-icons';

// Screens
// import CountryListScreen from '../screens/Drawer/CountryListScreen';
import HelpScreen from '../screens/Drawer/HelpScreen';
import NotificationsScreen from '../screens/Drawer/NotificationsScreen';
// import PreferencesScreen from '../screens/Drawer/PreferencesScreen';
// import LanguagesScreen from '../screens/Drawer/LanguagesScreen';
import PrivacyPolicyScreen from '../screens/Drawer/PrivacyPolicyScreen';
import WelcomeScreen from '../screens/Welcome/WelcomeScreen';
import TabNavigator from './TabNavigator';
import PostFormScreen from '../screens/Forms/PostFormScreen';
import EventFormScreen from '../screens/Forms/EventFormScreen';
import SinglePostScreen from '../screens/Post/SinglePostScreen';
import SingleEventScreen from '../screens/Event/SingleEventScreen'
import AllEventsScreen from '../screens/Event/AllEventsScreen';
import UserListScreen from '../screens/Event/partials/UserListScreen';
import EventListScreen from '../screens/Event/partials/EventListScreen';

// Components
import SectionLabel from '../components/SectionLabel';
import UserAvatarComponent from '../components/UserAvatarComponent';
import DefaultUserAvatarComponent from '../components/DefaultUserAvatarComponent'
import ProfileAltScreen from '../screens/Drawer/ProfileAltScreen';
import LogoXLComponent from '../components/LogoXLComponent';
import DrawerMenuButtonComponent from '../components/DrawerMenuButtonComponent';
import DrawerBackButtonComponent from '../components/DrawerBackButtonComponent';
import AppBarRightSectionComponent from '../components/AppBarRightSectionComponent';

// Context
import { useTogsContext } from '../providers/AppProvider';

// Contants
import colors from '../constants/colors';
import sizes from '../constants/sizes';
import fonts from '../constants/fonts';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {

  return (
    <Drawer.Navigator
        drawerContent={ props => <DrawerContent { ...props } /> }
        screenOptions={({route, navigation}) => ({
            drawerPosition: "right",
            drawerStyle: {
                width: '100%',
                backgroundColor: colors.bgColorDefault
            },
            headerLeft: () => (<View style={{flex:1}} />),
            headerTitle: () => (<LogoXLComponent />),
            headerRight: () => (<DrawerMenuButtonComponent onPress={() => navigation.dispatch( DrawerActions.toggleDrawer() )} />)
        })}
        initialRouteName="Welcome" //'HomeTab'
    >
        <Drawer.Screen name='Welcome' component={WelcomeScreen} options={{ headerShown: false }} />

        <Drawer.Screen name='HomeTab' component={TabNavigator} options={{ headerShown: false }} />

        <Drawer.Screen name="ProfileAlt" component={ProfileAltScreen} options={({navigation, route}) => {
            return ({
                // headerTitle: {currentUserName},
                headerTitle: 'Profile',
                headerTitleAlign: "center",
                headerShadowVisible: false,
                headerStyle: {
                    backgroundColor: colors.dark
                },
                headerTitleStyle: {
                    fontWeight: '800',
                    color: colors.white
                },
                headerLeft: () => (<DrawerBackButtonComponent color={colors.white} onPress={() => navigation.navigate('Quicks')} />)
            })
        }} />

        <Drawer.Screen name="EventEdit" component={EventFormScreen} options={({navigation, route}) => ({
            headerTitle: 'Host Event',
            headerStyle: {
                backgroundColor: colors.dark
            },
            headerTitleStyle: {
                fontWeight: '800',
                color: colors.white
            },
            headerTitleAlign: "center",
            headerLeft: () => (<DrawerBackButtonComponent color={colors.white} onPress={() => navigation.navigate('Profile')} />)
        })} />

        <Drawer.Screen name="UserList" component={UserListScreen} options={({navigation, route}) => {
            const title = route?.params?.title ?? "People you know!"
            const prevScreen = route?.params?.prevScreen ?? "Profile"
            return ({
                headerTitle: () => (<Text style={{fontSize:sizes.fontTitle, textTransform: 'capitalize', color:colors.white,fontWeight:'800',fontFamily:fonts.bold}}>{title}</Text>),
                headerStyle: {
                    backgroundColor: colors.dark
                },
                headerTitleStyle: {
                    fontWeight: '800',
                    color: colors.white
                },
                headerTitleAlign: "center",
                headerLeft: () => (<DrawerBackButtonComponent color={colors.white} onPress={() => navigation.navigate(prevScreen)} />)
            }
        )}} />

        <Drawer.Screen name="EventList" component={EventListScreen} options={({navigation, route}) => {
            const title = route?.params?.title ?? "All Events!"
            const prevScreen = route?.params?.prevScreen ?? "Profile"
            return ({
                headerTitle: () => (<Text style={{fontSize:sizes.fontTitle,textTransform: 'capitalize', fontWeight:'800',color:colors.white,fontFamily:fonts.bold}}>{title}</Text>),
                headerStyle: {
                    backgroundColor: colors.dark
                },
                headerTitleStyle: {
                    fontWeight: '800',
                    color: colors.white
                },
                headerTitleAlign: "center",
                headerLeft: () => (<DrawerBackButtonComponent color={colors.white} onPress={() => navigation.navigate(prevScreen)} />)
            }
        )}} />

        <Drawer.Screen name="EventScreen" component={SingleEventScreen} options={({navigation, route}) => {
            const title = route?.params?.event?.services ?? "Event"
            const prevScreen = route?.params?.prevScreen ?? "Home"
            return ({
                headerTitle: () => (<Text style={{fontSize:sizes.fontTitle,textTransform: 'capitalize', fontWeight:'800',color:colors.white,fontFamily:fonts.bold,color: colors.white}}>{title}</Text>),
                headerTitleAlign: "center",
                headerShadowVisible: false,
                headerStyle: {
                    backgroundColor: colors.dark
                },
                headerTitleStyle: {
                    fontWeight: '800',
                    color: colors.white
                },
                headerLeft: () => (<DrawerBackButtonComponent color={colors.white} onPress={() => navigation.navigate(prevScreen)} />)
            }
        )}} />

        <Drawer.Screen name="AllEventsScreen" component={AllEventsScreen} options={({navigation, route}) => {
            const title = "All Events"
            const prevScreen = route?.params?.prevScreen ?? "Home"
            return ({
                headerTitle: () => (<Text style={{fontSize:sizes.fontTitle,textTransform: 'capitalize', fontWeight:'800',color:colors.white,fontFamily:fonts.bold,color: colors.white}}>{title}</Text>),
                headerTitleAlign: "center",
                headerShadowVisible: false,
                headerStyle: {
                    backgroundColor: colors.dark
                },
                headerTitleStyle: {
                    fontWeight: '800',
                    color: colors.white
                },
                headerLeft: () => (<DrawerBackButtonComponent color={colors.white} onPress={() => navigation.navigate(prevScreen)} />)
            }
        )}} />

        <Drawer.Screen name="PostScreen" component={SinglePostScreen} options={({navigation, route}) => {
            const title = route?.params?.post?.title ?? "Post"
            const prevScreen = route?.params?.prevScreen ?? "Quicks"
            return ({
                headerTitle: () => (<Text style={{fontSize:sizes.fontTitle,textTransform: 'capitalize', fontWeight:'800',color:colors.white,fontFamily:fonts.bold}}>{title}</Text>),
                headerTitleAlign: "center",
                headerShadowVisible: false,
                headerStyle: {
                    backgroundColor: colors.dark
                },
                headerTitleStyle: {
                    fontWeight: '800',
                    color: colors.white
                },
                headerLeft: () => (<DrawerBackButtonComponent color={colors.white} onPress={() => navigation.navigate(prevScreen, {userId : route?.params?.post?.creatorId})} />)
            }
        )}} />

        <Drawer.Screen name="PostEdit" component={PostFormScreen} options={({navigation, route}) => ({
            headerTitle: "Add Post",
            headerStyle: {
                backgroundColor: colors.dark
            },
            headerTitleStyle: {
                fontWeight: '800',
                color: colors.white
            },
            headerTitleAlign: "center",
            headerLeft: () => (<DrawerBackButtonComponent color={colors.white} onPress={() => navigation.navigate('Profile')} />)
        })} />
        
        <Drawer.Screen name='Notifications' component={NotificationsScreen} options={({navigation, route}) => ({
                headerTitle: "Notifications",
                headerStyle: {
                    backgroundColor: colors.dark
                },
                headerTitleStyle: {
                    fontWeight: '800',
                    color: colors.white
                },
                headerTitleAlign: "center",
                headerLeft: () => (<LogoXLComponent />),
                headerRight: () => (<DrawerMenuButtonComponent onPress={() => navigation.dispatch( DrawerActions.toggleDrawer() )} />),
            })}
        />

        {/* <Drawer.Screen name='Country' component={CountryListScreen} options={({navigation, route}) => ({
                headerTitle: "Countries",
                headerStyle: {
                    backgroundColor: colors.dark
                },
                headerTitleStyle: {
                    fontWeight: '800',
                    color: colors.white
                },
                headerTitleAlign: "center",
                headerLeft: () => (<LogoXLComponent />),
                headerRight: () => (<DrawerMenuButtonComponent onPress={() => navigation.dispatch( DrawerActions.toggleDrawer() )} />),
            })}
        />
        <Drawer.Screen name='Language' component={LanguagesScreen} options={({navigation, route}) => ({
                headerTitle: "Languages",
                headerStyle: {
                    backgroundColor: colors.dark
                },
                headerTitleStyle: {
                    fontWeight: '800',
                    color: colors.white
                },
                headerTitleAlign: "center",
                headerLeft: () => (<LogoXLComponent />),
                headerRight: () => (<DrawerMenuButtonComponent onPress={() => navigation.dispatch( DrawerActions.toggleDrawer() )} />),
            })}
        /> */}
        <Drawer.Screen name='Help' component={HelpScreen} options={({navigation, route}) => ({
                headerTitle: "Help",
                headerStyle: {
                    backgroundColor: colors.dark
                },
                headerTitleStyle: {
                    fontWeight: '800',
                    color: colors.white
                },
                headerTitleAlign: "center",
                headerLeft: () => (<LogoXLComponent />),
                headerRight: () => (<DrawerMenuButtonComponent onPress={() => navigation.dispatch( DrawerActions.toggleDrawer() )} />),
            })}
        />
        <Drawer.Screen name='PrivacyPolicy' component={PrivacyPolicyScreen} options={({navigation, route}) => ({
                headerTitle: "Privacy Policy",
                headerStyle: {
                    backgroundColor: colors.dark
                },
                headerTitleStyle: {
                    fontWeight: '800',
                    color: colors.white
                },
                headerTitleAlign: "center",
                headerLeft: () => (<LogoXLComponent />),
                headerRight: () => (<DrawerMenuButtonComponent onPress={() => navigation.dispatch( DrawerActions.toggleDrawer() )} />),
            })}
        />
    </Drawer.Navigator>
  )
}

export default DrawerNavigator;

const DrawerContent = ( {navigation} ) => {
  const { user, onSignOut } = useTogsContext();
    return (
        <View style={{
            flex: 1,
            backgroundColor: colors.white
        }}>
        
            {/* Branding */}
            <View
                style={{
                    justifyContent:"center",
                    alignItems:"center",
                    paddingTop: 60,
                    paddingBottom: 10,
                    backgroundColor: colors.dark,
                }}
            >
                <LogoXLComponent />

                <AppBarRightSectionComponent
                    onMenu={() => navigation.dispatch( DrawerActions.openDrawer() )}
                    style={{
                        position:"absolute",
                        right: 20,
                        top: 65
                    }}
                />

            </View>

            {/* Profile Info */}
            <View
                style={{
                    flexDirection: "row",
                    gap: 20,
                    justifyContent:"space-between",
                    alignItems:"center",
                    paddingVertical: 20,
                    paddingHorizontal: 30,
                    backgroundColor: colors.dark,
                    borderBottomRightRadius: 10,
                    borderBottomLeftRadius: 10,
                }}
            >

                {/* User's Profile Pic & Name */}
                {
                    user?.photoURL ?
                        (<UserAvatarComponent source={{uri: user.photoURL}} />)
                        :
                        (<DefaultUserAvatarComponent />)
                }

                {/* User Info */}
                <View
                    style={{
                        justifyContent:"center",
                        alignItems:"flex-start",
                        flex: 1
                    }}
                >
                    <Text
                        style={{
                            fontSize: 18,
                            fontWeight: '700',
                            color: colors.white,
                            marginBottom: 5
                        }}
                    >
                        {user?.displayName ?? 'Anonymous'}
                    </Text>

                    <Text
                        style={{
                            fontSize: 12,
                            fontWeight: '400',
                            color: colors.white
                        }}
                    >
                        {user?.email ?? ''}
                    </Text>
                </View>

                {/* Edit Button */}
                <TouchableOpacity
                    style={{
                        backgroundColor: colors.white,
                        borderRadius: 8,
                        paddingHorizontal: 20,
                        paddingVertical: 10
                    }}
                    onPress={() => navigation.navigate( "Profile", {path: 'profile'} )}
                >
                    <Text style={{color: colors.dark, fontSize: 15, fontWeight: '500'}}>Edit Profile</Text>
                </TouchableOpacity>

            </View>

            <DrawerContentScrollView>

                <SectionLabel label="My Account" />
                <CustomDrawerItem label="My Profile" iconName={require( `../assets/drawer-icons/profile-circle.png`)} onPress={() => navigation.navigate( "Profile", {path: 'profile'} )} />
        
                <SectionLabel label="Settings" />
                <CustomDrawerItem label="Notifications" iconName={require( `../assets/drawer-icons/notification.png`)} onPress={() => navigation.navigate( "Notifications" )} />
                {/* <CustomDrawerItem label="Country" iconName={require( `../assets/drawer-icons/global.png`)} onPress={() => navigation.navigate( "Country" )} /> */}
                {/* <CustomDrawerItem label="Language" iconName={require( `../assets/drawer-icons/flag.png`)} onPress={() => navigation.navigate( "Language" )} /> */}
                {/* <CustomDrawerItem label="Preferences" iconName={require( `../assets/drawer-icons/candle-2.png`)} onPress={() => navigation.navigate( "Preferences" )} /> */}
                <CustomDrawerItem label="Help" iconName={require( `../assets/drawer-icons/message-question.png`)} onPress={() => navigation.navigate( "Help" )} />
                <CustomDrawerItem label="Privacy Policy" iconName={require( `../assets/drawer-icons/document-text.png`)} onPress={() => navigation.navigate( "PrivacyPolicy" )} />
        
                {/* <DrawerItem
                    label="Home"
                    labelStyle={styles.drawerLabel}
                    onPress={()=> navigation.navigate("Home")}
                />*/}

                {/* <View style={{flex:1}} /> */}
                

            </DrawerContentScrollView>

            {/* SIGN OUT BUTTON */}
            <TouchableOpacity
                style={{
                    justifyContent:"center",
                    alignItems:"center",
                    flexDirection:"row",
                    height: 52,
                    borderRadius: 50,
                    backgroundColor: '#EA433517',
                    marginVertical: 35,
                    marginHorizontal: 20,
                }}
                onPress={ async () => {
                    await onSignOut();
                    navigation.dispatch( DrawerActions.closeDrawer() );
                }}
            >
                <AntDesign name="logout" size={24} color="red" />
                <Text
                    style={{
                        color:"red",
                        fontWeight:"bold",
                        marginLeft: 20
                    }}
                >
                    Sign Out
                </Text>
            </TouchableOpacity>
        
        </View>
    )
}

const CustomDrawerItem = (props) => {
    return (
      <TouchableOpacity
        style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 30,
            borderBottomWidth: 1,
            borderBottomColor: "#D1D5DB",
            paddingHorizontal: 20,
            paddingVertical: 15
        }}
        onPress={props.onPress}
      >
        <Image
            source={props.iconName}
            style={{
                width: 28,
                height: 28
            }}
        />

        <View
            style={{
                flex:1,
                justifyContent: "flex-start"
            }}
        >
            <Text
                style={{
                    fontSize: 14,
                    fontWeight:"500",
                    letterSpacing: 0.5
                }}
            >{props.label}</Text>
        </View>
        <SimpleLineIcons name="arrow-right" size={20} color="#D1D5DB" />
      </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    drawerLabel:{
      color: colors.colorWhite,
      backgroundColor: colors.labelBg,
      paddingHorizontal:20,
      margin:0,
      width:"100%",
      height:45,
      marginBottom: 4,
    },
    input: {
      width: 200,
      height: 44,
      marginTop: 20,
      marginBottom: 60,
      marginHorizontal:36,
      backgroundColor:colors.colorWhite,
      padding: 10,
      paddingRight:44,
      borderRadius:5
    },
});