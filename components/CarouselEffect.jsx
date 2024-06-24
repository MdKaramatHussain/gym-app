import * as React from 'react';
import { Dimensions, Image, Text, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { sliderImages } from '../constants';

export default function CarouselEffect() {
    const width = Dimensions.get('window').width;
    return (
        <View style={{ flex: 1 }}>
            <Carousel
                loop
                width={wp(100)}
                height={hp(25)}
                autoPlay={true}
                data={[...new Array(5).keys()]}
                scrollAnimationDuration={3000}
                mode='parallax'
                pagingEnabled={true}
                snapEnabled={true}
                
                renderItem={({ index }) => (
                    <View
                        style={{
                            // flex: 1,
                            // justifyContent: 'center',
                            display:'flex',
                            alignItems:'center',
                            resizeMode:'contain'
                        }}
                        
                    >
                        <Image className='rounded-[30px]' style={{height:(200), width:wp(100)-70}} source={sliderImages[index]} />
                    </View>
                )}
            />
        </View>
    );
}
