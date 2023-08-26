import { StyleSheet, Image, View, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
// Navigation
import { useNavigation } from '@react-navigation/native';
// Icons
import { Ionicons } from '@expo/vector-icons';

// Components
import { FloatingAction } from 'react-native-floating-action';
import CardWithoutImageComponent from './partials/CardWithoutImageComponent';
import CardWithImageComponent from './partials/CardWithImageComponent';

// Context
import { useTogsContext } from '../../providers/AppProvider';

// Constants
import colors from '../../constants/colors';
import sizes from '../../constants/sizes';
import NoDataNoticeComponent from '../NoDataNoticeComponent';

const PostRoute = ( {numCols=3} ) => {
    const navigation = useNavigation()
    const { user, posts } = useTogsContext();
  
    const [ownedPosts, setOwnedPosts] = React.useState(posts);
    const [isLoading, setIsLoading] = React.useState(false);
  
    React.useEffect(() => {
      if(user?.userId) {
        setIsLoading(true)
        const userPosts = posts.filter( post => post.creatorId == user?.userId )
        setOwnedPosts(userPosts)
        setIsLoading(false)
      }
    },[user?.userId, posts.length])
  
    if(isLoading) return (
      <View
        style={{
          flex: 1,
          justifyContent:"center",
          alignItems:"center"
        }}
      >
        <ActivityIndicator size={sizes.xlLoader} color={colors.primaryColor} />
      </View>
    );
    return (
    <View
      style={{
        flex: 1,
        paddingTop: 20,
      }}
    >
        {
            ownedPosts.length > 0
                ?
                (
                    <FlatList
                        data={ownedPosts}
                        // keyExtractor={item => item.id}
                        key={Math.random().toString()}
                        numColumns={numCols}
                        renderItem={({item, index}) => {
                        // console.log(item.image)
                        return (
                        <TouchableOpacity
                            style={{
                                margin: 4,
                                flex: 1,
                            }}
                            onPress={() => navigation.navigate( 'PostScreen', {post: item, prevScreen: 'Profile'} ) }
                        >
                            {
                              (item.image && !item.image.includes('file:')) ?
                                (
                                  <CardWithImageComponent image={item?.image} />
                                )
                                :
                                (
                                 <CardWithoutImageComponent title={item?.title ?? ''} />
                                )
                            }
                            
                        </TouchableOpacity>
                        )}}
                        ListFooterComponent={(
                        <View style={{marginTop: 100}}/>
                        )}
                    />
                )
                :
                (
                    <NoDataNoticeComponent message="No posts available now. Please Try Later!" />
                )
        }
      <FloatingAction
        floatingIcon={<Ionicons name="add-outline" style={{marginTop:0}} size={50} color={colors.white} />}
        onPressMain={() => navigation.navigate('PostEdit')}
        position='right'
      />
    </View>
  )
};

export default PostRoute

const styles = StyleSheet.create({})