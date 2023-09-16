import React from 'react'
import { View, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native';

// Components
import ButtonComponent from "./ButtonComponent"

// Constants
import fonts from '../constants/fonts';
import colors from '../constants/colors'
import sizes from '../constants/sizes'

const BackHomeButtonComponent = () => {
    const navigation = useNavigation();
    return (
        <View
            style={{
                marginVertical: 15,
                marginHorizontal: 15,
                gap: 20
            }}
            >
            <Text
                style={{
                    fontFamily: fonts.regular,
                    fontSize: sizes.fontText,
                    color:colors.infoColor,
                }}
            >No Notifications available yet.</Text>
            <ButtonComponent
                label="Go Back"
                onPress={() => navigation.navigate("Home")}
                
                bgColor={colors.dark}
            />
        </View>
    )
};

export default BackHomeButtonComponent;