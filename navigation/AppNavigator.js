import { View, ActivityIndicator } from 'react-native'
import React from 'react'

// Navigation
import { NavigationContainer } from '@react-navigation/native'

// Firebase
import { auth } from '../config/firebase.config'

// Context API
import { AppContext } from '../providers/AppProvider'

// Stack Navigators
// import MainStackNavigator from './MainStackNavigator'
import AuthStackNavigator from './AuthStackNavigator'
import DrawerNavigator from './DrawerNavigator'

const AppNavigator = () => {
  
  const { user } = React.useContext(AppContext);
  const [ isLoggedInUser, setIsLoggedInUser ] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    // onAuthStateChanged returns an unsubscriber
    const unsubscribeAuth = auth.onAuthStateChanged(async (authenticatedUser) => {
      try {
        setIsLoading(false);
        await authenticatedUser ? setIsLoggedInUser(true) : setIsLoggedInUser(false);

        

      } catch (error) {
        console.log("error>>> ", error);
      }
    }, [user]);
    // unsubscribe auth listener on unmount
    return unsubscribeAuth();
  });

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size='large' />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {
        isLoggedInUser
          ?
            <DrawerNavigator />
          :
            <AuthStackNavigator />
      }
    </NavigationContainer>
  )
}

export default AppNavigator