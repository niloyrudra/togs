import { StyleSheet, Text, View, Image, Dimensions } from 'react-native'
import React from 'react'

// Components
import StatWidgetComponent from '../../components/StatWidgetComponent'

// Constants
import colors from '../../constants/colors'
import fonts from '../../constants/fonts'
import sizes from '../../constants/sizes'
import { StatusBar } from 'expo-status-bar'

const SinglePostScreen = ({route}) => {
    const [post, setPost] = React.useState( route?.params?.post ?? {} )

    React.useEffect(() => setPost( prevVal => prevVal = route?.params?.post ), [ route?.params?.post?.id ])

  return (
    <View style={styles.container}>
        <StatusBar
            style="dark"
        />
        {
            post?.image ?
                (
                    <Image
                        source={{uri: post.image}}
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
        width: '100%',
        height: Dimensions.get('screen').width * 0.6,
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