import { Text, View, Animated, TextInput, StyleSheet, TouchableWithoutFeedback, Modal, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {useForm, Controller} from 'react-hook-form';
import ButtonComponent from "../../components/ButtonComponent";
// import { SafeAreaProvider } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

// Utils
import { getFormattedDate } from '../../utils/utils';

// Constants
import sizes from "../../constants/sizes";
import fonts from "../../constants/fonts";
import colors from "../../constants/colors";
import { Ionicons } from '@expo/vector-icons';

const ProfileEditModal = ({ navigation, refEle, isVisible, onClose }) => {

    const modelAnimatedValue = React.useRef( new Animated.Value(0) ).current

    const [ showModal, setShowModal ] = React.useState( isVisible )
    const [ isLoading, setIsLoading ] = React.useState( true )
    const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);

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

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };
    const hideDatePicker = () => {
        setDatePickerVisibility(false);
      };
    const handleConfirm = (date) => {
        hideDatePicker();
    };

    const { handleSubmit, control, reset } = useForm();
    const onSubmit = (data) => {
        console.log(data);
        reset();
        onClose();
    };

    return (
        <View>
            <KeyboardAwareScrollView
                enableAutomaticScroll={true}
                enableOnAndroid={true}
                nestedScrollEnabled={true}
                contentContainerStyle={{
                    flexGrow:1
                }}
            >

                <View style={styles.container}>

                    <View
                        style={{
                            height: 60,
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center"
                        }}
                    >
                        <View/>
                        <View>
                            <Text style={{fontFamily: fonts.bold, fontSize: sizes.fontTitle, color: colors.dark}}>Edit Your Information</Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => onClose()}
                        >
                            <Ionicons name="close-circle-outline" size={30} color={colors.yellow} />
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.label}>Name</Text>
                    <Controller
                        name="name"
                        defaultValue=""
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                style={styles.input}
                                selectionColor={"#5188E3"}
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                    />

                    <Text style={styles.label}>Email</Text>
                    <Controller
                        name="email"
                        defaultValue=""
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                style={styles.input}
                                selectionColor={"#5188E3"}
                                onChangeText={onChange}
                                value={value}
                                keyboardType='email-address'
                            />
                        )}
                    />

                    <Text style={styles.label}>Phone Number</Text>
                    <Controller
                        name="phonNum"
                        defaultValue=""
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                style={styles.input}
                                selectionColor={"#5188E3"}
                                onChangeText={onChange}
                                value={value}
                                keyboardType='phone-pad'
                            />
                        )}
                    />

                    <Text style={styles.label}>Date of Birth</Text>
                    <Controller
                        name="birth"
                        defaultValue=""
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <View>
                                <TextInput 
                                    style={styles.input}
                                    placeholder="Show Date Picker"
                                    onFocus={showDatePicker}
                                    value={value.toString()}
                                />
                                <DateTimePickerModal
                                    isVisible={isDatePickerVisible}
                                    mode="Date"
                                    onConfirm={ date => {
                                        const formattedDate = getFormattedDate(date)
                                        handleConfirm(formattedDate)
                                        onChange(formattedDate)
                                    }}
                                    onCancel={hideDatePicker}
                                />
                            </View>
                        )}
                    />

                    <Text style={styles.label}>Location/Address</Text>
                    <Controller
                        name="location"
                        defaultValue=""
                        control={control}
                        render={({ field: { onChange, value } }) => (
                        <TextInput
                            style={styles.input}
                            selectionColor={"#5188E3"}
                            onChangeText={onChange}
                            value={value}
                            placeholder="Your Location"
                        />
                        )}
                    />


                    <Text style={styles.label}>Bio</Text>
                    <Controller
                        name="bio"
                        defaultValue=""
                        control={control}
                        render={({ field: { onChange, value } }) => (
                        <TextInput
                            style={styles.textArea}
                            selectionColor={"#5188E3"}
                            onChangeText={onChange}
                            value={value}
                            multiline={true}
                            numberOfLines={6}
                            placeholder="Write Bio"
                        />
                        )}
                    />

                    <View
                        style={{
                            marginVertical: 20
                        }}
                    >
                        <ButtonComponent label="Save" onPress={handleSubmit(onSubmit)} />
                    </View>
                    
                    <View style={{height: 100}} />

                </View>

            </KeyboardAwareScrollView>
        </View>
    )
}

export default ProfileEditModal

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        // zIndex:1111111
    },
    input: {
        borderStyle: "solid",
        borderColor: '#8E8E93', // "#B7B7B7",
        borderRadius: 29,
        borderWidth: 1,
        fontSize: 20,
        height: 48,
        paddingHorizontal: 20,
    },
    textArea: {
        borderStyle: "solid",
        borderColor: '#8E8E93', // "#B7B7B7",
        borderRadius: 10,
        borderWidth: 1,
        fontSize: 20,
        paddingHorizontal: 20,
        justifyContent: 'flex-start',
        alignItems: "flex-start"
    },
    label: {
        marginTop: 20,
        marginBottom: 8,
        fontSize: sizes.fontText,
        fontWeight: '600',
        fontFamily: fonts.regular,
        color: colors.dark
    },
    placeholderStyles: {
        color: "grey",
    },
    dropdownServices: {
        zIndex: 999999,
    },
    dropdownActivities: {
        zIndex: 999990,
    },
    dropdown: {
        borderColor: "#B7B7B7",
        height: 50,
        paddingHorizontal: 20,
        borderRadius: 29
    },

});