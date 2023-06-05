import React from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Text
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import moment from "moment/moment";
// import { RCTDateTimePickerNative, DateTimePickerAndroid } from "@react-native-community/datetimepicker";

// import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';

// DateTimePickerAndroid.open(params: AndroidNativeProps)
// DateTimePickerAndroid.dismiss(mode: AndroidNativeProps['mode'])

// import DateTimePicker from '@react-native-community/datetimepicker';

import DateTimePickerModal from "react-native-modal-datetime-picker";
// import Header from "./components/Header";
import {useForm, Controller} from 'react-hook-form';
import ButtonComponent from "../../components/ButtonComponent";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

// Utils
import { getFormattedDate, getFormattedTime } from "../../utils/utils";

// Constants
import sizes from "../../constants/sizes";
import fonts from "../../constants/fonts";
import colors from "../../constants/colors";

// Data
const serviceList = [
    { label: "Tournament", value: "tournament" },
    { label: "Venue", value: "venue" },
    { label: "Membership", value: "membership" },
    { label: "Workshop", value: "workshop" },
    { label: "Solo Events", value: "solo-events" },
];
const activityList = [
    { label: "Soccer", value: "soccer" },
    { label: "Cricket", value: "cricket" },
    { label: "Judo", value: "judo" },
    { label: "Yoga", value: "yoga" },
];
const tenureList = [
    { label: "2 Days", value: "2d" },
    { label: "7 Days", value: "7d" },
    { label: "3 Weeks", value: "3w" },
    { label: "6 Weeks", value: "6w" },
    { label: "1 Month", value: "1m" },
    { label: "3 Months", value: "3m" },
    { label: "6 Months", value: "6m" },
    { label: "9 Months", value: "9m" },
    { label: "12 Months", value: "12m" },
];


