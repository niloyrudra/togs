import React from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  ActivityIndicator
} from "react-native";
import { useForm, Controller } from 'react-hook-form';
import { SafeAreaProvider } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { StatusBar } from "expo-status-bar";
import { BackHandler } from 'react-native'

// Components
import ImageUploadComponent from "../../components/ImageUploadComponent";
import ButtonComponent from "../../components/ButtonComponent";

// Constants
import sizes from "../../constants/sizes";
import fonts from "../../constants/fonts";
import colors from "../../constants/colors";

// Context
import { useTogsContext } from "../../providers/AppProvider";

// Utilities
import { getCurrentDate } from "../../utils/utils";

const PostFormScreen = ({navigation}) => {

    const { user, onAddPost } = useTogsContext()
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const handleBackButtonClick = () => {
        navigation.jumpTo("HomeTab");
        return true;
    }
    // Form Submit Handler
    const { handleSubmit, control, reset, resetField } = useForm();
    const onSubmit = async (data) => {
        try {
            setIsSubmitting(true)
            data.createdAt = getCurrentDate() // June 10th 2023, 2:48:48 am
            data.creatorId = user?.userId
            data.commentCount = 0
            data.likes = []
            data.shares = []
            await onAddPost( data )
            resetField();
            reset();
            setIsSubmitting(false)
        }
        catch( error ) {
            console.error( 'Post Submit error >> ', error )
            setIsSubmitting(false)
        }
    };

    React.useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
        return () => {
          BackHandler.removeEventListener("hardwareBackPress", handleBackButtonClick);
        };
    }, []);

  return (
    <SafeAreaProvider>
        <StatusBar
            animated={true}
            style="light"
        />
        <KeyboardAwareScrollView>

            <View style={styles.container}>
                
                <Text style={styles.label}>Title</Text>
                <Controller
                    name="title"
                    defaultValue=""
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            style={styles.input}
                            selectionColor={"#5188E3"}
                            onChangeText={onChange}
                            value={value}
                            keyboardAppearance="default"
                        />
                    )}
                />
                
                <Text style={styles.label}>Upload Image</Text>
                <Controller
                    name="image"
                    defaultValue=""
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <ImageUploadComponent
                            onUpload={onChange}
                            image={value ? value : null}
                            isBanner={true}
                        />
                    )}
                />

                <Text style={styles.label}>Content</Text>
                <Controller
                    name="content"
                    defaultValue=""
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            style={styles.textArea}
                            selectionColor={"#5188E3"}
                            onChangeText={onChange}
                            value={value}
                            multiline={true}
                            // numberOfLines={6}
                            placeholder="Write post description"
                        />
                    )}
                />

                <View style={{ marginVertical: 20 }}>
                    {
                        isSubmitting ?
                            (
                                <ActivityIndicator size='large' color={colors.primaryColor} />
                            )
                            :
                            (
                                <ButtonComponent label="Continue" onPress={handleSubmit(onSubmit)} />
                            )
                    }
                </View>

            </View>

        </KeyboardAwareScrollView>

    </SafeAreaProvider>

  )
}

export default PostFormScreen

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
        borderRadius: 29,
        borderWidth: 1,
        fontSize: 20,
        paddingHorizontal: 20,
        justifyContent: 'flex-start',
        alignItems: "flex-start",
        height: 120
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