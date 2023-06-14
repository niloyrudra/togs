import { StyleSheet, Text, View, Dimensions, Image } from 'react-native'
import React from 'react'

// Constants
import colors from '../../constants/colors'
import fonts from '../../constants/fonts'
import sizes from '../../constants/sizes'
import { StatusBar } from 'expo-status-bar'

// Components
import StatWidgetComponent from '../../components/StatWidgetComponent'

// Context
import { useTogsContext } from '../../providers/AppProvider'

const SingleEventScreen = ({route}) => {

    const {user, onUpdateListOfUserVisitedEvents} = useTogsContext()
    const [event, setEvent] = React.useState( route?.params?.event ?? {} )

    React.useEffect(() => {
        setEvent( prevVal => prevVal = route?.params?.event )
        const update = async () => {
            await onUpdateListOfUserVisitedEvents(user, route.params.event.id)
        }
        update()
    }, [ route?.params?.event?.id ])

  return (
    <View style={styles.container}>

        <StatusBar
            style="dark"
        />

        {
            event?.image ?
                (
                    <Image
                        source={{uri: event.image}}
                        style={styles.banner}
                    />
                )
                :
                (
                    <View
                        style={{...styles.banner,backgroundColor: colors.secondaryColor}}
                    />
                )
        }

        <View
            style={{
                width:"100%",
                flexDirection:'row',
                justifyContent:"space-between",
                alignItems:"center"
            }}
        >
            <View>
                <Text style={styles.eventTitle}>{ event?.services}</Text>
                <Text style={styles.eventSubTitle}>{event?.activities}</Text>
            </View>

            {/* Footer */}
            <View style={{
                flexDirection: "row",
                justifyContent:"space-between",
                gap: 20
            }}>
                <StatWidgetComponent
                    // count={0} // {item.likes}
                    iconName="heart"
                    style={{
                        width: 25,
                        height: 25,
                    }}
                    onPress={() => console.log( 'Like/Dislike the current event' )}
                />
                <StatWidgetComponent
                    // count={0} // {item.comments}
                    iconName="message"
                    style={{
                        width: 25,
                        height: 25,
                    }}
                    onPress={() => console.log( 'Show Messages' )}
                />
                <StatWidgetComponent
                    // count={0} // {item.share}
                    iconName="export"
                    style={{
                        width: 25,
                        height: 25,
                    }}
                    onPress={() => console.log( 'Share Messages' )}
                />
            </View>

        </View>


        <Text style={styles.eventMeta}>
            <Text>Created by: <Text style={{ textTransform:'uppercase', fontStyle:'italic' }}>{event?.creator?.name}</Text></Text>
        </Text>
        <Text style={styles.eventMeta}>
            <Text>Created at: <Text style={{ textTransform:'uppercase', fontStyle:'italic' }}>{event?.createdAt}</Text></Text>
        </Text>

        <Text style={styles.eventDescription}>
            {event?.content}
        </Text>
    </View>
  );
}

export default SingleEventScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:"flex-start",
        alignItems:"flex-start",
        paddingVertical: 30,
        paddingHorizontal: 20
    },
    banner: {
        width: '100%',
        height: Dimensions.get('screen').width * 0.6,
        borderRadius: 10,
    },
    eventTitle: {
        fontSize: 24,
        marginTop: 30,
        marginBottom: 10,
        letterSpacing: 0.5,
        color: colors.primaryColor,
        fontFamily: fonts.bold,
        fontWeight: '800',
        textTransform: 'capitalize'
    },
    eventSubTitle: {
        fontSize: 20,
        // marginTop: 20,
        marginBottom: 10,
        letterSpacing: 0.5,
        color: colors.secondaryColor,
        fontFamily: fonts.bold,
        fontWeight: '800',
        textTransform: 'uppercase'
    },
    eventMeta: {
        fontSize: sizes.fontSubTitle,
        marginBottom: 5,
        letterSpacing: 0.25,
        color: colors.subHeadingColor,
        fontFamily: fonts.regular,
        fontWeight: '500'
    },
    eventDescription: {
        fontSize: sizes.fontText,
        marginVertical: 30,
        letterSpacing: 0.5,
        color: colors.textColor,
        fontFamily: fonts.regular,
        fontWeight: '500'
    }
})