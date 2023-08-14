import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'

// Components
import ButtonComponent from './ButtonComponent';

// Context
import { useTogsContext } from '../providers/AppProvider';
import sizes from '../constants/sizes';
import colors from '../constants/colors';
import fonts from '../constants/fonts';

const EventJoinButtonComponent = ({event}) => {

    const {user, onJoinEvent} = useTogsContext();

    const [disabled, setDisabled] = React.useState(false)
    const [isJoined, setIsJoined] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState(false)

    const onSubmit = async () => {
        try {
            setIsLoading(prevValue => prevValue = true)

            await onJoinEvent( event, user.userId );

            event.joinedUsers = [...event.joinedUsers, user.userId];

            setDisabled(prevValue => prevValue = true)
            setIsLoading(prevValue => prevValue = false)
        }
        catch(err) {
            console.log(err)
            setIsLoading(prevValue => prevValue = false)
        }
    }

    React.useEffect(() => {
        // console.log(event.id)
        if(event?.joinedUsers.includes(user?.userId)) setIsJoined(prevValue => prevValue = true)
        return () => {
            setIsJoined(false)
        }
    }, [event?.id]);
    
    
    if( event?.creatorId == user.userId ) return ( <View style={{flex:1}} /> );

    return (
        <View
            style={{
                flex:1,
                justifyContent:"center",
                alignItems: "flex-end"
            }}
        >
            <View
                style={{
                    width:"100%",
                    height: 1,
                    backgroundColor: '#ddd', // colors.placeholderColor,
                    marginBottom: 15,
                }}
            />

            <View
                style={{
                    width:"100%",
                    flexDirection:"row",
                    alignItems:"center",
                    justifyContent:"space-between",
                    gap:20
                }}
            >
                <Text
                    style={{
                        color:colors.headingColor,
                        fontSize:sizes.label,
                        fontWeight: "800",
                        fontFamily: fonts.bold
                    }}
                >
                    Want to join this Event?
                </Text>
                {
                    isLoading ?
                        (
                            <View
                                style={{
                                    flex:1,
                                    justifyContent:"center",
                                    alignItems:"center"
                                }}
                            >
                                <ActivityIndicator size={sizes.xxlLoader} color={colors.primaryColor} />
                            </View>
                                
                        )
                        :
                        (
                            <ButtonComponent
                                disabled={ isJoined || disabled}
                                label={( isJoined || disabled) ? "Joined" : "Click To Join"}
                                onPress={onSubmit}
                                style={{
                                    // width:"100%"
                                    paddingHorizontal: 30
                                }}
                            />
                        )
                }
            </View>
        </View>
    );
}

export default EventJoinButtonComponent

const styles = StyleSheet.create({})