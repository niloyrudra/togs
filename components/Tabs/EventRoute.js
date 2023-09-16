import { StyleSheet, Image, View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { FloatingAction } from 'react-native-floating-action';
// Navigation
import { useNavigation } from '@react-navigation/native';
// Icons
import { Ionicons, SimpleLineIcons } from '@expo/vector-icons';

// Components
import NoDataNoticeComponent from '../NoDataNoticeComponent';

// Context
import { useTogsContext } from '../../providers/AppProvider';

// Constants
import colors from '../../constants/colors';

const EventRoute = ({ownedEvents=[]}) => {

    const navigation = useNavigation();
    const { user, events, users } = useTogsContext();
  
    const [visitedEvents, setVisitedEvents] = React.useState([]);
    const [peopleMet, setPeopleMet] = React.useState([]);
  
    React.useEffect(() => {
      if( user?.userId ) {
        const eventsVisited = events?.length ? events?.filter( event => user.visitedEvents.includes(event.id)) : [];

        setVisitedEvents(previousValue => previousValue = eventsVisited)

        let peopleMetList = [];
        peopleMetList = ownedEvents?.reduce((acc, curr) => {
          if( curr?.joinedUsers?.length ) {
            let newAcc = [...acc, ...curr?.joinedUsers]
            acc = [...new Set(newAcc)];
          }
          return acc;
        }, []);

        if( peopleMetList?.length ) {
          const peopleMetArr = users?.length ? users.filter( user => peopleMetList?.includes( user?.userId ) ) : [];
          setPeopleMet( previousValue => previousValue = peopleMetArr );
        }
      }
    },[user?.userId, ownedEvents?.length])
  
    return (
      <ScrollView>
        <View
          style={{
            flex: 1,
            paddingTop: 20,
            gap: 20,
            position: 'relative'
          }}
        >
  
          {/* Events Attended */}
          <View>
            <Text style={styles.eventTitle}>Events Attended</Text>
            <TouchableOpacity
              style={{
                borderRadius: 7,
                backgroundColor: colors.white,
                padding: 10,
                flexDirection: 'row',
                justifyContent:"space-between",
                alignItems: "center"
              }}
              onPress={() => navigation.navigate("EventList", {events: visitedEvents } ) }
              disabled={ visitedEvents?.length ? false : true }
            >
              <View
                style={{
                  flexDirection:"row"
                }}
              >
                {
                  visitedEvents?.length > 0 ?
                    visitedEvents?.map( (item, index) => (
                      <Image
                        key={item.id}
                        source={{uri: item.image}}
                        style={{
                          width: 92,
                          height: 103,
                          borderRadius: 7,
                          marginRight: -60
                        }}
                      />
                    ))
                    :
                    (
                      <NoDataNoticeComponent message="No visited events yet!" />
                    )
                }
              </View>
  
              <View
              style={{
                flexDirection: 'row',
                justifyContent:"space-between",
                alignItems: "center",
                gap: 10
              }}
              >
                <Text
                  style={{
                    color: '#8E8E93',
                    fontSize:16,
                    fontWeight: '400'
                  }}
                >+{visitedEvents.length}</Text>
                <SimpleLineIcons name="arrow-right" size={15} color="black" />
              </View>
  
            </TouchableOpacity>
          </View>
  
          {/* People you meet */}
          <View>
            <Text style={styles.eventTitle}>People you met</Text>
            <TouchableOpacity
              style={{
                borderRadius: 7,
                backgroundColor: colors.white,
                padding: 10,
                flexDirection: 'row',
                justifyContent:"space-between",
                alignItems: "center"
              }}
              onPress={() => navigation.navigate("UserList", {people: peopleMet})}
              disabled={ peopleMet.length ? false : true }
            >
              <View
                style={{
                  flexDirection:"row"
                }}
              >
                {
                  peopleMet.length > 0
                    ?
                      peopleMet.map( (item, index) => (
                        item.photoURL ?
                          (<Image
                          key={item.userId}
                          source={{uri: item.photoURL}}
                          style={{
                            width: 36,
                            height: 36,
                            borderRadius: 18,
                            marginRight: -20
                          }}
                        />)
                        : (
                          <Image
                          key={item.userId}
                          source={require("../../assets/user/avatar.png")}
                          style={{
                            width: 36,
                            height: 36,
                            borderRadius: 18,
                            marginRight: -20
                          }}
                        />
                        )
                        
                        
                      ))
                    :
                      (
                        <NoDataNoticeComponent message="No person you met yet!" />
                      )
                }
              </View>
  
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent:"space-between",
                  alignItems: "center",
                  gap: 10
                }}
              >
                <Text
                  style={{
                    color: '#8E8E93',
                    fontSize:16,
                    fontWeight: '400'
                  }}
                >+{peopleMet.length}</Text>
                <SimpleLineIcons name="arrow-right" size={15} color="black" />
              </View>
  
            </TouchableOpacity>
          </View>
  
          {/* Add Event Button */}
          <View style={{
            marginTop: 50,
            // position:'relative'
          }}>      
            <FloatingAction
              floatingIcon={<Ionicons name="add-outline" style={{marginTop:0}} size={50} color={colors.white} />}
              onPressMain={() => navigation.navigate('EventEdit')}
              position='right'
              
              
              // actions={actions}
              // actionsPaddingTopBottom={10}
              // onPressItem={
              //   (name) => {
              //     console.log(`selected button: ${name}`);
              //   }
              // }
            />
          </View>
  
        </View>
  
      </ScrollView>
    )
};

export default EventRoute

const styles = StyleSheet.create({})