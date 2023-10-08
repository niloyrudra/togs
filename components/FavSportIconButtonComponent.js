import { StyleSheet, Image, View, TouchableOpacity } from 'react-native'
import React from 'react'

// Constants
import colors from '../constants/colors'

const FavSportIconButtonComponent = ( {item, onSelect} ) => {
    const [ selected, setSelected ] = React.useState( false )
    return (
        <View>
            <TouchableOpacity
                style={{
                    ...styles.radio,
                    borderWidth: selected ? 3 : 0,
                    borderColor: selected ? '#4F8EFD' : ''
                }}
                onPress={() => {
                    setSelected( prevVal => prevVal = !prevVal )
                    onSelect( prevValue => (prevValue.includes( item.id ))? prevValue = prevValue.filter( itemId => itemId != item.id ) : prevValue = [ ...prevValue, item.id ] )
                }}
            >
                { selected && <Image source={require('../assets/icons/tick.png')} style={styles.tick} />}
                <Image
                    source={item.image}
                    style={{
                        width: item.id == 3 ? 75 : 50,
                        height: 50
                    }}
                />
            </TouchableOpacity>
        </View>
    );
}

export default FavSportIconButtonComponent

const styles = StyleSheet.create({
    radio: {
        position:"relative",
        width:100,
        height:100,
        backgroundColor: colors.white,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tick: {
        position:"absolute",
        top: -5,
        right: 2,
        width: 20,
        height: 20
    }
})