import { StyleSheet, Image, View, Text, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
// Navigation
import { useNavigation } from '@react-navigation/native';

// Components
import NoDataNoticeComponent from '../NoDataNoticeComponent';
import CardWithoutImageComponent from './partials/CardWithoutImageComponent'
import CardWithImageComponent from './partials/CardWithImageComponent';

// Context
import { useTogsContext } from '../../providers/AppProvider';

// Constants
import colors from '../../constants/colors';
import sizes from '../../constants/sizes';

const PostAltRoute = ( {numCols=3, userId=null} ) => {
    const navigation = useNavigation()
    const { posts } = useTogsContext();
  
    const [ownedPosts, setOwnedPosts] = React.useState(posts);
    const [isLoading, setIsLoading] = React.useState(false);
  
    React.useEffect(() => {
      if(userId) {
        setIsLoading(true)
        const userPosts = posts.filter( post => post.creatorId == userId )
        setOwnedPosts( prevValue => prevValue = userPosts)
        setIsLoading(false)
      }
    },[userId, posts.length])
  
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
                  // getItemLayout={}
                  // keyExtractor={item => item.id}
                  // scrollEnabled={false}
                  // listOptionProps={{nestedScrollEnabled: true}}
                    nestedScrollEnabled={true}
                  key={Math.random().toString()}
                  numColumns={numCols}
                  renderItem={({item, index}) => {
                  return (
                    <TouchableOpacity
                      style={{
                        margin: 4,
                        flex: 1,
                      }}
                      onPress={() => navigation.navigate( 'PostScreen', {post: item, prevScreen: 'ProfileAlt'} ) }
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

    </View>
  )
};

export default PostAltRoute

const styles = StyleSheet.create({})