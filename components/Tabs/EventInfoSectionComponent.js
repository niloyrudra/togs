import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

// Icons
import { SimpleLineIcons } from '@expo/vector-icons'

// Components
import DefaultUserAvatarComponent from '../DefaultUserAvatarComponent'
import NoDataNoticeComponent from '../NoDataNoticeComponent'
import UserAvatarComponent from '../UserAvatarComponent'

// Constants
import colors from '../../constants/colors'
import CardWithoutImageComponent from './partials/CardWithoutImageComponent'
import CardWithImageComponent from './partials/CardWithImageComponent'

// Number of events or users to show on the section's left part
const num = 5;

const EventInfoSectionComponent = ({title, sectionData=[], noDataMsg, isPeopleMet=null}) => {
    const navigation = useNavigation()
  return (
    <View>
        <Text style={styles.eventTitle}>{title}</Text>
        <TouchableOpacity
            style={styles.container}
            onPress={ isPeopleMet ? () => navigation.navigate( "UserList", { people: sectionData, title: title }) : () => navigation.navigate( "EventList", { events: sectionData, title: title } ) }
            disabled={ sectionData?.length ? false : true }
        >
            <View
                style={{
                    flexDirection:"row"
                }}
            >
                {
                    sectionData?.length > 0
                    ?
                        isPeopleMet 
                        ?                     
                            sectionData.map( (item, index) => (
                                item?.photoURL
                                ?
                                    (
                                        <View
                                            key={item?.userId}
                                        >
                                            <UserAvatarComponent
                                                source={{uri: item.photoURL}}
                                                style={{
                                                    width: 50,
                                                    height: 50,
                                                    borderRadius: 25,
                                                    marginRight: -20
                                                }}
                                            />
                                        </View>
                                    )
                                : 
                                    (<DefaultUserAvatarComponent
                                        key={item?.userId}
                                        style={{
                                            width: 50,
                                            height: 50,
                                            borderRadius: 25,
                                            marginRight: -20
                                        }}
                                    />)
                                                                
                            ))

                        :
                            sectionData.slice(0, num)?.map( (item, index) => {
                                return item.image != "" ?
                                    (<CardWithImageComponent key={item.id} image={item.image} style={styles.eventThumb} />)
                                    :
                                    (<CardWithoutImageComponent key={item.id} style={styles.eventThumb} />)
                            })
                    :
                        (<NoDataNoticeComponent message={noDataMsg} />)
                }
            </View>

            <View style={styles.arrowContainer}>
                <Text
                    style={styles.arrow}
                >+{sectionData.length}</Text>
                <SimpleLineIcons name="arrow-right" size={15} color="black" />
            </View>

        </TouchableOpacity>
    </View>
  )
}

export default EventInfoSectionComponent

const styles = StyleSheet.create({
    container: {
        borderRadius: 7,
        backgroundColor: colors.white,
        padding: 10,
        flexDirection: 'row',
        justifyContent:"space-between",
        alignItems: "center",

        marginHorizontal: 5,

        elevation: 3,
        shadowColor: colors.shadowColor,
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.5,
        shadowRadius: 3,
    },
    eventTitle: {
        marginBottom: 10
    },
    eventThumb: {
        width: 92,
        height: 103,
        borderRadius: 7,
        marginRight: -60,
        borderWidth: 1,
        borderColor: colors.white,
    },
    arrowContainer: {
        flexDirection: 'row',
        justifyContent:"space-between",
        alignItems: "center",
        gap: 10
    },
    arrow: {
        color: '#8E8E93',
        fontSize:16,
        fontWeight: '400'
    }
})