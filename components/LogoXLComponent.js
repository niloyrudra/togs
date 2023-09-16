import React from 'react'
import { Image, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const LogoXLComponent = () => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity
            onPress={() => navigation.navigate("Home")}
        >
            <Image
                source={require( '../assets/logo/logo-xl.png' )}
                style={{
                    width: 95,
                    height: 36,
                    marginHorizontal: 20
                }}
            />
        </TouchableOpacity>
    );
}

export default LogoXLComponent;