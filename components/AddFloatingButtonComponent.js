import React from 'react'
import { FloatingAction } from 'react-native-floating-action'

// Icons
import { Ionicons } from '@expo/vector-icons';

const AddFloatingButtonComponent = ({size, color, onTap, position, style=null}) => {
  return (
    <FloatingAction
        floatingIcon={<Ionicons name="add-outline" style={{...style}} size={size} color={color} />}
        onPressMain={onTap}
        position={position}
        // actions={actions}
        // actionsPaddingTopBottom={10}
        // onPressItem={
        //   (name) => {
        //     console.log(`selected button: ${name}`);
        //   }
        // }
    />
  )
}

export default AddFloatingButtonComponent;