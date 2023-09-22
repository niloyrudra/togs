import { FlatList } from 'react-native'
import React from 'react'

// Components
import HomeFeedCardComponent from './HomeFeedCardComponent'
import NoDataNoticeComponent from './NoDataNoticeComponent';

const ElementListComponent = ({data=[], style=null}) => {
  return (
    <>
      {
        data.length > 0 ?
          (
            <FlatList
              data={data}
              keyExtractor={item => item.id}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              renderItem={({item}) => (
                <HomeFeedCardComponent item={item} style={{...style}} />
              )}
            />
          )
          :
          (
            <NoDataNoticeComponent label="events" />
          )
      }
    </>
  )
}

export default ElementListComponent