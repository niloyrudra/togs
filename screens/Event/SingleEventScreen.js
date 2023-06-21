import { StyleSheet, Text, View, Dimensions, Image, Share, Alert } from 'react-native'
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
import CommentModal from './CommentModal'
// import CommentListItemComponent from '../../components/CommentListItemComponent'
import { SafeAreaView } from 'react-native-safe-area-context'

const SingleEventScreen = ({ navigation, route}) => {

    const commentRef = React.useRef()

    const {user, comments, onUpdateListOfUserVisitedEvents, onGetComments, onToggleLikeEvent, onShareEvent } = useTogsContext()
    const [event, setEvent] = React.useState( route?.params?.event ?? {} )
    const [ isLiked, setIsLiked ] = React.useState( route?.params?.event?.likes?.includes( user?.userId ))
    const [ shared, setShared ] = React.useState( route?.params?.event?.shares?.length )
    const [showCommentModal, setShowCommentModal] = React.useState(false)
    
    // Like Action Handler
    const toggleLikesEventHandler = async () => {
        try {
            setIsLiked(prevVal => prevVal = !prevVal)
            await onToggleLikeEvent( event, user.userId )
            if( event.likes.includes( user.userId ) ) {
                setEvent( prevValue => prevValue = {
                    ...prevValue,
                    likes: [
                        ...prevValue.likes.filter( uId => uId != user.userId )
                    ]
                } )
            }
            else {

                setEvent( prevValue => prevValue = {
                    ...prevValue,
                    likes: [
                        ...prevValue.likes,
                        user.userId
                    ]
                } )
            }
        }
        catch( err ) {
            console.error( err )
        }
    }

    // Share Action Handler
    const onShare = async () => {
        try {
          const result = await Share.share({
            message: `"${event?.content}" - Event starts at ${event?.startDate} and ends at ${event?.endDate}.`, // 'React Native | A framework for building native apps using React',
          });

          if (result.action === Share.sharedAction) {
            if (result.activityType) {
              // shared with activity type of result.activityType
              console.log( "Action Activity Type", result.activityType )
            } else {
              // shared
              console.log( "Shared" )
              await onShareEvent(event)
              setShared(prevVal => prevVal = route?.params?.event?.shares?.length)
            }
          } else if (result.action === Share.dismissedAction) {
            // dismissed
            console.log("Dismissed!")
          }
        } catch (error) {
          Alert.alert(error.message);
        }
    };

    React.useEffect(() => {
        setEvent( prevVal => prevVal = route?.params?.event )
        setIsLiked( prevVal => prevVal =  route?.params?.event?.likes?.includes( user?.userId ))
        setShared( prevVal => prevVal =  route?.params?.event?.shares?.length )
        const update = async () => {
            try {
                await onUpdateListOfUserVisitedEvents( user, route.params.event.id )
                await onGetComments( route.params.event.id )
            }
            catch (err) {
                console.log( err )
            }
        }
        update()
    }, [ route?.params?.event?.id ])
    
    // console.log( event.likes )

  return (
    <SafeAreaView style={styles.container}>
        <StatusBar
            style="dark"
        />
        <View>

            {/* Banner */}
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

                {/* Widgets */}
                <View style={{
                    flexDirection: "row",
                    justifyContent:"space-between",
                    gap: 20
                }}>

                    <StatWidgetComponent
                        count={event.likes.length}
                        counterBelow={true}
                        iconName="heart"
                        style={{
                            width: 25,
                            height: 25,
                            tintColor: isLiked ? colors.accentColor : colors.infoColor
                        }}
                        onPress={toggleLikesEventHandler}
                    />
                    <StatWidgetComponent
                        count={ comments.filter(item => { if( item.eventId == event.id ) return item } )[0]?.data?.length }
                        counterBelow={true}
                        iconName="message"
                        style={{
                            width: 25,
                            height: 25,
                        }}
                        onPress={() => setShowCommentModal(true)}
                    />
                    <StatWidgetComponent
                        count={shared}
                        counterBelow={true}
                        iconName="export"
                        style={{
                            width: 25,
                            height: 25,
                        }}
                        onPress={onShare}
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

            {
                showCommentModal &&
                (<CommentModal
                    refEle={commentRef}
                    navigation={navigation}
                    isVisible={showCommentModal}
                    onClose={() => setShowCommentModal(false)}
                    eventId={event?.id}
                />)
            }

        </View>
    </SafeAreaView>
  );
}

export default SingleEventScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:"flex-start",
        alignItems:"flex-start",
        // paddingVertical: 30,
        paddingTop: 0,
        paddingBottom: 20,
        paddingHorizontal: 20
    },
    banner: {
        width: Dimensions.get('screen').width,
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