import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { SafeAreaView } from 'react-native-safe-area-context';

// Firebase
import { auth } from '../../config/firebase.config'

// Components
import ButtonComponent from '../../components/ButtonComponent'
import fonts from '../../constants/fonts'
import colors from '../../constants/colors'
import TitleComponent from '../../components/TitleComponent'
import TextInputComponent from '../../components/TextInputComponent'
import TextInputLabelComponent from '../../components/TextInputLabelComponent'
import { Image } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { ScrollView } from 'react-native';
import sizes from '../../constants/sizes';
import BottomScreenIndicatorComponent from '../../components/BottomScreenIndicatorComponent';

const SignInScreen = ( { navigation } ) => {
    const [email, setEmail] = React.useState('');
    const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
    const [errorMessage, setErrorMessage] = React.useState('');

    const signIn = async () => {
        if (email === '') {
            setEmailErrorMessage('Email is mandatory.')
          return;
        }
        if ( password === '') {
            setPasswordErrorMessage('password is mandatory.')
          return;
        }
    
        try {
            console.log( "processing" )
            await auth.signInWithEmailAndPassword( email, password);
            console.log( "processing end" )
        } catch (error) {
            setErrorMessage(error.message)
        }
    }

  return (
    <SafeAreaView style={styles.container} mode="margin" edges={['right', 'bottom', 'left']} >

        <ScrollView
            contentContainerStyle={{
                // flex:1
                paddingBottom: 20
            }}
            keyboardDismissMode='on-drag'
            showsVerticalScrollIndicator={false}
        >

            {/* <KeyboardAwareScrollView
                keyboardDismissMode='on-drag'
                contentContainerStyle={{
                    flex:1
                }}
            > */}

                <View
                    style={styles.header}
                >

                    <TitleComponent label="Welcome!" />

                    <Text
                        style={{
                            fontFamily: fonts.medium,
                            color: colors.textColor
                        }}
                    >
                        Enter your valid information to log in our app. Then click continue to get started in our app.
                    </Text>
                </View>

                {/* Form Field Group */}
                <View>

                    {/* Email */}
                    <View style={{ marginBottom: 20 }}>
                        <TextInputLabelComponent label="Your email address" />
                        <TextInputComponent
                            placeholder="abcd@gmail.com"
                            mode="email"
                            value={email}
                            onChange={setEmail}
                        />
                    </View>

                    {/* Password */}
                    <View style={{ marginBottom: 20 }}>
                        <TextInputLabelComponent label="Your password" />
                        <TextInputComponent
                            placeholder="min. 8 characters"
                            secureTextEntry={true}
                            value={password}
                            onChange={setPassword}
                            style={{
                                paddingRight: 40
                            }}
                        />
                    </View>

                    <ButtonComponent
                        onPress={signIn}
                        label="Continue"
                        enableShadow
                    />

                </View>

                {/* Divider */}
                <View
                    style={{
                        marginVertical: 20,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <Image
                        source={require( '../../assets/divider/or-divider.png' )}
                    />
                </View>

                <View>

                    <ButtonComponent
                        label="Continue with Apple"
                        bgColor={ colors.dark }
                    />
                    <ButtonComponent
                        label="Continue with Facebook"
                        bgColor={ colors.fbColor }
                    />
                    <ButtonComponent
                        label="Continue with Google"
                        bgColor={ colors.white }
                        color={colors.textDark}
                    />

                </View>

                <View
                    style={{
                        flexDirection: 'row',
                        gap: 10,
                        justifyContent: 'center',
                        marginVertical: 20
                    }}
                >
                    <Text
                        style={{
                            color: colors.infoColor,
                            fontSize: sizes.fontText
                        }}
                    >
                        Don't have an account?
                    </Text>

                    <TouchableOpacity
                        onPress={() => navigation.navigate( 'SignUp' ) }
                    >
                        <Text
                            style={{
                                color: colors.primaryColor,
                                fontSize: sizes.fontText,
                                textDecorationStyle: 'solid',
                                textDecorationLine: 'underline',
                                fontWeight: '800'
                            }}
                        >Sign Up</Text>
                    </TouchableOpacity>

                </View>

                <BottomScreenIndicatorComponent />

            {/* </KeyboardAwareScrollView> */}

        </ScrollView>


    </SafeAreaView>
  )
}

export default SignInScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    header: {
        marginBottom: 30
    }
})