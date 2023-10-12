import { Text, View, Animated, TextInput, StyleSheet, TouchableWithoutFeedback, Modal, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import React from 'react'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import DropDownPicker from "react-native-dropdown-picker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {useForm, Controller} from 'react-hook-form';
import { Ionicons } from '@expo/vector-icons';

// Components
import ImageUploadComponent from '../../components/ImageUploadComponent'
import ButtonComponent from "../../components/ButtonComponent";

// Utils
import { getCountryList, getFormattedDate } from '../../utils/utils';

// Constants
import sizes from "../../constants/sizes";
import fonts from "../../constants/fonts";
import colors from "../../constants/colors";

const countryList = getCountryList();

// Context
import { useTogsContext } from '../../providers/AppProvider';

const ProfileEditModal = ({ navigation, refEle, isVisible, onClose }) => {

    const { user, onUpdateUserInfo } = useTogsContext();

    const modelAnimatedValue = React.useRef( new Animated.Value(0) ).current

    const [ showModal, setShowModal ] = React.useState( isVisible )
    const [ isLoading, setIsLoading ] = React.useState( false )
    const [ isDatePickerVisible, setDatePickerVisibility ] = React.useState( false );
    const [ countryOpen, setCountryOpen ] = React.useState( false );
    const [ countries, setCountries ] = React.useState( countryList );

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

    // Handlers
    const onCountryOpen = () => {
        hideDatePicker();
    }

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
    const onSubmit = async (data) => {
        setIsLoading(true)

        console.log(data)
        // return

        await onUpdateUserInfo( user, data )
        reset();
        onClose();
        setIsLoading(false)
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

                    <View style={styles.content}>
                        
                        <View>
                            <Text style={{fontFamily: fonts.bold, fontSize: sizes.fontTitle, color: colors.dark}}>Edit Your Information</Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => onClose()}
                        >
                            <Ionicons name="close-circle-outline" size={30} color={colors.yellow} />
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.label}>Upload Profile Photo</Text>
                    <Controller
                        name="photoURL"
                        defaultValue={user?.photoURL ?? ''}
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <ImageUploadComponent
                                onUpload={onChange}
                                image={value ?? ''}
                            />
                        )}
                    />

                    <Text style={styles.label}>First Name</Text>
                    <Controller
                        name="firstName"
                        defaultValue={user.firstName}
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

                    <Text style={styles.label}>Last Name</Text>
                    <Controller
                        name="lastName"
                        defaultValue={user.lastName}
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

                    <Text style={styles.label}>Age</Text>
                    <Controller
                        name="age"
                        defaultValue={user.age}
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                style={styles.input}
                                selectionColor={"#5188E3"}
                                onChangeText={onChange}
                                value={value}
                                keyboardType='number-pad'
                            />
                        )}
                    />

                    <Text style={styles.label}>Phone Number</Text>
                    <Controller
                        name="phoneNumber"
                        defaultValue={user.phoneNumber}
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
                        name="birthDate"
                        defaultValue={user.birthDate}
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <View>
                                <TextInput 
                                    style={styles.input}
                                    placeholder="Show Date Picker"
                                    onFocus={showDatePicker}
                                    value={value ? value.toString() : ''}
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
                        name="address"
                        defaultValue={user.address}
                        control={control}
                        render={({ field: { onChange, value } }) => (
                        <TextInput
                            style={styles.input}
                            selectionColor={"#5188E3"}
                            onChangeText={onChange}
                            value={value}
                            placeholder="Your Location/Address"
                        />
                        )}
                    />

                    <Text style={styles.label}>Country</Text>
                    <Controller
                        name="country"
                        defaultValue={user?.country}
                        control={control}
                        render={({ field: { onChange, value } }) => (
                        <View style={styles.dropdownCountries}>
                            <DropDownPicker
                                listMode="SCROLLVIEW" // "MODAL" // "FLATLIST"
                                scrollViewProps={{
                                    nestedScrollEnabled: true,
                                    scrollEnabled: true,
                                    decelerationRate: "normal" // normal, fast
                                }}
                                // flatListProps={{
                                //     initialNumToRender: countries.length
                                // }}
                                modalProps={{
                                    animationType: "slide" // 'none', 'slide', 'fade'
                                }}
                                dropDownContainerStyle={{
                                    minHeight: 380,
                                    // height:"auto"
                                }}
                                // dropDownMaxHeight={240}
                                mode="BADGE"
                                theme="LIGHT"
                                multiple={false}
                                // multipleText=""
                                style={styles.dropdown}
                                open={countryOpen}
                                value={value}
                                items={countries}
                                setOpen={setCountryOpen}
                                setValue={onChange}
                                setItems={setCountries}
                                placeholder="Select an country"
                                placeholderStyle={styles.placeholderStyles}
                                // loading={loading}
                                // countryIndicatorColor="#5188E3"
                                // searchable={true}
                                // searchPlaceholder="Search your company here..."
                                onOpen={onCountryOpen}
                                onChangeValue={onChange}
                                zIndex={1000}
                                zIndexInverse={3000}
                                // schema={{
                                //     label: 'name',
                                //     value: 'id',
                                // }}
                            />
                        </View>
                        )}
                    />

                    <Text style={styles.label}>Bio</Text>
                    <Controller
                        name="bio"
                        defaultValue={user.bio}
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
                        {
                            isLoading ?
                                (
                                    <ActivityIndicator size={sizes.xlLoader} color={colors.primaryColor} />
                                )
                                :
                                (
                                    <ButtonComponent label="Save" onPress={handleSubmit(onSubmit)} />
                                )
                        }
                    </View>
                    
                    <View style={{height: 200}} />

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
    },
    content: {
        height: 60,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
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
    dropdownCountries: {
        zIndex: 999990,
    },
    dropdown: {
        borderColor: "#B7B7B7",
        height: 50,
        paddingHorizontal: 20,
        borderRadius: 29
    },

});