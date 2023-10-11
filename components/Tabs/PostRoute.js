import { StyleSheet, Image, View, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
// Navigation
import { useNavigation } from '@react-navigation/native';

// Components
import CardWithoutImageComponent from './partials/CardWithoutImageComponent';
import CardWithImageComponent from './partials/CardWithImageComponent';
import AddFloatingButtonComponent from "../AddFloatingButtonComponent"

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
        const userPosts = posts.filter( post => post?.creatorId == user?.userId )
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
        flex:1,
        flexDirection: "row",
        flexWrap: "wrap",
        paddingTop: 10,
        paddingBottom: 30,
      }}
    >
        {
            ownedPosts.length > 0
              ?
                ownedPosts.map((item, index) => (
                  <TouchableOpacity
                    key={item.id}
                    style={{
                      margin: 4,
                      flexGrow: 1,
                      width: "100%",
                      maxWidth: 120,
                      maxHeight: 120
                    }}
                    onPress={() => navigation.navigate( 'PostScreen', {post: item, prevScreen: 'Profile'} ) }
                  >
                    {
                      (item.image && item?.image.includes("firebasestorage")) ?
                        (<CardWithImageComponent image={item?.image} />)
                        :
                        (<CardWithoutImageComponent />)
                    }
                  </TouchableOpacity>
                ))
                
              :
                (<NoDataNoticeComponent message="No posts available now. Please Try Later!" />)
        }

        {/* Add Event Button */}
        <AddFloatingButtonComponent size={50} color={colors.white} position="right" style={{marginTop:0}} onTap={() => navigation.navigate('PostEdit')} />

    </View>
  )
};

export default PostRoute

const styles = StyleSheet.create({})