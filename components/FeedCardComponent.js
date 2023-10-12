import { StyleSheet, Text, View, TouchableOpacity, Image, Share, Alert, Dimensions } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

// Components
import FeedImageTitleComponent from './FeedImageTitleComponent'

// Modal
import CommentModal from "../screens/Post/CommentModal"

// Widgets
import StatWidgetComponent from './StatWidgetComponent'

// Constants
import colors from '../constants/colors'
import fonts from '../constants/fonts'

// Context
import { useTogsContext } from '../providers/AppProvider'

const FeedCardComponent = ({ item, onPress, commentCount=null }) => {
    const navigation = useNavigation()

    const commentRef = React.useRef()
    const {user, onGetPostComments, onToggleLikePost, onSharePost, getUserById } = useTogsContext();

    const [likesCount, setLikesCount] = React.useState(item?.likes?.length ?? 0)

    const [ creator, setCreator ] = React.useState(null);
    const [ isLiked, setIsLiked ] = React.useState(false)
    const [ shared, setShared ] = React.useState(0)

    const [ showCommentModal, setShowCommentModal ] = React.useState(false)
    const [ postCommentsCount, setPostCommentsCount ] = React.useState( commentCount != null ? commentCount : 0)

    // Handlers
    // Like Action Handler
    const toggleLikesPostHandler = async () => {
        try {
            setIsLiked(prevVal => prevVal = !prevVal)
            await onToggleLikePost( item, user?.userId )
            if( item?.likes?.length && item?.likes?.includes( user?.userId ) ) setLikesCount( prevValue => prevValue -= 1 )
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
            message: `${post?.title}\r\n\r\n"${post?.content}"\r\n\r\nCreated at ${post?.createdDate}.`, // 'React Native | A framework for building native apps using React',
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
                count={item?.commentCount ?? 0}
                iconName="message"
                // disabled={true}
                onPress={() => setShowCommentModal(true)}
            />
            <StatWidgetComponent
                count={item?.shares?.length ?? 0}
                iconName="export"
                // disabled={true}
                onPress={onShare}
            />
        </View>

        {
            showCommentModal &&
            (<CommentModal
                refEle={commentRef}
                navigation={navigation}
                isVisible={showCommentModal}
                onClose={() => setShowCommentModal(false)}
                post={item}
            />)
        }

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