import { StyleSheet, Text, View, Image, Dimensions } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { BackHandler } from 'react-native'

// Components
import StatWidgetComponent from '../../components/StatWidgetComponent'
import BannerPlaceholderComponent from '../../components/BannerPlaceholderComponent'
import DefaultBannerPlaceholderComponent from '../../components/DefaultBannerPlaceholderComponent'

// Constants
import colors from '../../constants/colors'
import fonts from '../../constants/fonts'
import sizes from '../../constants/sizes'

const WIDTH = Dimensions.get('screen').width - 40;

const SinglePostScreen = ({navigation, route}) => {
    const [post, setPost] = React.useState( route?.params?.post ?? {} )

    const handleBackButtonClick = () => {
        navigation.jumpTo("HomeTab");
        return true;
    }

    React.useEffect(() => setPost( prevVal => prevVal = route?.params?.post ), [ route?.params?.post?.id ])
      
    React.useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
        return () => {
          BackHandler.removeEventListener("hardwareBackPress", handleBackButtonClick);
        };
    }, []);

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
                    onPress={() => console.log( 'Like/Dislike the current post' )}
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


        <Text style={styles.postMeta}>
            <Text>Created by: <Text style={{ textTransform:'uppercase', fontStyle:'italic' }}>{post?.creator?.name}</Text></Text>
        </Text>
        <Text style={styles.postMeta}>
            <Text>Created at: <Text style={{ textTransform:'uppercase', fontStyle:'italic' }}>{post?.createdAt}</Text></Text>
        </Text>

        <Text style={styles.postDescription}>
            {post?.content}
        </Text>
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
        marginBottom: 30,
        letterSpacing: 0.5,
        color: colors.textColor,
        fontFamily: fonts.regular,
        fontWeight: '500'
    }
})