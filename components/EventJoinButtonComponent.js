import { Dimensions, Text, View } from 'react-native'
import React from 'react'

// Components
import ButtonComponent from './ButtonComponent';
import ActivityIndicatorComponent from './ActivityIndicatorComponent'

// Context
import { useTogsContext } from '../providers/AppProvider';

// Constants
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

            await onJoinEvent( event, user?.userId );

            event.joinedUsers = [...event.joinedUsers, user?.userId];

            setDisabled(prevValue => prevValue = true)
            setIsLoading(prevValue => prevValue = false)
        }
        catch(err) {
            console.log(err)
            setIsLoading(prevValue => prevValue = false)
        }
    }

    React.useEffect(() => {
        if(event?.joinedUsers.includes(user?.userId)) setIsJoined(prevValue => prevValue = true)
        return () => setIsJoined(false)
    }, [event?.id]);
    
    
    if( event?.creatorId == user?.userId ) return ( <View style={{flex:1}} /> );

    return (
        <View
            style={{
                justifyContent:"center",
                alignItems: "flex-end"
            }}
        >
            <View
                style={{
                    width: Dimensions.get("screen").width - 40,
                    
                    flexDirection:"row",
                    alignItems:"center",
                    justifyContent:"space-between",
                    gap:20,
                    borderTopWidth: 1,
                    borderTopColor: '#ddd', // colors.placeholderColor,
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
                    Want to join this event?
                </Text>
                {
                    isLoading ?
                        (<ActivityIndicatorComponent />)
                        :
                        (
                            <ButtonComponent
                                disabled={ isJoined || disabled}
                                label={( isJoined || disabled) ? "Joined" : "Click To Join"}
                                onPress={onSubmit}
                                style={isJoined ? 
                                    {
                                        paddingHorizontal: 30,
                                        borderRadius: 6
                                    }
                                    :
                                    {
                                        paddingHorizontal: 30,
                                        borderRadius: 6,

                                        elevation: 4
                                    }
                                }
                            />
                        )
                }
            </View>
        </View>
    );
}

export default EventJoinButtonComponent