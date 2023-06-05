import { StyleSheet, Text, View, Button, Image, ScrollView, TouchableOpacity, Dimensions } from 'react-native'
import React, { useContext } from 'react'
// import { useIsFocused } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Components
import ButtonComponent from '../../components/ButtonComponent'
import TitleComponent from '../../components/TitleComponent'
// import TextInputComponent from '../../components/TextInputComponent'
// import TextInputLabelComponent from '../../components/TextInputLabelComponent'

// Constants
import fonts from '../../constants/fonts'
import colors from '../../constants/colors'
import sizes from '../../constants/sizes';
import BottomScreenIndicatorComponent from '../../components/BottomScreenIndicatorComponent';
import FavSportIconButtonComponent from '../../components/FavSportIconButtonComponent';

// Firebase
import { auth } from '../../config/firebase.config';

// Context
import { AppContext } from '../../providers/AppProvider';

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
    // const isFocused = useIsFocused()
    // console.log(route?.params?.userData)

    const { setNewUser } = React.useContext( AppContext )

    const [isSubmitted, setIsSubmitted] = React.useState(false)
    const [userData, setUserData] = React.useState( route?.params?.userData )
    const [sports, setSports] = React.useState([])
    
    // Hanlders
    const submitHandler = async () => {
        if( userData ) {            
            try{
                let newUser = await auth
                .createUserWithEmailAndPassword( userData.email, userData.password )
                console.log("Sign Up done!", newUser)

                newUser = newUser?.user ? newUser.user : {}
                newUser.chosenSports = sports
                newUser.interest = userData.interest

                console.log("New User ID >> ", newUser.uid)
                // return
                await setNewUser(newUser)
                setSports([])
                setIsSubmitted(true)
            }
            catch(err) {
                console.error("Fav Sports Screen Submit Func error >> ", err)
            }
        }

        // navigation.navigate( 'Welcome' )
    }


    React.useEffect(() => {
        if( isSubmitted ) setSports([])
        return () => {
            setNewUser(null)
            setIsSubmitted(false)
        }
    }, [isSubmitted])

  return (
    <SafeAreaView style={styles.container} mode="margin" edges={['right', 'bottom', 'left']} >

        {/* <ScrollView
            contentContainerStyle={{
                paddingBottom: 20
            }}
            keyboardDismissMode='on-drag'
            showsVerticalScrollIndicator={false}
        > */}


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


        {/* </ScrollView> */}


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