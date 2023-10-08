import { Image, View, SafeAreaView, TouchableOpacity, Nestab, ScrollView } from 'react-native'
import React from 'react'
// Navigation
import { useNavigation } from '@react-navigation/native';

// Components
import NoDataNoticeComponent from '../NoDataNoticeComponent';
import CardWithoutImageComponent from './partials/CardWithoutImageComponent'
import CardWithImageComponent from './partials/CardWithImageComponent'


// Constants
import colors from '../../constants/colors';

const EventAltRoute = ({ownedEvents=[]}) => {

    const navigation = useNavigation();
  
    const [createdEvents, setCreatedEvents] = React.useState([]);
  
    React.useEffect(() =>  setCreatedEvents( prevValue => prevValue = ownedEvents),[ownedEvents.length])
  
    return (
      <SafeAreaView>

        <ScrollView>

          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              paddingTop: 10,
              paddingBottom: 30,
            }}
          >
            {
              createdEvents.length > 0
                ?
                (
                  createdEvents.map((item, index) => (
                    <TouchableOpacity
                      key={item.id}
                      style={{
                        margin: 4,
                        flexGrow: 1,
                        width: "100%",
                        maxWidth: 120,
                        maxHeight: 120
                      }}
                      onPress={() => navigation.navigate( 'EventScreen', {event: item, prevScreen: 'ProfileAlt'} ) }
                    >
                      {
                        (item.image && item?.image.includes("firebasestorage")) ?
                          (
                            <CardWithImageComponent image={item?.image} />
                          )
                          :
                          (
                            <CardWithoutImageComponent />
                          )
                      }
                    </TouchableOpacity>
                  ))

                )
                :
                (
                  <NoDataNoticeComponent message="No events available now. Please Try Later!" />
                )
            }
      
          </View>

        </ScrollView>

      </SafeAreaView>
  
    )
};

export default EventAltRoute