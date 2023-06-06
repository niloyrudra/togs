import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'

import { createDrawerNavigator, DrawerItemList, DrawerItem, DrawerContentScrollView } from '@react-navigation/drawer'
import { DrawerActions } from '@react-navigation/native';
// Icons
import { AntDesign, SimpleLineIcons, Ionicons } from '@expo/vector-icons';

// Contants
import colors from '../constants/colors';

// Screens
import CountryListScreen from '../screens/Drawer/CountryListScreen';
import HelpScreen from '../screens/Drawer/HelpScreen';
import NotificationsScreen from '../screens/Drawer/NotificationsScreen';
import PreferencesScreen from '../screens/Drawer/PreferencesScreen';
import LanguagesScreen from '../screens/Drawer/LanguagesScreen';
import PrivacyPolicyScreen from '../screens/Drawer/PrivacyPolicyScreen';
import WelcomeScreen from '../screens/Welcome/WelcomeScreen';
import TabNavigator from './TabNavigator';
import PostFormScreen from '../screens/Forms/PostFormScreen';
import EventFormScreen from '../screens/Forms/EventFormScreen';

// Components
import SectionLabel from '../components/SectionLabel';

// Context
import { useTogsContext } from '../providers/AppProvider';

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
            headerLeft: () => (
                <View style={{flex:1}} />
            ),
            headerTitle: () => (
                <View
                    style={{
                        paddingLeft: 20
                    }}
                >
                    <Image
                        source={require( '../assets/logo/logo-xl.png' )}
                        style={{
                            width: 95,
                            height: 36
                        }}
                    />
                </View>
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
                        onPress={() => navigation.dispatch( DrawerActions.toggleDrawer() ) }
                    >
                        <Image
                            source={require( '../assets/icons/setting.png' )}
                            style={{
                                width: 20,
                                height: 20
                            }}
                        />
                    </TouchableOpacity>

                </View>
            ),
            
        })}
        initialRouteName='Welcome'
    >
        <Drawer.Screen name='Welcome' component={WelcomeScreen} options={{ headerShown: false }} />

        <Drawer.Screen name='HomeTab' component={TabNavigator} options={{ headerShown: false }} />

        <Drawer.Screen name="EventEdit" component={EventFormScreen} options={({navigation, route}) => ({
            headerTitle: 'Host Event',
            headerTitleAlign: "center",
            headerShadowVisible: false,
            headerTitleStyle: {
                fontWeight: '800'
            },
            headerLeft: () => (
                <TouchableOpacity
                    style={{
                        marginLeft: 10
                    }}
                    onPress={() => navigation.navigate("Profile")}
                >
                    <Ionicons name="chevron-back" size={26} color="black" />
                </TouchableOpacity>
            )
        })} />
        <Drawer.Screen name="PostEdit" component={PostFormScreen} options={({navigation, route}) => ({
            headerTitle: "Add Post",
            headerTitleAlign: "center",
            headerShadowVisible: false,
            headerTitleStyle: {
            fontWeight: '800'
            },
            headerLeft: () => (
                <TouchableOpacity
                    style={{
                        marginLeft: 10
                    }}
                    onPress={() => navigation.navigate("Profile")}
                >
                    <Ionicons name="chevron-back" size={26} color="black" />
                </TouchableOpacity>
            )
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
                headerLeft: () => (
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
                            paddingRight: 20
                        }}
                    >
                        <TouchableOpacity
                            onPress={() => navigation.dispatch( DrawerActions.toggleDrawer() ) }
                        >
                            <Image
                                source={require( '../assets/icons/setting.png' )}
                                style={{
                                    width: 20,
                                    height: 20
                                }}
                            />
                        </TouchableOpacity>
                    </View>
                ),
            })}
        />

        <Drawer.Screen name='Country' component={CountryListScreen} options={({navigation, route}) => ({
                headerTitle: "Countries",
                headerStyle: {
                    backgroundColor: colors.dark
                },
                headerTitleStyle: {
                    fontWeight: '800',
                    color: colors.white
                },
                headerTitleAlign: "center",
                headerLeft: () => (
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
                            paddingRight: 20
                        }}
                    >
                        <TouchableOpacity
                            onPress={() => navigation.dispatch( DrawerActions.toggleDrawer() ) }
                        >
                            <Image
                                source={require( '../assets/icons/setting.png' )}
                                style={{
                                    width: 20,
                                    height: 20
                                }}
                            />
                        </TouchableOpacity>
                    </View>
                ),
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
                headerLeft: () => (
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
                            paddingRight: 20
                        }}
                    >
                        <TouchableOpacity
                            onPress={() => navigation.dispatch( DrawerActions.toggleDrawer() ) }
                        >
                            <Image
                                source={require( '../assets/icons/setting.png' )}
                                style={{
                                    width: 20,
                                    height: 20
                                }}
                            />
                        </TouchableOpacity>
                    </View>
                ),
            })}
        />
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
                headerLeft: () => (
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
                            paddingRight: 20
                        }}
                    >
                        <TouchableOpacity
                            onPress={() => navigation.dispatch( DrawerActions.toggleDrawer() ) }
                        >
                            <Image
                                source={require( '../assets/icons/setting.png' )}
                                style={{
                                    width: 20,
                                    height: 20
                                }}
                            />
                        </TouchableOpacity>
                    </View>
                ),
            })}
        />
        <Drawer.Screen name='Preferences' component={PreferencesScreen} options={({navigation, route}) => ({
                headerTitle: "Preferences",
                headerStyle: {
                    backgroundColor: colors.dark
                },
                headerTitleStyle: {
                    fontWeight: '800',
                    color: colors.white
                },
                headerTitleAlign: "center",
                headerLeft: () => (
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
                            paddingRight: 20
                        }}
                    >
                        <TouchableOpacity
                            onPress={() => navigation.dispatch( DrawerActions.toggleDrawer() ) }
                        >
                            <Image
                                source={require( '../assets/icons/setting.png' )}
                                style={{
                                    width: 20,
                                    height: 20
                                }}
                            />
                        </TouchableOpacity>
                    </View>
                ),
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
                headerLeft: () => (
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
                            paddingRight: 20
                        }}
                    >
                        <TouchableOpacity
                            onPress={() => navigation.dispatch( DrawerActions.toggleDrawer() ) }
                        >
                            <Image
                                source={require( '../assets/icons/setting.png' )}
                                style={{
                                    width: 20,
                                    height: 20
                                }}
                            />
                        </TouchableOpacity>
                    </View>
                ),
            })}
        />
    </Drawer.Navigator>
  )
}

