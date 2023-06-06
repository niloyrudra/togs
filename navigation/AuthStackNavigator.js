import { Text, TouchableOpacity } from 'react-native'
import React from 'react'

// Navigation
import { createNativeStackNavigator } from '@react-navigation/native-stack'
// import { createStackNavigator } from '@react-navigation/stack'

// Screens
import SignInScreen from '../screens/Authentication/SignInScreen'
import SignUpScreen from '../screens/Authentication/SignUpScreen'
import OTPScreen from '../screens/Authentication/OTPScreen'
import ForgotPasswordScreen from '../screens/Authentication/ForgotPasswordScreen'
import FavoriteSportsScreen from '../screens/Authentication/FavoriteSportsScreen'

// Constants
import colors from '../constants/colors'
import sizes from '../constants/sizes'

// Initiating Navigator
const AuthStack = createNativeStackNavigator()
// const AuthStack = createStackNavigator()

const AuthStackNavigator = () => {
  return (
    <AuthStack.Navigator
        initialRouteName='SignIn'
        screenOptions={({route, navigation}) => ({
            headerTintColor: colors.primaryColor,
            headerTitleAlign: "center",
            headerTitleStyle: {
                fontSize: 15,
                fontWeight: "800"
            },
            headerStyle: {
                backgroundColor: '#f5f5f5',
                shadowOpacity: 0,
                shadowOffset: {
                    height: 0,
                },
                shadowRadius: 0,
                elevation: 0,
                shadowColor: 'transparent',
            },
            headerBackTitleVisible: true,
            headerRight: () => {
               return(
                <TouchableOpacity
                        style={{
                            // width:24,
                            // height:24
                        }}
                        onPress={() => console.log('SKIP')}
                    >
                        <Text style={{fontSize:sizes.fontText, color: colors.primaryColor }}>SKIP</Text>
                    </TouchableOpacity>
                );
            }
        })}
    >
        <AuthStack.Screen name="SignIn" component={SignInScreen} options={{ title: "Login", hideShadow: true }} />
        <AuthStack.Screen name="SignUp" component={SignUpScreen} options={{ title: "Create An Account", hideShadow: true }} />
        <AuthStack.Screen name="FavoriteSports" component={FavoriteSportsScreen} options={{ title: "Favorite Sports", hideShadow: true }} />
        <AuthStack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{ headerShown: false }} />
        <AuthStack.Screen name="OTP" component={OTPScreen} options={{ headerShown: false }} />
    </AuthStack.Navigator>
  );
}

export default AuthStackNavigator;