import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar';

import { useFocusEffect } from '@react-navigation/native';

// Components
import NotificationsListCardComponent from '../../components/NotificationListCardComponent';
import BackHomeButtonComponent from '../../components/BackHomeButtonComponent';
import ActivityIndicatorComponent from '../../components/ActivityIndicatorComponent'

// Constants
import fonts from '../../constants/fonts';
import colors from '../../constants/colors'
import sizes from '../../constants/sizes'

// Native Notify
import { getNotificationInbox } from 'native-notify';

const NotificationsScreen = ({navigation}) => {
  const [data, setData] = React.useState([]);
  const [ isLoading, setIsLoading ] = React.useState(false)

  useFocusEffect(
    React.useCallback(() => {
      const getNotifications = async () => {
        try {
          setIsLoading(true)
          let notifications = await getNotificationInbox('<TOKEN-ID>', '<TOKEN>');
          // console.log("notifications: ", notifications);
          setData(prevValue => prevValue = notifications ?? []);
          setIsLoading(false)
        }
        catch(e) {
          console.log("Error: ", e)
          setIsLoading(false)
        }
      }
      getNotifications();

      return () => {
        setData([])
      }
    }, [getNotificationInbox])
  );

  if( isLoading ) return (<ActivityIndicatorComponent />);

  return (
    <View style={styles.container}>
      <StatusBar
        animated={true}
        style="light"
      />

      <View
        style={styles.content}
      >
        <Text style={styles.title}>Notifications</Text>
        {
          data?.length ? 
            (
              <FlatList
                data={data}
                keyExtraction= {item => item?.notification_id}
                renderItem={({item, index}) => (
                  <NotificationsListCardComponent item={item} />
                )}
                ListFooterComponent={
                  <View style={{height:50}} />
                }
              />
            )
            :
            (
              <BackHomeButtonComponent />
            )
        }
      </View>

    </View>
  )
}

export default NotificationsScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:"center",
    alignItems:"center",
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  content: {
    flex:1,
    width:"100%"
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: sizes.fontTitle,
    color: colors.primaryColor,
    marginBottom: 10
  }
});
