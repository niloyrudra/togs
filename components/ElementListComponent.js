import { FlatList } from 'react-native'
import React from 'react'

// Components
import HomeFeedCardComponent from './HomeFeedCardComponent'

const DATA = [
    {
        id:1,
        title: 'Mooi',
        date: '15-01-23',
        location: 'Zavile',
        price: '389',
        banner: require('../assets/temp/events/banner/stadium.png'),
        author: {
            img: require('../assets/icons/mooi.png')
        }
    },
    {
        id:2,
        title: 'Slack',
        date: '25-01-23',
        location: 'Lead',
        price: '307',
        banner: require('../assets/temp/events/banner/stadium-2.png'),
        author: {
            img: require('../assets/icons/slack.png')
        }
    },
    {
        id:3,
        title: 'Goed',
        date: '18-01-23',
        location: 'Lahore',
        price: '120',
        banner: require('../assets/temp/events/banner/stadium.png'),
        author: {
            img: require('../assets/icons/goed.png')
        }
    },
    {
        id:4,
        title: 'Mooi',
        date: '18-01-23',
        location: 'Islamabad',
        price: '158',
        banner: require('../assets/temp/events/banner/stadium-2.png'),
        author: {
            img: require('../assets/icons/mooi.png')
        }
    },
];

const ElementListComponent = ({data=DATA, style=null}) => {
  return (
    <>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <HomeFeedCardComponent item={item} style={{...style}} />
        )}
      />
    </>
  )
}

export default ElementListComponent