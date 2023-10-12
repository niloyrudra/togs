import { StyleSheet, Text, View, Share, Dimensions } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { BackHandler } from 'react-native'

// Components
import StatWidgetComponent from '../../components/StatWidgetComponent'
import BannerPlaceholderComponent from '../../components/BannerPlaceholderComponent'
import DefaultBannerPlaceholderComponent from '../../components/DefaultBannerPlaceholderComponent'

// Modal
import CommentModal from './CommentModal'

// Constants
import colors from '../../constants/colors'
import fonts from '../../constants/fonts'
import sizes from '../../constants/sizes'
const WIDTH = Dimensions.get('screen').width - 40;

// Context
import { useTogsContext } from '../../providers/AppProvider'
import AuthorComponent from '../../components/AuthorComponent'

const SinglePostScreen = ({navigation, route}) => {
    
    const commentRef = React.useRef()
    const {user, onToggleLikePost, onSharePost, getUserById } = useTogsContext();
    
    const [post, setPost] = React.useState( route?.params?.post ?? {} )
    const [ creator, setCreator ] = React.useState(null);
    const [ isLiked, setIsLiked ] = React.useState( route?.params?.post?.likes?.includes( user?.userId ))
    const [ shared, setShared ] = React.useState( route?.params?.post?.shares?.length )
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
    const toggleLikesPostHandler = async () => {
        try {
            setIsLiked(prevVal => prevVal = !prevVal)
            await onToggleLikePost( post, user?.userId )
            if( post?.likes?.includes( user?.userId ) ) {
                setPost( prevValue => prevValue = {
                    ...prevValue,
                    likes: [
                        ...prevValue?.likes?.filter( uId => uId != user?.userId )
                    ]
                } )
            }
            else {

                setPost( prevValue => prevValue = {
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
            message: `${post?.title}\r\n\r\n"${post?.content}"\r\n\r\nCreated at ${post?.createdDate}.`, // 'React Native | A framework for building native apps using React',
          });

          if (result.action === Share.sharedAction) {
            if (result.activityType) {
              // shared with activity type of result.activityType
              console.log( "Action Activity Type", result.activityType )
            } else {
              // shared
              await onSharePost(post)
              setShared(prevVal => prevVal = route?.params?.post?.shares?.length)
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

        setPost( prevVal => prevVal = route?.params?.post )
        setIsLiked( prevVal => prevVal =  route?.params?.post?.likes?.includes( user?.userId ))
        setShared( prevVal => prevVal =  route?.params?.post?.shares?.length )

        const update = async () => {
            try {
                // await onGetPostComments( route?.params?.post?.id )
                const postCreator = await getUserById( route?.params?.post?.creatorId );
                setCreator(prevValue => prevValue = postCreator);
            }
            catch (err) {
                console.log( err )
            }
        }
        update()
    }, [ route?.params?.post?.id ])

  return (
    <View style={styles.container}>
        <StatusBar
            animated={true}
            style="light"
        />
        
        <View
            style={{
                marginBottom: 10,
                elevation: 4,
                backgroundColor: colors.infoColor,
                borderRadius: 10
            }}
        >
            {
                post?.image && !post?.image.includes("file://") ?
                    (<BannerPlaceholderComponent source={post.image} style={styles.banner} />)
                    :
                    (<DefaultBannerPlaceholderComponent style={styles.banner} />)
            }
        </View>

        <View
            style={{
                width:"100%",
                flexDirection:'row',
                justifyContent:"space-between",
                alignItems:"center"
            }}
        >
            <View>
                <Text style={styles.postTitle}>{ post?.title}</Text>
            </View>

            {/* Widgets */}
            <View style={{
                flexDirection: "row",
                justifyContent:"space-between",
                gap: 20
            }}>
                <StatWidgetComponent
                    count={post?.likes?.length ?? 0}
                    counterBelow={true}
                    iconName="heart"
                    style={{
                        width: 25,
                        height: 25,
                        tintColor: isLiked ? colors.accentColor : colors.infoColor
                    }}
                    onPress={toggleLikesPostHandler}
                />
                <StatWidgetComponent
                    count={post?.commentCount ?? 0}
                    counterBelow={true}
                    iconName="message"
                    style={{
                        width: 25,
                        height: 25,
                    }}
                    onPress={() => setShowCommentModal(true)}
                />
                <StatWidgetComponent
                    count={post?.shares?.length ?? 0}
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


        <AuthorComponent creator={creator} pathName="ProfileAlt" />

        <Text style={styles.postMeta}>
            <Text>Created at: <Text style={{ textTransform:'uppercase', fontStyle:'italic' }}>{post?.createdAt}</Text></Text>
        </Text>

        <Text style={styles.postDescription}>
            {post?.content}
        </Text>

        {
            showCommentModal &&
            (<CommentModal
                refEle={commentRef}
                navigation={navigation}
                isVisible={showCommentModal}
                onClose={() => setShowCommentModal(false)}
                post={post}
            />)
        }

    </View>
  );
}

export default SinglePostScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:"flex-start",
        alignItems:"flex-start",
        paddingVertical: 30,
        paddingHorizontal: 20
    },
    banner: {
        width: WIDTH, // '100%',
        height: WIDTH * 0.6,
        borderRadius: 10,
    },
    postTitle: {
        fontSize: 24,
        marginTop: 30,
        marginBottom: 10,
        letterSpacing: 0.5,
        color: colors.primaryColor,
        fontFamily: fonts.bold,
        fontWeight: '800',
        textTransform: 'capitalize'
    },
    postSubTitle: {
        fontSize: 20,
        // marginTop: 20,
        marginBottom: 10,
        letterSpacing: 0.5,
        color: colors.secondaryColor,
        fontFamily: fonts.bold,
        fontWeight: '800',
        textTransform: 'uppercase'
    },
    postMeta: {
        fontSize: sizes.fontSubTitle,
        marginBottom: 5,
        letterSpacing: 0.25,
        color: colors.subHeadingColor,
        fontFamily: fonts.regular,
        fontWeight: '500'
    },
    postDescription: {
        fontSize: sizes.fontText,
        marginTop: 20,
        marginBottom: 30,
        letterSpacing: 0.5,
        color: colors.textColor,
        fontFamily: fonts.regular,
        fontWeight: '500'
    }
})