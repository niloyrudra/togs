import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';

// Components
import ButtonComponent from '../../components/ButtonComponent'
import TitleComponent from '../../components/TitleComponent'
import BottomScreenIndicatorComponent from '../../components/BottomScreenIndicatorComponent';
import FavSportIconButtonComponent from '../../components/FavSportIconButtonComponent';

// Constants
import fonts from '../../constants/fonts'
import colors from '../../constants/colors'
import sizes from '../../constants/sizes';

// Context
import { useTogsContext } from '../../providers/AppProvider';
import { StatusBar } from 'expo-status-bar';

// Dummy Data
const favoriteSports = [
    {
        id: 4,
        title: 'Poll',
        image: require('../../assets/favs/🎱.png')
    },
    {
        id: 5,
        title: 'Basketball',
        image: require('../../assets/favs/🏀.png')
    },
    {
        id: 6,
        title: 'Football',
        image: require('../../assets/favs/🏈.png')
    },
    {
        id: 7,
        title: 'Baseball',
        image: require('../../assets/favs/⚾.png')
    },
    {
        id: 8,
        title: 'Tenis Ball',
        image: require('../../assets/favs/🎾.png')
    },
    {
        id: 9,
        title: 'Soccer Ball',
        image: require('../../assets/favs/⚽.png')
    },
    {
        id: 1,
        title: 'Vollyball',
        image: require('../../assets/favs/🏐.png')
    },
    {
        id: 2,
        title: 'Football 2',
        image: require('../../assets/favs/🏉.png')
    },
    {
        id: 3,
        title: 'Dumbel',
        image: require('../../assets/favs/dumble.png')
    },
];

const FavoriteSportsScreen = ( { navigation, route } ) => {
    const { onSignUp } = useTogsContext();

    const [isSubmitted, setIsSubmitted] = React.useState(false)
    const [userData, setUserData] = React.useState( route?.params?.userData )
    const [sports, setSports] = React.useState([])
    
    // Handlers
    const submitHandler = async () => {
        if( userData ) {            
            try{
                userData.chosenSports = sports
                await onSignUp( userData )
                setSports([])
                setIsSubmitted(true)
            }
            catch(err) {
                console.error("Fav Sports Screen Submit Func error >> ", err)
            }
        }

    }


    React.useEffect(() => {
        if( isSubmitted ) setSports([])
        return () => {
            setIsSubmitted(false)
        }
    }, [isSubmitted])

  return (
    <SafeAreaView style={styles.container} mode="margin" edges={['right', 'bottom', 'left']} >

        <StatusBar
            style='dark'
        />

        <View
            style={{
                flex:1,
                height: Dimensions.get('screen').height - 100
            }}
        >
            
            <View
                style={styles.header}
            >

                <TitleComponent label="Choose Sports" />

                <Text
                    style={{
                        fontFamily: fonts.medium,
                        color: colors.textColor
                    }}
                >
                    Select your favorite sports to continue the app or skip this page.
                </Text>
            </View>

            <View
                style={{
                    // flex: 1
                }}
            >

                <View
                    style={{
                        justifyContent:'space-evenly',
                        flexDirection: 'row',
                        gap: 15,
                        flexWrap: 'wrap',
                        paddingVertical: 30,
                        overflow:'hidden'
                    }}
                >

                    {
                        favoriteSports.map( (item, idx) => (
                            <FavSportIconButtonComponent key={idx} item={item} onSelect={setSports} />
                        ) )
                    }
                </View>

            </View>

            {/* Submit Button */}
            <ButtonComponent
                label="Continue"
                enableShadow
                onPress={submitHandler}
            />

            <BottomScreenIndicatorComponent />

        </View>

    </SafeAreaView>
  )
}

export default FavoriteSportsScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    header: {
        marginBottom: 30
    },
    errorMsg: {
        color: colors.yellow,
        fontSize: sizes.fontText
    }
})