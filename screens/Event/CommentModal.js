import { Text, View, Animated, TextInput, StyleSheet, Modal, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native'
import React from 'react'
// import DateTimePickerModal from "react-native-modal-datetime-picker";
// import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {useForm, Controller} from 'react-hook-form';
import { Ionicons } from '@expo/vector-icons';

// Components
import ButtonComponent from "../../components/ButtonComponent";
import CommentListItemComponent from '../../components/CommentListItemComponent';

// Utils
import { getFormattedDate, getCurrentDateLit } from '../../utils/utils';

// Constants
import sizes from "../../constants/sizes";
import fonts from "../../constants/fonts";
import colors from "../../constants/colors";

// Context
import { useTogsContext } from '../../providers/AppProvider';

const CommentModal = ({ navigation, refEle, isVisible, onClose, event }) => {
    const modelAnimatedValue = React.useRef( new Animated.Value(0) ).current

    const { user, comments, onAddComments, onGetComments } = useTogsContext();

    const [ showModal, setShowModal ] = React.useState( isVisible )
    const [ commentData, setCommentData ] = React.useState( [] )
    const [ isSubmitted, setIsSubmitted ] = React.useState( false )

    React.useEffect( () => {
        if( showModal ) {
            Animated.timing( modelAnimatedValue, {
                toValue: 1,
                duration: 500,
                useNativeDriver: false
            })
            .start();

            setCommentData( comments.filter(item => { if( item.eventId == event.id ) return item } )[0].data )
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

    const { handleSubmit, control, reset, resetField } = useForm();
    const onSubmit = async (data) => {
        setIsSubmitted(true)
        data.creator = {
            name: user.displayName,
            photoURL: user.photoURL
        }
        data.createdAt = getCurrentDateLit(); // getFormattedDate();

        await onAddComments( event, data )
        await onGetComments( event.id )
       
        resetField();
        reset();
        setIsSubmitted(false)

        // onClose();

    };

    React.useEffect(() => {
        setCommentData( comments.filter(item => { if( item.eventId == event.id ) return item } )[0].data )
    }, [onGetComments])
    
    return (
        <Modal>

            <View
                style={{
                    flex: 1,
                    paddingHorizontal: 20,
                    // paddingVertical: 30,
                    // paddingBottom: 20,
                    // backgroundColor: 'blue'
                }}
            >
                <View
                    style={{
                        marginVertical: 15,
                        paddingBottom: 8,
                        borderBottomWidth: 1,
                        borderBottomColor: '#e5e5e5',
                        height: 60,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center"
                    }}
                >
                    <Text style={styles.commentHeading}>All Comments({commentData?.length ?? 0})</Text>

                    <TouchableOpacity
                        onPress={() => onClose()}
                    >
                        <Ionicons name="close-circle-outline" size={30} color={colors.dark} />
                    </TouchableOpacity>

                </View>

                {
                    commentData?.length > 0 ?
                        (

                            <View
                                style={{
                                    flex: 1,
                                }}
                            >
                                <FlatList
                                    data={commentData}
                                    key={Math.random().toString()}
                                    style={{
                                        flex:1
                                    }}
                                    renderItem={({ item, index }) => (
                                        <CommentListItemComponent comment={item} />
                                    )}
                                />
                            </View>
                        )
                        :
                        (
                            <View>
                                <Text>No Comments</Text>
                            </View>
                        )
                }
            </View>

            <View style={styles.container}>

                {/* <View
                    style={{
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    
                    <View>
                        <Text style={{fontFamily: fonts.bold, fontSize: sizes.fontTitle, color: colors.dark}}>Put your comment here!</Text>
                    </View>
                </View> */}

                <Text style={styles.label}>Your Comment</Text>
                <Controller
                    name="comment"
                    defaultValue=''
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            style={styles.textArea}
                            selectionColor={"#5188E3"}
                            onChangeText={onChange}
                            value={value}
                            multiline={true}
                            numberOfLines={4}
                            placeholder="Write your comment"
                        />
                    )}
                />

                <View
                    style={{
                        marginTop: 10
                    }}
                >
                {
                    isSubmitted ?
                    (
                        <ActivityIndicator size={sizes.xlLoader} color={colors.primaryColor} />
                    )
                    :
                    (
                        <ButtonComponent label="Submit" onPress={handleSubmit(onSubmit)} />
                    )
                }
                </View>
                
                <View style={{height: 30}} />

            </View>
            
        </Modal>
    )
}

export default CommentModal

const styles = StyleSheet.create({
    container: {
        justifyContent:"flex-end",
        paddingHorizontal: 20,
        backgroundColor: colors.white,
        borderTopColor: '#e5e5e5',
        borderTopWidth: 1
    },
    commentHeading: {
        fontSize: sizes.fontTitle,
        color: colors.dark
    },
    textArea: {
        borderStyle: "solid",
        borderColor: '#8E8E93', // "#B7B7B7",
        borderRadius: 10,
        borderWidth: 1,
        fontSize: 20,
        paddingHorizontal: 20,
        justifyContent: 'flex-start',
        alignItems: "flex-start",
        height: 50
    },
    label: {
        marginTop: 15,
        marginBottom: 8,
        fontSize: sizes.fontText,
        fontWeight: '600',
        fontFamily: fonts.regular,
        color: colors.dark
    },
    placeholderStyles: {
        color: "grey",
    },
});