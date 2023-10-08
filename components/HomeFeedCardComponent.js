import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

// Components
import FeedImageTitleComponent from './FeedImageTitleComponent';
import MetaWidgetComponent from './MetaWidgetComponent';
import DefaultBannerPlaceholderComponent from "./DefaultBannerPlaceholderComponent"
import BannerPlaceholderComponent from './BannerPlaceholderComponent';

// Constants
import colors from '../constants/colors';
import fonts from '../constants/fonts';

// Context
import { useTogsContext } from '../providers/AppProvider';

const HomeFeedCardComponent = ({item, style=null}) => {
    const navigation = useNavigation()
    const {getUserById} = useTogsContext();

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
        key={Math.random().toString()}
        style={{
            backgroundColor: colors.white,
            borderRadius: 7,
            margin: 8,
            width: 230, // 229
            overflow: 'hidden',

            elevation: 5,
            shadowColor: colors.shadowColor,
            shadowRadius: 5,
            shadowOffset: 5,
            shadowOpacity: 5,

            ...style
        }}

        onPress={() => navigation.navigate('EventScreen', {event: item,  prevScreen: 'Home'})}
    >
        {
            item.image ?
                (<BannerPlaceholderComponent source={item.image} style={{width:'100%', height:128}} />)
                :
                (<DefaultBannerPlaceholderComponent style={{width:'100%', height:128}} />)
        }


        {/* Content */}
        <View style={styles.container}>

            <View style={{...styles.content, marginBottom: 10, justifyContent: 'space-between'}}>

                {/* Title */}
                <FeedImageTitleComponent title={creator?.displayName} img={creator?.photoURL}  />

                {/* Price */}
                <View style={styles.content}>
                    <Text style={styles.price}>${item?.price ?? '0.00'}</Text>
                </View>

            </View>

            <View style={{...styles.content, gap: 15}}>
                <MetaWidgetComponent location={item.startDate} iconName="clock" />
                <MetaWidgetComponent location={item.location} iconName="location-pin" />
            </View>

        </View>
    </TouchableOpacity>
  )
}

export default HomeFeedCardComponent

const styles = StyleSheet.create({
    container:{
        paddingVertical: 10,
        paddingHorizontal: 15
    },
    content: {
        flexDirection:"row",
        gap:6,
        alignItems:"center"
    },
    price: {
        color: colors.textGreen,
        fontSize: 14,
        fontWeight: '700',
        fontFamily: fonts.bold
    }
})