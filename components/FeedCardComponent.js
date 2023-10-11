import { StyleSheet, Text, View, TouchableOpacity, Image, Share, Alert } from 'react-native'
import React from 'react'

// Components
import FeedImageTitleComponent from './FeedImageTitleComponent'

// Constants
import colors from '../constants/colors'
import fonts from '../constants/fonts'
import StatWidgetComponent from './StatWidgetComponent'

// Context
import { useTogsContext } from '../providers/AppProvider'
import { Dimensions } from 'react-native'

const FeedCardComponent = ({ item, onPress, commentCount=null }) => {

    const { user, getUserById, onToggleLikePost, onSharePost } = useTogsContext();

    const [likesCount, setLikesCount] = React.useState(item?.likes?.length ?? 0)

    const [ creator, setCreator ] = React.useState(null);
    const [ isLiked, setIsLiked ] = React.useState(false)
    const [ shared, setShared ] = React.useState(0)

    const [ showCommentModal, setShowCommentModal ] = React.useState(false)
    const [postCommentsCount, setPostCommentsCount] = React.useState( commentCount != null ? commentCount : 0)

    // Handlers
    // Like Action Handler
    const toggleLikesPostHandler = async () => {
        try {
            setIsLiked(prevVal => prevVal = !prevVal)
            await onToggleLikePost( item, user?.userId )
            if( item.likes.includes( user?.userId ) ) setLikesCount( prevValue => prevValue -= 1 )
            else setLikesCount( prevValue => prevValue += 1 )
        }
        catch( err ) {
            console.error( err )
        }
    }

    // Share Action Handler
    const onShare = async () => {
        try {
          const result = await Share.share({
            message: `"${item?.content}" - created at ${item?.createdAt}.`, // 'React Native | A framework for building native apps using React',
          });

          if (result.action === Share.sharedAction) {
            if (result.activityType) {
              // shared with activity type of result.activityType
              console.log( "Action Activity Type", result.activityType )
            } else {
              // shared
              const newItem = await onSharePost(item)
              setShared(prevVal => prevVal = newItem?.shares?.length)
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
        const update = async () => {
            try {
                const postCreator = await getUserById( item?.creatorId );
                setCreator(prevValue => prevValue = postCreator);
                setIsLiked( prev => prev = item?.likes?.includes( user?.userId ) )
            }
            catch (err) {
                console.log( err )
            }
        }
        update();
    }, [ item?.id ]);

  return (
    <View style={styles.topContainer}>
    
        {/* Top Section - Post Details */}
        <TouchableOpacity
            onPress={onPress}
        >

            {/* Content */}
            <View style={{...styles.content, justifyContent: 'space-between'}}>
                {/* Title */}
                <FeedImageTitleComponent title={creator?.displayName ?? "Anonymous"} img={creator?.photoURL ?? null}  />
                {/* Time */}
                {
                    item?.startDate && (
                        <View>
                            <Text style={styles.time}>{item.startDate}</Text>
                        </View>
                    )
                }
                {
                    !item?.startDate && item?.createdAt && (
                        <View>
                            <Text style={styles.time}>{item.createdAt.substring( item.createdAt.length-11, item.createdAt.length ).trim()}</Text>
                        </View>
                    )
                }
            </View>

            {/* Description */}
            {
                item?.content && (
                    <View style={styles.content}>
                        <Text style={styles.info}>
                            {/* {item.content.substring(0, 150)} */}
                            {item.content}
                        </Text>
                    </View>
                )
            }

            {/* Gallery */}
            <View style={styles.content}>
                {
                    item?.image && (
                        <Image
                            key={Math.random().toString()}
                            source={{uri: item.image}}
                            style={{
                                // width: '32.5%', // 106,
                                width: '100%', // 106,
                                height: Dimensions.get('screen').width * 0.6,
                                borderRadius: 7
                            }}
                        />
                    )
                }

            </View>

        </TouchableOpacity>

        {/* Footer */}
        <View style={styles.footer}>
            <StatWidgetComponent
                count={likesCount}
                style={{
                    tintColor: ( isLiked ) ? colors.accentColor : colors.infoColor
                }}
                iconName="heart"
                // disabled={true}
                onPress={toggleLikesPostHandler}
            />
            <StatWidgetComponent
                count={postCommentsCount}
                iconName="message"
                // disabled={true}
                onPress={() => console.log("MESSAGES")}
            />
            <StatWidgetComponent
                count={item?.shares?.length ?? 0}
                iconName="export"
                // disabled={true}
                onPress={onShare}
            />
        </View>

    </View>

  )
}

export default FeedCardComponent

const styles = StyleSheet.create({
    topContainer: {
        width: Dimensions.get("screen").width - 40,
        backgroundColor: colors.white,
        borderRadius: 7,
        marginHorizontal: 5,
        marginTop: 5,
        marginBottom: 10,
        padding: 15,
        // width: 230, // 229
        overflow: 'hidden',

        elevation: 5,
        shadowColor: colors.shadowColor,
        shadowRadius: 5,
        shadowOffset: 5,
        shadowOpacity: 5
    },
    content: {
        flexDirection:"row",
        gap: 6,
        alignItems:"center",
        marginBottom: 15,
        // marginVertical: 15,
    },
    time: {
        color: colors.textColor,
        fontSize: 14,
        fontWeight: '700',
        fontFamily: fonts.bold
    },
    info: {
        color: colors.infoColor,
        fontSize: 12,
        fontWeight: '500'
    },
    footer: {
        flexDirection: "row",
        justifyContent: "space-between",
        borderTopWidth: 1,
        borderTopColor: '#eee',
        paddingTop: 12
    }
})