export default DrawerNavigator;

const DrawerContent = ( {navigation} ) => {
  const { onSignOut } = useTogsContext();
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
                <View>
                    <Image
                        source={require( '../assets/logo/logo-xl.png' )}
                        style={{
                            width: 95,
                            height: 36
                        }}
                    />
                </View>

                <TouchableOpacity
                    style={{
                        position:"absolute",
                        right: 20,
                        top: 65
                    }}
                    onPress={() => navigation.dispatch( DrawerActions.closeDrawer() )}
                >
                    <Image
                        source={require( '../assets/icons/setting.png' )}
                        style={{
                            width: 20,
                            height: 20
                        }}
                    />
                </TouchableOpacity>

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
                <Image
                    source={require('../assets/user/user.png')}
                    style={{
                        width: 72,
                        height: 72,
                        borderRadius: 36
                    }}
                />

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
                        Jacob Johnson
                    </Text>

                    <Text
                        style={{
                            fontSize: 12,
                            fontWeight: '400',
                            color: colors.white
                        }}
                    >
                        jackoljohnsoxn@gmail.com
                    </Text>
                </View>

                {/* Edit Button */}
                <TouchableOpacity
                    style={{
                        backgroundColor: colors.white,
                        borderRadius: 8,
                        // height: 15,
                        // width: 67
                        paddingHorizontal: 20,
                        paddingVertical: 10
                    }}
                    onPress={() => console.log( 'Edit Button' )}
                >
                    <Text style={{color: colors.dark, fontSize: 15, fontWeight: '500'}}>Edit Profile</Text>
                </TouchableOpacity>

            </View>

            <DrawerContentScrollView>

                <SectionLabel label="My Account" />
                <CustomDrawerItem label="My Profile" iconName={require( `../assets/drawer-icons/profile-circle.png`)} onPress={() => navigation.navigate( "Profile", {path: 'profile'} )} />
        
                <SectionLabel label="Settings" />
                <CustomDrawerItem label="Notifications" iconName={require( `../assets/drawer-icons/notification.png`)} onPress={() => navigation.navigate( "Notifications" )} />
                <CustomDrawerItem label="Country" iconName={require( `../assets/drawer-icons/global.png`)} onPress={() => navigation.navigate( "Country" )} />
                <CustomDrawerItem label="Language" iconName={require( `../assets/drawer-icons/flag.png`)} onPress={() => navigation.navigate( "Language" )} />
                <CustomDrawerItem label="Preferences" iconName={require( `../assets/drawer-icons/candle-2.png`)} onPress={() => navigation.navigate( "Preferences" )} />
                <CustomDrawerItem label="Help" iconName={require( `../assets/drawer-icons/message-question.png`)} onPress={() => navigation.navigate( "Help" )} />
                <CustomDrawerItem label="Privacy Policy" iconName={require( `../assets/drawer-icons/document-text.png`)} onPress={() => navigation.navigate( "PrivacyPolicy" )} />
        
                {/* <DrawerItem
                    label="Home"
                    labelStyle={styles.drawerLabel}
                    onPress={()=> navigation.navigate("Home")}
                />*/}
        
                <TouchableOpacity
                    style={{
                        justifyContent:"center",
                        alignItems:"center",
                        flexDirection:"row",
                        height: 52,
                        borderRadius: 50,
                        backgroundColor: '#EA433517',
                        marginVertical: 35,
                        marginHorizontal: 20
                    }}
                    onPress={ async () => {
                        console.log("Sign Out")
                        await onSignOut();
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

            </DrawerContentScrollView>
        
        
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
  })