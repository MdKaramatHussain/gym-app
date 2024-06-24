import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import { Image } from 'expo-image'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Animated, { FadeInDown } from 'react-native-reanimated';

export default function ExcerciseList({ data }) {
    const router = useRouter()
    return (
        <View>
            <FlatList
                data={data}
                numColumns={2}
                keyExtractor={item => item.name}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 60, paddingTop: 20 }}
                columnWrapperStyle={{
                    justifyContent: 'space-between'
                }}
                renderItem={({ item, index }) => <ExcerciseCard router={router} index={index} item={item} />}
            />
        </View>
    )
}

const ExcerciseCard = ({ item, router, index }) => {
    // console.log(item)
    return (
        <Animated.View entering={FadeInDown.duration(400).delay(index*200).springify()}>
            <TouchableOpacity onPress={() => router.push({ pathname: '/exerciseDetails', params: item })} className='flex py-3 space-y-2'>
                <View className='bg-neutral-200 shadow rounded-[25px]'>
                    <Image
                        source={{ uri: item.gifUrl }}
                        contentFit='cover'
                        style={{ width: wp(44), height: wp(30) }}
                        className='rounded-[25px]'
                    />
                </View>
                <Text
                style={{fontSize:hp(2)}}
                className='text-neutral-600 font-semibold ml-1 tracking-wide'
                >
                    {
                        item?.name?.length > 15 ? item.name.slice(0, 15) + '...' : item?.name
                    }
                </Text>
            </TouchableOpacity>
        </Animated.View>
    )
}