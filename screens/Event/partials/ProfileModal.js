import { Text, View, Animated, StyleSheet, Modal, TouchableOpacity, Image, ScrollView } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';

// Components
import ButtonComponent from "../../../components/ButtonComponent";
import RatingComponent from "../../../components/RatingComponent"

// Utils
// import { getFormattedDate } from '../../../utils/utils';

// Constants
import sizes from "../../../constants/sizes";
import fonts from "../../../constants/fonts";
import colors from "../../../constants/colors";

// Context
import { useTogsContext } from '../../../providers/AppProvider';
import { ActivityIndicator } from 'react-native';

const ProfileModal = ({ navigation, refEle, selectedUserId, isVisible, onClose }) => {

    const { user, users, onToggleConnectUser } = useTogsContext()

    const modelAnimatedValue = React.useRef( new Animated.Value(0) ).current

    const [ selectedUser, setSelectedUser ] = React.useState( users?.filter( user => user.userId == selectedUserId )[0] )
    const [ showModal, setShowModal ] = React.useState( isVisible )
    const [ hasAlreadyRated, setHasAlreadyRated ] = React.useState( selectedUser?.rating?.length ? selectedUser?.rating?.filter( rateObj => rateObj.userId == user.userId ) : false )
    const [ isConnected, setIsConnected ] = React.useState( user?.connections?.includes( selectedUser.userId ) )

    const [ isLoading, setIsLoading ] = React.useState(false)
  
    const toggleConnectionHandler = async ( selectedUserId ) => {
      try{
        setIsLoading(true)
        await onToggleConnectUser( user, selectedUserId )
        setIsLoading(false)
        setIsConnected( prevValue => prevValue = !prevValue )
      }
      catch(err) {
        console.error( err )
      }
    }

    React.useEffect( () => {

        if( showModal ) {
            Animated.timing( modelAnimatedValue, {
                toValue: 1,
                duration: 500,
                useNativeDriver: false
            })
            .start();
        }
        else {
            Animated.timing( modelAnimatedValue, {
                toValue: 0,
                duration: 500,
                useNativeDriver: false
            })
            .start( () => onClose() );
        }

    }, [ showModal ] );

    const modalY = modelAnimatedValue.interpolate({
        inputRange: [0,1],
        outputRange: [700, -100]
    });

    React.useEffect( () => {
        setSelectedUser( prevValue => prevValue = users?.filter( user => user.userId == selectedUserId )[0] );

        setHasAlreadyRated( selectedUser?.rating?.length ? selectedUser?.rating?.filter( rateObj => rateObj.userId == user.userId ) : false )
        setIsConnected( user?.connections?.includes( selectedUser?.userId ) )
    }, [ selectedUserId ] );

    return (
        <Modal>
            <View style={styles.container}>
                <View
                    style={{
                        height: 60,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        backgroundColor: colors.white,
                        zIndex: 1
                    }}
                >
                    
                    <View>
                        <Text style={{fontFamily: fonts.bold, fontSize: sizes.fontTitle, color: colors.dark}}>Profile Information</Text>
                    </View>

                    <TouchableOpacity
                        onPress={() => onClose()}
                    >
                        <Ionicons name="close-circle-outline" size={30} color={colors.dark} />
                    </TouchableOpacity>
                </View>

                <ScrollView>

                    <View style={styles.content}>

                        {/* Profile Pic */}
                        <View>
                            <Image
                                source={selectedUser?.photoURL ? { uri: selectedUser.photoURL } : require("../../../assets/user/user-icon-3.png")}
                                style={{
                                    width: 120,
                                    height: 120,
                                    borderRadius: 60,
                                    marginVertical: 20
                                }}
                            />
                        </View>

                        <View>
                            <Text style={{fontFamily: fonts.bold, fontSize: sizes.fontTitle, color: colors.primaryColor}}>{selectedUser?.displayName ?? 'Anonymous'}</Text>
                        </View>
                        <View>
                            <Text style={{fontFamily: fonts.regular, fontSize: sizes.fontSubTitle, color: colors.infoColor}}>{selectedUser?.email}</Text>
                        </View>
                        {
                            isConnected && (
                                <View>
                                    <Text style={{fontFamily: fonts.regular, fontSize: sizes.fontSubTitle, color: colors.accentColor}}>Connected</Text>
                                </View>
                            )
                        }


                        <Text style={styles.label}>Location/Address</Text>
                        <Text style={{fontFamily: fonts.regular, fontSize: sizes.fontSubTitle, color: colors.infoColor}}>{selectedUser?.address ?? "No data available."}</Text>
                        
                        <Text style={styles.label}>Bio</Text>
                        <Text style={{fontFamily: fonts.regular, fontSize: sizes.fontSubTitle, color: colors.infoColor}}>No data available.</Text>

                        <Text style={styles.label}>Number of events attended</Text>
                        <Text style={{fontFamily: fonts.regular, fontSize: sizes.fontSubTitle, color: colors.infoColor}}>{selectedUser?.visitedEvents?.length ?? 0}</Text>

                        <View
                            style={{
                                width: '100%',
                                marginVertical: 20
                            }}
                        >
                            {
                                !isLoading ?
                                    (

                                        <ButtonComponent
                                            enableShadow={true}
                                            label={ isConnected ? "Disconnection -" : "Connection +" }
                                            bgColor={isConnected ? colors.dark : colors.accentColor}
                                            onPress={() => toggleConnectionHandler( selectedUser?.userId )}
                                        />
                                    )
                                    :
                                    (
                                        <View>
                                            <ActivityIndicator size={sizes.xlLoader} color={colors.primaryColor} />
                                        </View>
                                    )
                            }
                            {
                                hasAlreadyRated[0] ? 
                                    (
                                        <RatingComponent hasAlreadyRated={hasAlreadyRated[0].rating} currentUser={selectedUser} />
                                    )
                                    :
                                    (
                                        <RatingComponent currentUser={selectedUser} />
                                    )
                            }

                        </View>

                    </View>

                <View style={{height: 100}} />

                </ScrollView>


            </View>

        </Modal>
    )
}

export default ProfileModal

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems:"center"
    },
    label: {
        marginTop: 20,
        marginBottom: 8,
        fontSize: sizes.fontText,
        fontWeight: '600',
        fontFamily: fonts.regular,
        color: colors.dark
    },

});