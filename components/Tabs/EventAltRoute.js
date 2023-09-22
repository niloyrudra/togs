import { Image, View, FlatList, TouchableOpacity, Nestab } from 'react-native'
import React from 'react'
// Navigation
import { useNavigation } from '@react-navigation/native';

// Components
import NoDataNoticeComponent from '../NoDataNoticeComponent';

// Constants
import colors from '../../constants/colors';

const EventAltRoute = ({ numCols=3, ownedEvents=[]}) => {

    const navigation = useNavigation();
  
    const [createdEvents, setCreatedEvents] = React.useState([]);
  
    React.useEffect(() =>  setCreatedEvents( prevValue => prevValue = ownedEvents),[ownedEvents.length])
  
    return (
        <View
          style={{
            flex: 1,
            paddingTop: 20,
            gap: 20,
            position: 'relative'
          }}
        >

          {
            createdEvents.length > 0
              ?
              (
                  <FlatList
                      data={createdEvents}
                      // keyExtractor={item => item.id}
                    //   scrollEnabled={false}
                    // listOptionProps={{nestedScrollEnabled: true}}
                    // nestedScrollEnabled={true}
                    // scrollViewProps={{
                    //             nestedScrollEnabled: true,
                    //             scrollEnabled: true,
                    //             decelerationRate: "normal" // normal, fast
                    //         }}
                      key={Math.random().toString()}
                      numColumns={numCols}
                      renderItem={({item, index}) => {
                      return (
                        <TouchableOpacity
                            style={{
                                margin: 4,
                                flex: 1,
                            }}
                            onPress={() => navigation.navigate( 'EventScreen', {event: item, prevScreen: 'ProfileAlt'} ) }
                        >
                            {
                            item.image ?
                                (
                                <View
                                    style={{
                                    flexGrow:1,
                                    // shadow
                                        elevation: 4,
                                        shadowColor: colors.shadowColor,
                                        shadowOffset: {width: -2, height: 4},
                                        shadowOpacity: 0.5,
                                        shadowRadius: 3,
                
                                        margin:2
                                    }}
                                >
                                    <Image
                                    source={{uri:item.image}}
                                    style={{
                                        flexGrow:1,
                                        width: '100%',
                                        height: '100%',
                                        maxWidth: 120,
                                        maxHeight: 120,
                                        borderRadius: 8,
                                    }}
                                    />
                                </View>
                                )
                                :
                                (
                                <View
                                    style={{
                                    flex:1,
                                    backgroundColor: colors.secondaryColor
                                    }}
                                />
                                )
                            }
                            
                        </TouchableOpacity>
                      )}}
                      ListFooterComponent={(
                      <View style={{marginTop: 100}}/>
                      )}
                  />
              )
              :
              (
                <NoDataNoticeComponent message="No events available now. Please Try Later!" />
              )
          }
    
        </View>
  
    )
};

export default EventAltRoute