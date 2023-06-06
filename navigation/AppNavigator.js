import { View, ActivityIndicator } from 'react-native'
import React from 'react'

// Navigation
import { NavigationContainer } from '@react-navigation/native'

// Firebase
import { auth } from '../config/firebase.config'

// Context API
import { useTogsContext } from '../providers/AppProvider'

// Stack Navigators
import AuthStackNavigator from './AuthStackNavigator'
import DrawerNavigator from './DrawerNavigator'

const AppNavigator = () => {
  
  const { user } = useTogsContext();

  const [ isLoggedInUser, setIsLoggedInUser ] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {

    // console.log( "APA NAVIGATION SCREEN - user >> ", user)

    // onAuthStateChanged returns an subscriber
    const unsubscribeAuth = auth.onAuthStateChanged( async (authenticatedUser) => {
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