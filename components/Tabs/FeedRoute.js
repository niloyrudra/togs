import { StyleSheet, View, TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'
// Navigation
import { useNavigation } from '@react-navigation/native';

// Components
import CardWithoutImageComponent from './partials/CardWithoutImageComponent';
import CardWithImageComponent from './partials/CardWithImageComponent';
import NoDataNoticeComponent from '../NoDataNoticeComponent';

const FeedRoute = ( {eventsData=[]} ) => {
    const navigation = useNavigation()
    return (
      <View
        style={{
          flex: 1,
          paddingTop: 20,
        }}
      >
        {
            eventsData?.length > 0
                ?
                (<View
                  style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    gap: 5
                  }}
                >
                  {
                    eventsData?.map((item) => (
                      <TouchableOpacity
                          style={{
                              margin: 4,
                              borderRadius: 15,
                              width: Dimensions.get("screen").width / 4,
                              height: Dimensions.get("screen").width / 4,
                          }}
                          key={Math.random().toString()}
                          onPress={() => navigation.navigate( 'EventScreen', {event: item, prevScreen: 'Profile'} ) }
                      >
                          {
                            (item.image && !item.image.includes('file:')) ?
                              (
                                <CardWithImageComponent image={item?.image} />
                              )
                              :
                              (
                                <CardWithoutImageComponent title={item?.title ?? ''} />
                              )
                          }
                          
                      </TouchableOpacity>
                    ))  
                    }
                    </View>
                  )
                // (
                    // <FlatList
                    //     data={eventsData}
                    //     keyExtractor={item => item?.id}
                    //     numColumns={numCols}
                    //     renderItem={({item, index}) => {
                    //     return (
                    //       <TouchableOpacity
                    //           style={{
                    //               margin: 4,
                    //               flex: 1,
                    //           }}
                    //           onPress={() => navigation.navigate( 'EventScreen', {event: item, prevScreen: 'Profile'} ) }
                    //       >
                    //           {
                    //             (item.image && !item.image.includes('file:')) ?
                    //               (
                    //                 <CardWithImageComponent image={item?.image} />
                    //               )
                    //               :
                    //               (
                    //                 <CardWithoutImageComponent title={item?.title ?? ''} />
                    //               )
                    //           }
                              
                    //       </TouchableOpacity>
                    //     )}}
                    //     ListFooterComponent={(
                    //       <View style={{marginTop: 100}}/>
                    //     )}
                    // />
                // )
                :
                (
                    <NoDataNoticeComponent message="No Events are available now. Please Try Later!" />
                )
        }

    </View>
  )
};

export default FeedRoute

const styles = StyleSheet.create({})