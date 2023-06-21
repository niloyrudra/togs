import { Text, View, Animated, TextInput, StyleSheet, Modal, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {useForm, Controller} from 'react-hook-form';
import { Ionicons } from '@expo/vector-icons';

// Components
import ImageUploadComponent from '../../../components/ImageUploadComponent'
import ButtonComponent from "../../../components/ButtonComponent";

// Utils
import { getFormattedDate } from '../../../utils/utils';

// Constants
import sizes from "../../../constants/sizes";
import fonts from "../../../constants/fonts";
import colors from "../../../constants/colors";

// Context
// import { useTogsContext } from '../../../providers/AppProvider';

const ProfileModal = ({ navigation, refEle, user, isVisible, onClose }) => {

    // const { user, onUpdateUserInfo } = useTogsContext();

    const modelAnimatedValue = React.useRef( new Animated.Value(0) ).current

    const [ showModal, setShowModal ] = React.useState( isVisible )
    const [ isLoading, setIsLoading ] = React.useState( true )

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

    // const { handleSubmit, control, reset } = useForm();
    const handleSubmit = async () => {
        // await onUpdateUserInfo( user, data )
        // reset();
        // onClose();
    };
    
    return (
        <Modal>

            <View style={styles.container}>

                <View
                    style={{
                        height: 60,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center"
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

                <View style={styles.content}>

                    {/* Profile Pic */}
                    <View>
                        <Image
                            source={user?.photoURL ? { uri: user.photoURL } : require("../../../assets/user/user-icon-3.png")}
                            style={{
                                width: 120,
                                height: 120,
                                borderRadius: 60,
                                marginVertical: 20
                            }}
                        />
                    </View>

                    <View>
                        <Text style={{fontFamily: fonts.bold, fontSize: sizes.fontTitle, color: colors.primaryColor}}>{user?.displayName ?? 'Anonymous'}</Text>
                    </View>
                    <View>
                        <Text style={{fontFamily: fonts.regular, fontSize: sizes.fontSubTitle, color: colors.infoColor}}>{user?.email}</Text>
                    </View>


                    <Text style={styles.label}>Location/Address</Text>
                    <Text style={{fontFamily: fonts.regular, fontSize: sizes.fontSubTitle, color: colors.infoColor}}>{user?.address ?? "No data available."}</Text>
                    
                    <Text style={styles.label}>Bio</Text>
                    {/* <Text style={{fontFamily: fonts.regular, fontSize: sizes.fontSubTitle, color: colors.infoColor}}>{user?.bio ?? "No data available."}</Text> */}
                    <Text style={{fontFamily: fonts.regular, fontSize: sizes.fontSubTitle, color: colors.infoColor}}>No data available.</Text>

                    <Text style={styles.label}>Number of events attended</Text>
                    <Text style={{fontFamily: fonts.regular, fontSize: sizes.fontSubTitle, color: colors.infoColor}}>{user?.visitedEvents?.length ?? 0}</Text>



                    <View
                        style={{
                            width: '100%',
                            marginVertical: 20
                        }}
                    >
                        <ButtonComponent label="Connection +" bgColor={colors.accentColor} onPress={handleSubmit} />
                        <ButtonComponent label="Rate" bgColor={colors.textGreen} onPress={handleSubmit} />
                    </View>

                </View>

                
                <View style={{height: 100}} />

            </View>

        </Modal>
    )
}

export default ProfileModal

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        // zIndex:1111111
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