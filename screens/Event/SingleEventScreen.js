import { StyleSheet, Text, View, Dimensions, Image, Share, Alert, ScrollView } from 'react-native'
import React from 'react'
import { BackHandler } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaView } from 'react-native-safe-area-context'
import moment from 'moment'

// Constants
import colors from '../../constants/colors'
import fonts from '../../constants/fonts'
import sizes from '../../constants/sizes'
const WIDTH = Dimensions.get('screen').width - 40;

// Components
import StatWidgetComponent from '../../components/StatWidgetComponent'
import BannerPlaceholderComponent from '../../components/BannerPlaceholderComponent'
import DefaultBannerPlaceholderComponent from '../../components/DefaultBannerPlaceholderComponent'
import EventJoinButtonComponent from '../../components/EventJoinButtonComponent'
import AuthorComponent from '../../components/AuthorComponent'

// Context
import { useTogsContext } from '../../providers/AppProvider'

// Modal
import CommentModal from './CommentModal'

const SingleEventScreen = ({ navigation, route}) => {

    const commentRef = React.useRef()

    const {user, onUpdateListOfUserVisitedEvents, onToggleLikeEvent, onShareEvent, getUserById } = useTogsContext();

    const [ creator, setCreator ] = React.useState(null);
    const [ event, setEvent ] = React.useState( route?.params?.event ?? {} )
    const [ isLiked, setIsLiked ] = React.useState( route?.params?.event?.likes?.includes( user?.userId ))
    const [ shared, setShared ] = React.useState( route?.params?.event?.shares?.length )
    const [ showCommentModal, setShowCommentModal ] = React.useState(false)
    
    function handleBackButtonClick() {
        navigation.jumpTo("HomeTab");
        return true;
    }
      
    React.useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
        return () => {
          BackHandler.removeEventListener("hardwareBackPress", handleBackButtonClick);
        };
    }, []);

    // Like Action Handler
    const toggleLikesEventHandler = async () => {
        try {
            setIsLiked(prevVal => prevVal = !prevVal)
            await onToggleLikeEvent( event, user?.userId )
            if( event.likes.includes( user?.userId ) ) {
                setEvent( prevValue => prevValue = {
                    ...prevValue,
                    likes: [
                        ...prevValue.likes.filter( uId => uId != user?.userId )
                    ]
                } )
            }
            else {

                setEvent( prevValue => prevValue = {
                    ...prevValue,
                    likes: [
                        ...prevValue.likes,
                        user?.userId
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
            message: `"${event?.title}"\r\n\r\n"${event?.content}"\r\n\r\nEvent starts at ${event?.startDate} and ends at ${event?.endDate}.`, // 'React Native | A framework for building native apps using React',
          });

          if (result.action === Share.sharedAction) {
            if (result.activityType) {
              // shared with activity type of result.activityType
              console.log( "Action Activity Type", result.activityType )
            } else {
              // shared
              await onShareEvent(event)
              setShared(prevVal => prevVal = route?.params?.event?.shares?.length)
              console.log( "Shared" )
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
                // await onGetComments( route.params.event.id )

                const eventCreator = await getUserById( route?.params?.event?.creatorId );
                setCreator(prevValue => prevValue = eventCreator);
            }
            catch (err) {
                console.log( err )
            }
        }
        update()
    }, [ route?.params?.event?.id ])
    
  return (
    <SafeAreaView style={styles.container}>
        <ScrollView
            style={{
                flex:1,
            }}
        >
            {/* Status Bar */}
            <StatusBar
                animated={true}
                style="light"
            />

            <View
                style={{
                    flex:1,
                    width: WIDTH,
                }}
            >

                {/* Banner */}
                <View
                    style={{
                        marginHorizontal: 5,
                        marginBottom: 10,
                        elevation: 4,
                        backgroundColor: colors.infoColor,
                        borderRadius: 10
                    }}
                >
                    {
                        event?.image && !event?.image.includes("file://") ?
                            (<BannerPlaceholderComponent source={event.image} style={styles.banner} />)
                            :
                            (<DefaultBannerPlaceholderComponent style={styles.banner} />)
                    }
                </View>

                <View
                    style={{
                        flexDirection:'row',
                        justifyContent:"space-between",
                        alignItems:"center"
                    }}
                >
                    <View>
                        <Text style={styles.eventTitle}>{ event?.title}</Text>
                        <Text style={styles.eventSubTitle}>{event?.services} | {event?.activities}</Text>
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
                            count={ event?.commentCount ?? 0 }
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

                {/* Creator Detail */}
                <AuthorComponent creator={creator} />

                <Text style={styles.eventMeta}>
                    <Text>Created at: <Text style={styles.meta}>{event?.createdAt}</Text></Text>
                </Text>

                <View
                    style={{
                        marginVertical: 10
                    }}
                >
                    <Text>Start on <Text style={styles.meta}>{event?.startDate ?? moment.format('Do/MMMM/YYYY')}</Text></Text>
                    <Text>End on <Text style={styles.meta}>{event?.startDate ?? moment.format('Do/MMMM/YYYY')}</Text></Text>
                </View>

                {/* Event Description/Content */}
                <View
                    style={{
                        flex:1,
                        marginVertical: 10
                    }}
                >
                    <Text style={styles.eventDescription}>
                        {event?.content}
                    </Text>
                </View>

            </View>

        </ScrollView>

        {/* Join Event */}
        <EventJoinButtonComponent event={event} />

        {
            showCommentModal &&
            (<CommentModal
                refEle={commentRef}
                navigation={navigation}
                isVisible={showCommentModal}
                onClose={() => setShowCommentModal(false)}
                event={event}
            />)
        }

    </SafeAreaView>
  );
}

export default SingleEventScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:"flex-start",
        alignItems:"flex-start",
        paddingHorizontal: 20
    },
    banner: {
        width: WIDTH - 10,
        height: (WIDTH - 10) * 0.6,
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
    },
    meta: {
        textTransform:'uppercase',
        fontStyle:'italic'
    }
})