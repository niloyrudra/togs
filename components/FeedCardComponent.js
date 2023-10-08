import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'

// Components
import FeedImageTitleComponent from './FeedImageTitleComponent'

// Constants
import colors from '../constants/colors'
import fonts from '../constants/fonts'
import StatWidgetComponent from './StatWidgetComponent'

// Context
import { useTogsContext } from '../providers/AppProvider'

const FeedCardComponent = ({ item, onPress, commentCount=null }) => {
    const { user, getUserById } = useTogsContext()

    const [eventCommentsCount, setEventCommentsCount] = React.useState( commentCount != null ? commentCount : 0)
    const [ creator, setCreator ] = React.useState(null);

    React.useEffect(() => {
        const update = async () => {
            try {
                const eventCreator = await getUserById( item?.creatorId );
                setCreator(prevValue => prevValue = eventCreator);
            }
            catch (err) {
                console.log( err )
            }
        }
        update();
    }, [ item?.id ]);

  return (
    <TouchableOpacity
        style={{
            backgroundColor: colors.white,
            borderRadius: 7,
            marginHorizontal: 5,
            marginTop: 5,
            marginBottom: 10,
            padding: 15,
            // width: 230, // 229
            overflow: 'hidden',

            elevation: 5,
            shadowColor: colors.shadowColor,
            shadowRadius: 5,
            shadowOffset: 5,
            shadowOpacity: 5
        }}
        onPress={onPress}
    >

        {/* Content */}
        <View style={{...styles.content, justifyContent: 'space-between'}}>
            {/* Title */}
            <FeedImageTitleComponent title={creator?.displayName ?? "Anonymous"} img={creator?.photoURL ?? null}  />
            {/* Time */}
            {
                item?.startDate && (
                    <View>
                        <Text style={styles.time}>{item.startDate}</Text>
                    </View>
                )
            }
            {
                !item?.startDate && item?.createdAt && (
                    <View>
                        <Text style={styles.time}>{item.createdAt.substring( item.createdAt.length-11, item.createdAt.length ).trim()}</Text>
                    </View>
                )
            }
        </View>

        {/* Description */}
        {
            item?.content && (
                <View style={styles.content}>
                    <Text style={styles.info}>
                        {item.content.substring(0, 150)}
                    </Text>
                </View>
            )
        }

        {/* Gallery */}
        <View style={styles.content}>
            {
                item?.image && (
                    <>
                        <Image
                            key={Math.random().toString()}
                            source={item?.image ? {uri: item.image} : require('../assets/temp/events/event-1.png') }
                            style={{
                                width: '32.5%', // 106,
                                height: 106,
                                borderRadius: 7
                            }}
                        />
                        <Image
                            key={Math.random().toString()}
                            source={item?.image ? {uri: item.image} : require('../assets/temp/events/event-1.png') }
                            style={{
                                width: '32.5%', // 106,
                                height: 106,
                                borderRadius: 7
                            }}
                        />
                        <Image
                            key={Math.random().toString()}
                            source={item?.image ? {uri: item.image} : require('../assets/temp/events/event-1.png') }
                            style={{
                                width: '32.5%', // 106,
                                height: 106,
                                borderRadius: 7
                            }}
                        />
                    </>
                )
            }
            {/* {
                item.gallery.map( (item, index) => (
                    <Image
                        key={index}
                        source={item}
                        style={{
                            width: '32.5%', // 106,
                            height: 106,
                            borderRadius: 7
                        }}
                    />
                ))
            } */}
        </View>

        {/* Footer */}
        <View style={styles.footer}>
            <StatWidgetComponent
                count={item?.likes?.length ?? 0}
                style={{
                    tintColor: item?.likes?.includes( user?.userId ) ? colors.accentColor : colors.infoColor
                }}
                iconName="heart"
                disabled={true}
                // onPress={() => console.log("LIKE")}
            />
            <StatWidgetComponent
                count={eventCommentsCount} // {item.comments}
                iconName="message"
                disabled={true}
                // onPress={() => console.log("MESSAGES")}
            />
            <StatWidgetComponent
                count={item?.shares?.length ?? 0} // {item.share}
                iconName="export"
                disabled={true}
                // onPress={() => console.log("SHARE")}
            />
        </View>

    </TouchableOpacity>
  )
}

export default FeedCardComponent

const styles = StyleSheet.create({
    content: {
        flexDirection:"row",
        gap: 6,
        alignItems:"center",
        marginBottom: 15,
        // marginVertical: 15,
    },
    time: {
        color: colors.textColor,
        fontSize: 14,
        fontWeight: '700',
        fontFamily: fonts.bold
    },
    info: {
        color: colors.infoColor,
        fontSize: 12,
        fontWeight: '500'
    },
    footer: {
        flexDirection: "row",
        justifyContent: "space-between"
    }
})