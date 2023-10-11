import { View, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
// Navigation
import { useNavigation } from '@react-navigation/native';

// Components
import NoDataNoticeComponent from '../NoDataNoticeComponent';
import CardWithoutImageComponent from './partials/CardWithoutImageComponent'
import CardWithImageComponent from './partials/CardWithImageComponent';
import ActivityIndicatorComponent from "../../components/ActivityIndicatorComponent"

// Context
import { useTogsContext } from '../../providers/AppProvider';

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
  
    if(isLoading) return (<ActivityIndicatorComponent />);

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
          (
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
                      onPress={() => navigation.navigate( 'PostScreen', {post: item, prevScreen: 'ProfileAlt'} ) }
                    >
                      {
                        (item.image && !item.image.includes('file:')) ?
                          (<CardWithImageComponent image={item.image} />)
                          :
                          (<CardWithoutImageComponent />)
                      }
                      
                    </TouchableOpacity>
                  ))
          )
          :
          (<NoDataNoticeComponent message="No posts available now. Please Try Later!" />)
      }
    </View>
  )
};

export default PostAltRoute