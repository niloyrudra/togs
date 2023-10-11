import React from 'react'
import { Image, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const LogoXLComponent = ({style=null}) => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity
            onPress={() => navigation.navigate("Home")}
        >
            <Image
                source={require( '../assets/logo/logoXL.png' )}
                style={style ? {...style} : {
                    width: 95,
                    // height: 36,
                    marginHorizontal: 20,
                }}
                resizeMode='contain'
                fadeDuration={300}
            />
        </TouchableOpacity>
    );
}

export default LogoXLComponent;