// import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';
// import * as Device from 'expo-device';
// import * as Notifications from 'expo-notifications';
import Constants from "expo-constants";

// Native Notify
import registerNNPushToken from 'native-notify';

// Context Provider
import { AppProvider } from './providers/AppProvider';

// Fonts
import { useFonts } from 'expo-font';

// Navigator
import AppNavigator from './navigation/AppNavigator';


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

const App = () => {
  registerNNPushToken(12157, 'DqP6T4qpTFV12fiBAMNLsL');
  
  let [ fontsLoaded ] = useFonts({
    'PJS-Bold': require( './fonts/PlusJakartaSans-Bold.ttf' ),
    'PJS-BoldItalic': require( './fonts/PlusJakartaSans-BoldItalic.ttf' ),
    'PJS-ExtraBold': require( './fonts/PlusJakartaSans-ExtraBold.ttf' ),
    'PJS-ExtraBoldItalic': require( './fonts/PlusJakartaSans-ExtraBoldItalic.ttf' ),
    'PJS-ExtraLight': require( './fonts/PlusJakartaSans-ExtraLight.ttf' ),
    'PJS-ExtraLightItalic': require( './fonts/PlusJakartaSans-ExtraLightItalic.ttf' ),
    'PJS-Italic': require( './fonts/PlusJakartaSans-Italic.ttf' ),
    'PJS-Light': require( './fonts/PlusJakartaSans-Light.ttf' ),
    'PJS-LightItalic': require( './fonts/PlusJakartaSans-LightItalic.ttf' ),
    'PJS-Medium': require( './fonts/PlusJakartaSans-Medium.ttf' ),
    'PJS-MediumItalic': require( './fonts/PlusJakartaSans-MediumItalic.ttf' ),
    'PJS-Regular': require( './fonts/PlusJakartaSans-Regular.ttf' ),
    'PJS-SemiBold': require( './fonts/PlusJakartaSans-SemiBold.ttf' ),
    'PJS-SemiBoldItalic': require( './fonts/PlusJakartaSans-SemiBoldItalic.ttf' ),
  });

  const onLayoutRootView = React.useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <AppProvider>
      <SafeAreaProvider onLayout={onLayoutRootView}>
        <StatusBar
          animated={true}
          style= "light" //"auto"
        />
        <AppNavigator />
      </SafeAreaProvider>
    </AppProvider>
  );
}

export default App;
