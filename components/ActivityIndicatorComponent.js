import React from 'react'
import { View, ActivityIndicator } from 'react-native'

// Constants
import colors from '../constants/colors'
import sizes from '../constants/sizes'

const ActivityIndicatorComponent = ({customColor=null, customSize=null}) => (
    <View
      style={{
        flex:1,
        justifyContent: 'center',
        alignItems: "center"
      }}
    >
      <ActivityIndicator size={customSize ?? sizes.xxlLoader} color={customColor ?? colors.primaryColor} />
    </View>
);

export default ActivityIndicatorComponent;