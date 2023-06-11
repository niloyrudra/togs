import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { StatusBar } from 'expo-status-bar';

// Components
import ButtonComponent from '../../components/ButtonComponent'
import TitleComponent from '../../components/TitleComponent'
import TextInputComponent from '../../components/TextInputComponent'
import TextInputLabelComponent from '../../components/TextInputLabelComponent'
import BottomScreenIndicatorComponent from '../../components/BottomScreenIndicatorComponent';

// Constants
import fonts from '../../constants/fonts'
import colors from '../../constants/colors'
import sizes from '../../constants/sizes';

const SignUpScreen = ( { navigation } ) => {
    const [isSubmitted, setIsSubmitted] = React.useState(false)
    const [name, setName] = React.useState("")
    const [interest, setInterest] = React.useState("")
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [nameError, setNameError] = React.useState("")
    const [emailError, setEmailError] = React.useState("")
    const [passwordError, setPasswordError] = React.useState("")
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    
    // Handlers
    const validatorHandler = () => {
        setIsSubmitted(false)
        var nameValid = false;
        if(name.length == 0){
            setNameError("Name is required");
        }        
        else if(name.length < 2){
            setNameError("Name should be minimum 2 characters");
        }  
        else{
            setNameError("")
            nameValid = true
        }

        var emailValid = false;
        if(email.length == 0){
            setEmailError("Email is required");
        }        
        else if(email.length < 6){
            setEmailError("Email should be minimum 6 characters");
        }      
        else if(email.indexOf(' ') >= 0){        
            setEmailError('Email cannot contain spaces');                          
        }    
        else{
            setEmailError("")
            emailValid = true
        }
    
        var passwordValid = false;
        if(password.length == 0){
            setPasswordError("Password is required");
        }        
        else if(password.length < 8){
            setPasswordError("Password should be minimum 6 characters");
        }      
        else if(password.indexOf(' ') >= 0){        
            setPasswordError('Password cannot contain spaces');                          
        }    
        else{
            setPasswordError("")
            passwordValid = true
        }        
    
        // if(emailValid && passwordValid){            
        //     alert('Email: ' + email + '\nPassword: ' + password); 
        //     setEmail("");
        //     setPassword("");
        // }        
        return (nameValid && emailValid && passwordValid) ? true : false;
    }

    const submitHandler = async () => {
        const isValid = validatorHandler()
        if ( isValid ) {
            try {
                setIsSubmitting(true)
                setIsSubmitted(true)
                const user = {
                    email,
                    password,
                    interest,
                    name
                }

                setName('')
                setInterest('')
                setEmail('')
                setPassword('')
                setIsSubmitting(false)

                navigation.navigate( 'FavoriteSports', { userData: user } )

            } catch (error) {
                setName('')
                setInterest('')
                setEmail('')
                setPassword('')
            }
            
        }

    }

    React.useEffect(() => {
       if( !isSubmitted ) validatorHandler();
       return setIsSubmitted(false)
    },[name, email, password]);

  return (
    <SafeAreaView style={styles.container} mode="margin" edges={['right', 'bottom', 'left']} >

        <StatusBar
            style="dark"
        />

        <KeyboardAwareScrollView
            enableAutomaticScroll={true}
            enableOnAndroid={true}
            nestedScrollEnabled={true}
            contentContainerStyle={{
                flexGrow:1
            }}
        >

            <View
                style={styles.header}
            >

                <TitleComponent label="Create Account" />

                <Text
                    style={{
                        fontFamily: fonts.medium,
                        color: colors.textColor
                    }}
                >
                    Enter your valid information to register. Then click continue to get started in our app.
                </Text>
            </View>

            <View>

                {/* Name */}
                <View style={{ marginBottom: 20 }}>
                    <TextInputLabelComponent label="Individual Name" />
                    <TextInputComponent
                        placeholder="Harry Handerson"
                        value={name}
                        onChange={setName}
                    />
                    {nameError.length > 0 && <Text style={styles.errorMsg}>{nameError}</Text>}
                </View>

                {/* Email */}
                <View style={{ marginBottom: 20 }}>
                    <TextInputLabelComponent label="Email ID" />
                    <TextInputComponent
                        placeholder="abcd@gmail.com"
                        mode="email"
                        value={email}
                        onChange={setEmail}
                    />
                    {emailError.length > 0 && <Text style={styles.errorMsg}>{emailError}</Text>}
                </View>

                {/* Genre */}
                <View style={{ marginBottom: 20 }}>
                    <TextInputLabelComponent label="Genre" />
                    <TextInputComponent
                        placeholder="Interests"
                        value={interest}
                        onChange={setInterest}
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
                    {passwordError.length > 0 && <Text style={styles.errorMsg}>{passwordError}</Text>}
                </View>

                {
                    isSubmitting ?
                        (
                            <ActivityIndicator size='large' color={colors.primaryColor} />
                        )
                        :
                        (
                            <ButtonComponent
                                onPress={submitHandler}
                                label="Continue"
                                enableShadow
                            />
                        )
                }

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
                    Already have an account?
                </Text>

                <TouchableOpacity
                    onPress={() => navigation.navigate( 'SignIn' ) }
                >
                    <Text
                        style={{
                            color: colors.primaryColor,
                            fontSize: sizes.fontText,
                            textDecorationStyle: 'solid',
                            textDecorationLine: 'underline',
                            fontWeight: '800'
                        }}
                    >Sign In</Text>
                </TouchableOpacity>

            </View>

            <BottomScreenIndicatorComponent/>

        </KeyboardAwareScrollView>

    </SafeAreaView>
  )
}

export default SignUpScreen

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