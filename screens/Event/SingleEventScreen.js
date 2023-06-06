import { StyleSheet, Text, View, Dimensions, Image } from 'react-native'
import React from 'react'

// Constants
import colors from '../../constants/colors'
import fonts from '../../constants/fonts'
import sizes from '../../constants/sizes'

const SingleEventScreen = ({route}) => {
    const [event, setEvent] = React.useState( route?.params?.event ?? {} )

    React.useEffect(() => setEvent( prevVal => prevVal = route?.params?.event ), [ route?.params?.event?.id ])

  return (
    <View style={styles.container}>
        <Image
            source={event?.img}
            style={{
                width: '100%',
                height: Dimensions.get('screen').width * 0.6,
                borderRadius: 10
            }}
        />
        <Text style={styles.eventTitle}>{ event?.title}</Text>
        <Text style={styles.eventMeta}>
            {event?.metaData}
        </Text>
        <Text style={styles.eventDescription}>
            {event?.description}
        </Text>
    </View>
  );
}

export default SingleEventScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:"flex-start",
        alignItems:"flex-start",
        paddingVertical: 30,
        paddingHorizontal: 20
    },
    eventTitle: {
        fontSize: 24,
        marginTop: 30,
        marginBottom: 10,
        letterSpacing: 0.5,
        color: colors.primaryColor,
        fontFamily: fonts.bold,
        fontWeight: '800'
    },
    eventMeta: {
        fontSize: sizes.fontSubTitle,
        marginBottom: 20,
        letterSpacing: 0.25,
        color: colors.subHeadingColor,
        fontFamily: fonts.regular,
        fontWeight: '500'
    },
    eventDescription: {
        fontSize: sizes.fontText,
        marginBottom: 30,
        letterSpacing: 0.5,
        color: colors.textColor,
        fontFamily: fonts.regular,
        fontWeight: '500'
    }
})