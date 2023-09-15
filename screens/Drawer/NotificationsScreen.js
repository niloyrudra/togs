import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar';

import { useFocusEffect } from '@react-navigation/native';

// Components
import ButtonComponent from "../../components/ButtonComponent"

// Constants
import fonts from '../../constants/fonts';
import colors from '../../constants/colors'
import sizes from '../../constants/sizes'

// Native Notify
import { getNotificationInbox } from 'native-notify';

const NotificationsScreen = ({navigation}) => {
  const [data, setData] = React.useState([]);
  const [ isLoading, setIsLoading ] = React.useState(false)

  // React.useEffect(() => {
  //   const getNotifications = async () => {
  //     try {
  //       setIsLoading(true)
  //       let notifications = await getNotificationInbox(12157, 'DqP6T4qpTFV12fiBAMNLsL');
  //       console.log("notifications: ", notifications);
  //       setData(prevValue => prevValue = notifications ?? []);
  //       setIsLoading(false)
  //     }
  //     catch(e) {
  //       console.log("Error: ", e)
  //     }
  //   }
  //   getNotifications();
  // }, []);

  useFocusEffect(
    React.useCallback(() => {
      const getNotifications = async () => {
        try {
          setIsLoading(true)
          let notifications = await getNotificationInbox(12157, 'DqP6T4qpTFV12fiBAMNLsL');
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

  if( isLoading ) return (
    <View
      style={{
        flex:1,
        justifyContent: 'center',
        alignItems: "center"
      }}
    >
      <ActivityIndicator size={sizes.xxlLoader} color={colors.primaryColor} />
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar
        style="light"
      />

      <View
        style={{
          flex:1,
          width:"100%"
        }}
      >
        <Text
          style={{
            fontFamily: fonts.bold,
            fontSize: sizes.fontSubTitle,
            color: colors.infoColor,
            marginBottom: 10
          }}
        >
          Total notifications - {data.length}
        </Text>
        {
          data?.length ? 
            (
              <FlatList
                data={data}
                keyExtraction= {item => item?.notification_id}
                renderItem={({item, index}) => (
                  <TouchableOpacity
                    style={styles.list}
                    onPress={() => {}}
                  >
                    <View
                      style={{
                        flex:1,
                        // flexDirection:"row",
                        // alignItems:"center",
                        // justifyContent:"flex-start"
                      }}
                    >

                      <View
                        style={{
                          flex:1,
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: "flex-start"
                        }}
                      >
                        <View>
                          <Text style={styles.title}>{item?.title ?? 'Anonymous'}</Text>
                          <Text style={styles.message}>{item?.message}</Text>
                        </View>

                        <Text style={styles.date}>{item?.date}</Text>

                      </View>

                    </View>
                  </TouchableOpacity>
                )}
                ListFooterComponent={
                  <View style={{height:50}} />
                }
              />
            )
            :
            (
              <View
                style={{
                  marginVertical: 15,
                  marginHorizontal: 15,
                  gap: 20
                }}
              >
                <Text
                  style={{
                    fontFamily: fonts.regular,
                    fontSize: sizes.fontText,
                    color:colors.infoColor,
                  }}
                >No Notifications available yet.</Text>
                <ButtonComponent
                  label="Go Back"
                  onPress={() => navigation.navigate("Home")}
                  
                  bgColor={colors.dark}
                />
              </View>
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
  list: {
    marginVertical: 5,
    borderRadius: 10,
    marginHorizontal: 4,
    paddingVertical: 6,
    paddingHorizontal: 16,
    backgroundColor: colors.white,
     
    shadowColor: colors.shadowColor,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,

    elevation: 3,
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: sizes.fontSubTitle,
    fontWeight: '800',
    color: colors.secondaryColor
  },
  message: {
    fontFamily: fonts.italic,
    fontSize: sizes.fontText,
    fontWeight: '600',
    color: colors.infoColor
  },
  date: {
    fontFamily: fonts.italic,
    fontSize: 12,
    color: colors.infoColor
  }
})
