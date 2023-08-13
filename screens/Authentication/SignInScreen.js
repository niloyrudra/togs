import { StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import React from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

// Constants
import fonts from '../../constants/fonts'
import colors from '../../constants/colors'
import sizes from '../../constants/sizes';

// Components
import ButtonComponent from '../../components/ButtonComponent'
import ButtonIconComponent from "../../components/ButtonIconComponent"
import TitleComponent from '../../components/TitleComponent'
import TextInputComponent from '../../components/TextInputComponent'
import TextInputLabelComponent from '../../components/TextInputLabelComponent'
import BottomScreenIndicatorComponent from '../../components/BottomScreenIndicatorComponent';

// Context
import { useTogsContext } from '../../providers/AppProvider';
import { Alert } from 'react-native';

const SignInScreen = ( { navigation } ) => {

    const { onSignIn, signInError } = useTogsContext();

    const [email, setEmail] = React.useState('');
    const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
    const [errorMessage, setErrorMessage] = React.useState(signInError);
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const onResetHandler = React.useCallback(() => {
        setEmail('')
        setPassword('')
        setEmailErrorMessage('')
        setPasswordErrorMessage('')
        // setErrorMessage('')
    },[]);

    const signIn = async () => {
        if (email === '') {
            setEmailErrorMessage('Email is mandatory.')
            return;
        }
        if ( password === '') {
            setPasswordErrorMessage('Password is mandatory.')
            return;
        }
    
        try {
            setIsSubmitting(true)
            await onSignIn( email, password );
            onResetHandler()
            if(signInError) setErrorMessage( prev => prev = signInError );
            setIsSubmitting(false)
        } catch (error) {
            setIsSubmitting(false)
        }
    }
    
    React.useEffect(() => {
        // if( email && email.contains("@") )  setEmailErrorMessage('')
        setErrorMessage('')
        if( email )  setEmailErrorMessage('')
        if( password )  setPasswordErrorMessage('')
    }, [email, password])

    React.useEffect(() => {
        if( signInError != "" )  setErrorMessage( prev => prev = signInError)
    }, [signInError, errorMessage])



  return (
    <SafeAreaView style={styles.container} mode="margin" edges={['right', 'bottom', 'left']} >
        <KeyboardAwareScrollView
            enableAutomaticScroll={true}
            enableOnAndroid={true}
            nestedScrollEnabled={true}
            contentContainerStyle={{
                flexGrow:1
            }}
        >
            <StatusBar
                style="dark"
            />
            
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
                        // onChange={ (value) => onSetPassword(value)}
                        autoCapitalize="none"
                        kbType="email-address"
                    />
                    {
                        emailErrorMessage && (<Text style={{color:colors.accentColor,marginVertical:4}}>{emailErrorMessage}</Text>)
                    }
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
                    {
                        passwordErrorMessage && (<Text style={{color:colors.accentColor,marginVertical:4}}>{passwordErrorMessage}</Text>)
                    }
                </View>

                {
                    isSubmitting ?
                        (
                            <ActivityIndicator size='large' color={colors.primaryColor} />
                        )
                        :
                        (
                            <ButtonComponent
                                onPress={signIn}
                                label="Continue"
                                enableShadow
                            />
                        )
                }
                {
                    errorMessage && (<View style={{marginHorizontal:15}}><Text style={{color:colors.accentColor, fontFamily:fonts.mediumItalic}}>{errorMessage}</Text></View>)
                }

                

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

                {/* <ButtonComponent
                    label="Continue with Apple"
                    bgColor={ colors.dark }
                />
                <ButtonComponent
                    label="Continue with Facebook"
                    bgColor={ colors.fbColor }
                /> */}
                {/* <ButtonComponent
                    label="Continue with Google"
                    bgColor={ colors.white }
                    color={colors.textDark}
                /> */}

                <ButtonIconComponent
                    label="Continue with Google"
                    bgColor={ colors.white }
                    color={colors.textDark}
                    icon={<Image source={require('../../assets/social-icons/google.png')} />}
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

        </KeyboardAwareScrollView>

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