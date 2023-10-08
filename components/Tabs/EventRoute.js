import { StyleSheet, View, ScrollView } from 'react-native'
import React from 'react'

// Navigation
import { useNavigation } from '@react-navigation/native';

// Components
import AddFloatingButtonComponent from '../AddFloatingButtonComponent';

// Context
import { useTogsContext } from '../../providers/AppProvider';

// Constants
import colors from '../../constants/colors';
import EventInfoSectionComponent from './EventInfoSectionComponent';

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
      <>
        <ScrollView>
          <View style={styles.container}>
            {/* Events Organized */}
            <EventInfoSectionComponent title="Event Organized" sectionData={ownedEvents} noDataMsg="No events organised!" />
            {/* Events Attended */}
            <EventInfoSectionComponent title="Event Attended" sectionData={visitedEvents} noDataMsg="No visited events!" />
            {/* People you meet */}
            <EventInfoSectionComponent title="People you met" sectionData={peopleMet} noDataMsg="No person you met yet!" isPeopleMet />
          </View>
        </ScrollView>

        {/* Add Event Button */}
        <AddFloatingButtonComponent size={50} color={colors.white} position="right" style={{marginTop:0}} onTap={() => navigation.navigate('EventEdit')} />
      </>
    )
};

export default EventRoute

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    gap: 20,
    position: 'relative'
  }
});