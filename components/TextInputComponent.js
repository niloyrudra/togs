import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'

// Constants
import colors from '../constants/colors'
import fonts from '../constants/fonts'
import { AntDesign } from '@expo/vector-icons'

const TextInputComponent = ( props ) => {

    // const [ value, setValue ] = React.useState('')
    const [ isSecureText, setToggleIsSecureText ] = React.useState( props.secureTextEntry ? true : false )

    return (
        <>
            <TextInput
                cursorColor={ colors.primaryColor }
                inputMode={ props.mode ?? 'text' } // 'decimal', 'email', 'none', 'numeric', 'search', 'tel', 'text', 'url'
                keyboardType={ props.kbType ?? 'default' } // 'default', 'email-address', 'numeric', 'phone-pad', 'ascii-capable', 'numbers-and-punctuation', 'url', 'number-pad', 'name-phone-pad', 'decimal-pad', 'twitter', 'web-search', 'visible-password'
                numberOfLines={ props.numLine ?? 1 }
                placeholder={ props.placeholder ?? '' }
                placeholderTextColor={ colors.placeholderColor }
                returnKeyType={ props.returnKeyType ?? 'done' } // 'done', 'go', 'next', 'search', 'send', 'none', 'previous', 'default', 'emergency-call', 'google', 'join', 'route', 'yahoo'

                multiline={ props.multiline ?? false }
                secureTextEntry={isSecureText}
                autoCapitalize={props.autoCapitalize ?? 'sentences'}
                autoFocus={props.autoFocus ?? false}

                // IOS
                textContentType={ props.textContentType ?? 'none' } // 'none', 'URL', 'addressCity', 'addressCityAndState', 'addressState', 'countryName', 'creditCardNumber', 'emailAddress', 'familyName', 'fullStreetAddress', 'givenName', 'jobTitle', 'location', 'middleName', 'name', 'namePrefix', 'nameSuffix', 'nickname', 'organizationName', 'postalCode', 'streetAddressLine1', 'streetAddressLine2', 'sublocality', 'telephoneNumber', 'username', 'password'

                value={ props.value ?? '' }
                onChangeText={( value ) => {
                    // setValue( prevValue => prevValue = value );
                    props.onChange( prevValue => prevValue = value );
                }}
                // onChangeText={( value ) => props.onChange( prevValue => prevValue = value ) }

                style={ props.style ? {...styles.input, ...props.style} : {...styles.input} }
            />
            {
                props.secureTextEntry && (
                    <TouchableOpacity
                        onPress={() => setToggleIsSecureText( prevValue => prevValue = !prevValue )}
                        style={{
                            position:"absolute",
                            right: 2,
                            top: 34,
                            // top: 31,
                            // backgroundColor: colors.white,
                            width: 45,
                            height: 45,
                            borderRadius: 45,
                            justifyContent: 'center',
                            alignItems: 'center',
                            zIndex:1000
                        }}
                    >
                        {
                            isSecureText
                                ? (<AntDesign name="eyeo" size={24} color={colors.infoColor} />) 
                                : (<AntDesign name="eye" size={24} color={colors.dark} />)
                        }
                        
                    </TouchableOpacity>
                )
            }

        </>
    )
}

export default TextInputComponent

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    input: {
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: colors.borderStokeColor,
        borderRadius: 30,
        height: 48,
        color: colors.textColor,
        paddingHorizontal: 20,
        paddingVertical: 16,
        fontFamily: fonts.medium,
        fontWeight: '400',
        fontSize: 16
    }
})