import React from 'react'
import { TouchableOpacity } from 'react-native'

// Icon
import { Ionicons } from '@expo/vector-icons';


const DrawerBackButtonComponent = ({onPress, size=26, color='black'}) => {
    return (
        <TouchableOpacity
            style={{marginLeft: 10}}
            onPress={onPress}
        >
            <Ionicons name="chevron-back" size={size} color={color} />
        </TouchableOpacity>

    );
}

export default DrawerBackButtonComponent;