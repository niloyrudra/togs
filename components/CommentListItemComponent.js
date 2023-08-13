import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import fonts from '../constants/fonts'
import colors from '../constants/colors'

const CommentListItemComponent = ({comment}) => {
  return (
    <View
        style={{
            justifyContent:"center",
            marginBottom: 10,
            paddingVertical: 8,
            paddingHorizontal: 12,
            borderWidth: 1,
            borderColor: '#e5e5e5',
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            borderTopRightRadius: 10
        }}
    >
        <View
            style={{
                flexDirection:"row",
                alignItems:"center",
                justifyContent:"space-between",
                borderBottomWidth: 1,
                borderBottomColor: '#e5e5e5',
            }}
        >
            <View
                style={{
                    flexDirection:"row",
                    alignItems:"center",
                    marginBottom: 6
                }}
            >
                {
                    comment?.creator?.photoURL ?
                    (
                        <Image
                            source={{uri: comment.creator.photoURL}}
                            style={{
                                width: 30,
                                height: 30,
                                borderRadius: 15,
                                marginRight: 10
                            }}
                        />
                    )
                    :
                    (
                        <Image
                            source={require('../assets/user/user-icon-3.png')}
                            style={{
                                width: 30,
                                height: 30,
                                borderRadius: 15,
                                marginRight: 10
                            }}
                        />
                    )
                }
                <Text style={styles.userName}>{comment?.creator?.name}</Text>
            </View>
            <View>
                <Text style={styles.date}>{comment?.createdAt}</Text>
            </View>
        </View>
        <View
            style={{marginTop: 8}}
        >
            <Text style={styles.comment}>{comment?.comment}</Text>
        </View>
    </View>
  )
}

export default CommentListItemComponent

const styles = StyleSheet.create({
    userName: {
        fontFamily: fonts.bold,
        fontWeight: '800',
        color: colors.primaryColor
    },
    date: {
        fontFamily: fonts.regular,
        color: colors.infoColor
    },
    comment: {
        fontFamily: fonts.italic,
        color: colors.secondaryColor
    }
})