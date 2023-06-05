import React from 'react';
import {Dimensions, Image} from 'react-native';
import {Carousel} from 'react-native-auto-carousel';

const DEVICE_WIDTH = Dimensions.get('window').width;
const IMAGES = [
    require( '../assets/bg/screen-1.png' ),
    require( '../assets/bg/screen-2.png' ),
    require( '../assets/bg/screen-3.png' ),
    require( '../assets/bg/screen-4.png' ),
    require( '../assets/bg/screen-5.png' ),
    require( '../assets/bg/screen-6.png' ),
    require( '../assets/bg/screen-7.png' ),
    require( '../assets/bg/screen-frame.png' ),
];


const CarouselComponent = () => {
return (
    <Carousel
      data={IMAGES}
      autoplay={true}
      autoPlayTime={3000}
      dotStyle='none'
      renderItem={item => (
        <Image
          key={item}
          source={item}
          style={{
            height: '100%',
            width: DEVICE_WIDTH
          }}
        />
      )}
    />
   )
}

export default CarouselComponent;