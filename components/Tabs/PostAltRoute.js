import { StyleSheet, Image, View, Text, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
// Navigation
import { useNavigation } from '@react-navigation/native';

// Context
import { useTogsContext } from '../../providers/AppProvider';

// Constants
import colors from '../../constants/colors';
import sizes from '../../constants/sizes';
import NoDataNoticeComponent from '../NoDataNoticeComponent';
import fonts from '../../constants/fonts';

const PostRoute = ( {numCols=3, userId=null} ) => {
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
                  // keyExtractor={item => item.id}
                  key={Math.random().toString()}
                  numColumns={numCols}
                  renderItem={({item, index}) => {
                  return (
                  <TouchableOpacity
                      style={{
                          margin: 4,
                          flex: 1,
                          // backgroundColor: colors.primaryColorTrans,
                          // borderRadius: 15
                      }}
                      onPress={() => navigation.navigate( 'PostScreen', {post: item, prevScreen: 'ProfileAlt'} ) }
                  >
                      {
                        (item.image && !item.image.includes('file:')) ?
                          (
                            <View
                                style={{
                                flexGrow:1,
                                // shadow
                                    elevation: 4,
                                    shadowColor: colors.shadowColor,
                                    shadowOffset: {width: -2, height: 4},
                                    shadowOpacity: 0.5,
                                    shadowRadius: 3,
            
                                    margin:2
                                }}
                            >
                                <Image
                                source={{uri:item.image}}
                                style={{
                                    flexGrow:1,
                                    width: '100%',
                                    height: '100%',
                                    maxWidth: 120,
                                    maxHeight: 120,
                                    borderRadius: 8,
                                }}
                                />
                            </View>
                          )
                          :
                          (
                            <View
                              style={{
                                flex:1,
                                maxWidth: '100%',
                                minHeight: 75,
                                borderRadius: 15,
                                backgroundColor: colors.secondaryColor,
                                justifyContent:"center",
                                alignItems:"center"
                              }}
                            >
                              <Text style={{color:colors.white,fontWeight:'800',fontFamily:fonts.bold}}>{item?.title ?? 'Anonymous Post'}</Text>
                            </View>
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

export default PostRoute

const styles = StyleSheet.create({})