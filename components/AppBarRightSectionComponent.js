import { TouchableOpacity, View, Image } from 'react-native'
import React from 'react'

// Icons
import { Ionicons } from '@expo/vector-icons'

// Constants
import colors from '../constants/colors'

const AppBarRightSectionComponent = ({onNavigation=null, onMenu=null, style=null}) => {
  return (
    <View
        style={{
            flexDirection: 'row',
            gap: 16,
            paddingRight: 20,

            ...style
        }}
    >
        {onMenu && (
            <TouchableOpacity
                onPress={onMenu}
            >
                <Image
                    source={require( '../assets/icons/setting.png' )}
                    style={{
                        width: 20,
                        height: 20
                    }}
                />
            </TouchableOpacity>
        )}

        {onNavigation && (
            <TouchableOpacity
                onPress={onNavigation}
            >
                <Ionicons name="notifications-outline" size={20} color={colors.white} />
            </TouchableOpacity>
        )}

    </View>
  )
}

export default AppBarRightSectionComponent