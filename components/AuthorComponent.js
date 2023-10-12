import { StyleSheet, TouchableOpacity, Text, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const AuthorComponent = ({creator, pathName="Profile"}) => {
    const navigation = useNavigation();
  return (
    <TouchableOpacity
        style={{
            justifyContent: "flex-start",
            alignItems: "center",
            flexDirection: "row",
            marginBottom: 10
        }}
        onPress={() => navigation.navigate(pathName, {userId: creator?.userId})}
    >
        <Image
            source={creator?.photoURL ? {uri: creator?.photoURL} : require('../assets/user/avatar-alt.jpg')}
            style={{
                width:35,
                height:35,
                borderRadius: 18,
                marginRight: 10,
            }}
        />
        <Text style={styles.meta}>{creator?.displayName ?? "Anonymous"}</Text>
    </TouchableOpacity>
  )
}

export default AuthorComponent;

const styles = StyleSheet.create({
    meta: {
        textTransform:'uppercase',
        fontStyle:'italic'
    }
});