import { StyleSheet, Text, View, Image, Dimensions } from 'react-native'
import React from 'react'

// Constants
import colors from '../../constants/colors'
import fonts from '../../constants/fonts'
import sizes from '../../constants/sizes'

const SinglePostScreen = ({route}) => {
    const [post, setPost] = React.useState( route?.params?.post ?? {} )

    React.useEffect(() => setPost( prevVal => prevVal = route?.params?.post ), [ route?.params?.post?.id ])

  return (
    <View style={styles.container}>
        <Image
            source={post?.img}
            style={{
                width: '100%',
                height: Dimensions.get('screen').width * 0.6,
                borderRadius: 10
            }}
        />
        <Text style={styles.postTitle}>{ post?.title}</Text>
        <Text style={styles.postMeta}>
            {post?.metaData}
        </Text>
        <Text style={styles.postDescription}>
            {post?.description}
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
    postTitle: {
        fontSize: 24,
        marginTop: 30,
        marginBottom: 10,
        letterSpacing: 0.5,
        color: colors.primaryColor,
        fontFamily: fonts.bold,
        fontWeight: '800'
    },
    postMeta: {
        fontSize: sizes.fontSubTitle,
        marginBottom: 20,
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