const EventFormScreen = () => {

    // const serviceRef = React.useRef(null);
    const [selectedService, setSelectedService] = React.useState('tournament');

    const [serviceOpen, setServiceOpen] = React.useState(false);
    const [services, setServices] = React.useState( serviceList );
    
    const [activityOpen, setActivityOpen] = React.useState(false);
    const [activities, setActivities] = React.useState( activityList );

    const [tenureListOpen, setTenureListOpen] = React.useState(false);
    const [tenures, setTenureList] = React.useState( tenureList );

    const [loading, setLoading] = React.useState(false);

    const [isTimePickerVisible, setTimePickerVisibility] = React.useState(false);
    const [isStartDatePickerVisible, setStartDatePickerVisibility] = React.useState(false);
    const [isEndDatePickerVisible, setEndDatePickerVisibility] = React.useState(false);

    // Handlers
    const showTimePicker = () => {
      setTimePickerVisibility(true);
    };
    const showStartDatePicker = () => {
      setStartDatePickerVisibility(true);
    };
    const showEndDatePicker = () => {
      setEndDatePickerVisibility(true);
    };
  
    const hideTimePicker = () => {
      setTimePickerVisibility(false);
    };
    const hideStartDatePicker = () => {
      setStartDatePickerVisibility(false);
    };
    const hideEndDatePicker = () => {
      setEndDatePickerVisibility(false);
    };
  
    const handleStartDateConfirm = (date) => {
        hideStartDatePicker();
    };
    const handleEndDateConfirm = (date) => {
        hideEndDatePicker();
    };
    const handleConfirm = (time) => {
        hideTimePicker();
    };

    // Set Callbacks
    const onServiceOpen = React.useCallback(() => {
        setActivityOpen(false);
    }, []);

    const onActivityOpen = React.useCallback(() => {
        setServiceOpen(false);
    }, []);

    const onTenureListOpen = React.useCallback(() => {
        setTenureListOpen(true);
    }, []);


    // Form Submit Handler
    const { handleSubmit, control, reset } = useForm();
    const onSubmit = (data) => {
        console.log(data);
        reset();
    };

  return (
    <SafeAreaProvider>
        <KeyboardAwareScrollView
            enableAutomaticScroll={true}
            enableOnAndroid={true}
            nestedScrollEnabled={true}
            contentContainerStyle={{
                flexGrow:1
            }}
        >

            <View style={styles.container}>

                <Text style={styles.label}>Services</Text>
                <Controller
                    name="services"
                    defaultValue=""
                    control={control}
                    render={({ field: { onChange, value } }) => (
                    <View style={styles.dropdownServices}>
                        <DropDownPicker
                            listMode="SCROLLVIEW" // "MODAL" // "FLATLIST"
                            scrollViewProps={{
                                nestedScrollEnabled: true
                            }}
                            style={styles.dropdown}
                            open={serviceOpen}
                            value={value}
                            items={services}
                            setOpen={setServiceOpen}
                            setValue={onChange}
                            setItems={setServices}
                            placeholder="Select a service"
                            placeholderStyle={styles.placeholderStyles}
                            onOpen={onServiceOpen}
                            onChangeValue={ currentValue => {
                                // console.log('CurrentVValue',currentValue)
                                onChange(currentValue)
                                // serviceRef.current = currentValue
                                setSelectedService( prevVal => prevVal = currentValue )
                            }}
                            // onClose={() => serviceRef.current = value}
                            zIndex={3000}
                            zIndexInverse={1000}

                            // ref
                        />
                    </View>
                    )}
                />

                <Text style={styles.label}>Activities</Text>
                <Controller
                    name="activities"
                    defaultValue=""
                    control={control}
                    render={({ field: { onChange, value } }) => (
                    <View style={styles.dropdownActivities}>
                        <DropDownPicker
                            listMode="SCROLLVIEW" // "MODAL" // "FLATLIST"
                            scrollViewProps={{
                                nestedScrollEnabled: true
                            }}
                            style={styles.dropdown}
                            open={activityOpen}
                            value={value}
                            items={activities}
                            setOpen={setActivityOpen}
                            setValue={onChange}
                            setItems={setActivities}
                            placeholder="Select an activity"
                            placeholderStyle={styles.placeholderStyles}
                            // loading={loading}
                            // activityIndicatorColor="#5188E3"
                            // searchable={true}
                            // searchPlaceholder="Search your company here..."
                            onOpen={onActivityOpen}
                            onChangeValue={onChange}
                            zIndex={1000}
                            zIndexInverse={3000}
                        />
                    </View>
                    )}
                />


                <View
                    style={{
                        flexDirection:"row",
                        gap: 10
                    }}
                >
                    <View
                        style={{
                            flex: 1
                        }}
                    >
                        <Text style={styles.label}>Start Date</Text>
                        <Controller
                            name="startDate"
                            defaultValue=""
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <View>
                                    <TextInput 
                                        style={styles.input}
                                        placeholder="Show date Picker"
                                        onFocus={showStartDatePicker}
                                        value={value.toString()}
                                        showSoftInputOnFocus={false}
                                    />
                                    <DateTimePickerModal
                                        isVisible={isStartDatePickerVisible}
                                        mode="date"
                                        onConfirm={ date => {
                                            const formattedDate = getFormattedDate(date)
                                            handleStartDateConfirm(formattedDate)
                                            onChange(formattedDate)
                                        }}
                                        onCancel={hideStartDatePicker}
                                    />
                                </View>
                            )}
                        />
                    </View>

                    <View
                        style={{
                            flex:1
                        }}
                    >
                        <Text style={styles.label}>End Date</Text>
                        <Controller
                            name="endDate"
                            defaultValue=""
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <View>
                                    <TextInput 
                                        style={styles.input}
                                        placeholder="Show Date Picker"
                                        onFocus={showEndDatePicker}
                                        value={value.toString()}
                                        showSoftInputOnFocus={false}
                                    />
                                    <DateTimePickerModal
                                        isVisible={isEndDatePickerVisible}
                                        mode="date"
                                        onConfirm={ date => {
                                            const formattedDate = getFormattedDate(date)
                                            handleEndDateConfirm(formattedDate)
                                            onChange(formattedDate)
                                        }}
                                        onCancel={hideEndDatePicker}
                                    />
                                </View>
                            )}
                        />
                    </View>

                </View>

                <Text style={styles.label}>Price</Text>
                <Controller
                    name="price"
                    defaultValue=""
                    control={control}
                    render={({ field: { onChange, value } }) => (
                    <TextInput
                        style={styles.input}
                        selectionColor={"#5188E3"}
                        onChangeText={onChange}
                        value={value}
                        keyboardType="numeric"
                        keyboardAppearance="default"
                    />
                    )}
                />

                {
                    selectedService == 'venue' && (
                        <>
                            <Text style={styles.label}>Working Hours</Text>
                            <Controller
                                name="workingHours"
                                defaultValue=""
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                    <View>
                                        <TextInput 
                                            style={styles.input}
                                            placeholder="Show time Picker"
                                            onFocus={showTimePicker}
                                            value={value.toString()}
                                            showSoftInputOnFocus={false}
                                        />
                                        <DateTimePickerModal
                                            isVisible={isTimePickerVisible}
                                            mode="time"
                                            onConfirm={ time => {
                                                const formattedTime = getFormattedTime(time)
                                                handleConfirm(formattedTime)
                                                onChange(formattedTime)
                                            }}
                                            onCancel={hideTimePicker}
                                        />
                                    </View>
                                )}
                            />
                        </>
                    )
                }

                {
                    (selectedService == 'membership' || selectedService == 'workshop' || selectedService == 'solo-events' ) && (
                        <View
                            style={{
                                zIndex: 3
                            }}
                        >
                            <Text style={styles.label}>Tenure</Text>
                            <Controller
                                name={`${selectedService}`}
                                defaultValue=""
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                    <View style={styles.dropdownTenure}>
                                        <DropDownPicker
                                            listMode="SCROLLVIEW" // "MODAL" // "FLATLIST"
                                            scrollViewProps={{
                                                nestedScrollEnabled: true
                                            }}
                                            style={styles.dropdown}
                                            open={tenureListOpen}
                                            value={value}
                                            items={tenures}
                                            setOpen={setTenureListOpen}
                                            setValue={onChange}
                                            setItems={setTenureList}
                                            placeholder="Select tenure"
                                            placeholderStyle={styles.placeholderStyles}
                                            onOpen={onTenureListOpen}
                                            onChangeValue={onChange}
                                            zIndex={1000}
                                            zIndexInverse={3000}
                                        />
                                    </View>
                                )}
                            />
                        </View>
                    )
                }

                {
                    (selectedService == null || selectedService == 'tournament') && (
                        <>
                            <Text style={styles.label}>Time</Text>
                            <Controller
                                name="time"
                                defaultValue=""
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                    <View>
                                        <TextInput 
                                            style={styles.input}
                                            placeholder="Show time Picker"
                                            onFocus={showTimePicker}
                                            value={value.toString()}
                                            showSoftInputOnFocus={false}
                                        />
                                        <DateTimePickerModal
                                            isVisible={isTimePickerVisible}
                                            mode="time"
                                            onConfirm={ time => {
                                                const formattedTime = getFormattedTime(time)
                                                handleConfirm(formattedTime)
                                                onChange(formattedTime)
                                            }}
                                            onCancel={hideTimePicker}
                                        />
                                    </View>
                                )}
                            />
                        </>
                    )
                }

                <Text style={styles.label}>Location</Text>
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
                        placeholder="Search Location"
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
                    <ButtonComponent label="Continue" onPress={handleSubmit(onSubmit)} />
                </View>

            </View>

        </KeyboardAwareScrollView>
    </SafeAreaProvider>

  );
}

export default EventFormScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20
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
    dropdownTenure: {
        zIndex: 999990,
    },
    dropdown: {
        borderColor: "#B7B7B7",
        height: 50,
        paddingHorizontal: 20,
        borderRadius: 29,
        // backgroundColor: colors.yellow
    },

});