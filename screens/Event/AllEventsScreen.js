import { StyleSheet, Text, View, FlatList } from 'react-native'
import React from 'react'
import { BackHandler } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaView } from 'react-native-safe-area-context'

// Constants
import colors from '../../constants/colors'
import fonts from '../../constants/fonts'
import sizes from '../../constants/sizes'

// Components
import FeedEventCardComponent from '../../components/FeedEventCardComponent'

// Context
import { useTogsContext } from '../../providers/AppProvider'

const AllEventsScreen = ({ navigation, route}) => {

    const {events} = useTogsContext();
    
    function handleBackButtonClick() {
        navigation.jumpTo("HomeTab");
        return true;
    }
      
    React.useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
        return () => {
          BackHandler.removeEventListener("hardwareBackPress", handleBackButtonClick);
        };
    }, []);
    
  return (
    <SafeAreaView style={styles.container}>
        {/* Status Bar */}
        <StatusBar
            animated={true}
            style="light"
        />

        <View
            style={{
                flex:1,
            }}
        >

            <FlatList
                data={events}
                keyExtractor={item => item.id}
                ListHeaderComponent={(<View style={{marginBottom:10}}>
                    <Text style={{fontFamily: fonts.bold, fontSize: sizes.label, color: colors.infoColor}}>Number of Event(s): {events?.length}</Text>
                </View>)}
                renderItem={({item, index}) => (
                    <FeedEventCardComponent item={item}  commentCount={item?.commentCount ?? 0} onPress={() => navigation.navigate("EventScreen", {event: item, prevScreen: "AllEventsScreen"})} />
                )}
                ListFooterComponent={(<View style={{height:50}} />)}
            />

        </View>

    </SafeAreaView>
  );
}

export default AllEventsScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:"flex-start",
        alignItems:"flex-start",
        paddingTop: 0,
        paddingBottom: 20,
        paddingHorizontal: 20
    }
})