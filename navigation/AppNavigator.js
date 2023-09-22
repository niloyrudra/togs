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
import ActivityIndicatorComponent from '../components/ActivityIndicatorComponent'

const AppNavigator = () => {
  
  const { user } = useTogsContext();

  const [ isLoggedInUser, setIsLoggedInUser ] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    // onAuthStateChanged returns an subscriber
    let unsubscribeAuth = auth.onAuthStateChanged( async (authenticatedUser) => {
      try {
        await authenticatedUser ? setIsLoggedInUser(prevValue => prevValue = true) : setIsLoggedInUser(prevValue => prevValue = false);
        setIsLoading(prevValue => prevValue = false);
      } catch (error) {
        console.log("error>>> ", error);
        setIsLoading(prevValue => prevValue = false);
      }
    }, [user]);

    // unsubscribe auth listener on unmount
    return () => {
     if(unsubscribeAuth) unsubscribeAuth();
    }
   
  });

  if (isLoading) return (<ActivityIndicatorComponent />);

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