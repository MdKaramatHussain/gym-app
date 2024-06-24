import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useEffect } from 'react';
import { fetchExercisesByBodyPart } from '../api/exercisesDB';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Ionicons from "react-native-vector-icons/Ionicons";
import { StatusBar } from 'expo-status-bar';
import { backExcercise } from '../constants';
import ExcerciseList from '../components/ExcerciseList';
import { ScrollView } from 'react-native-virtualized-view';


export default function Exercises() {
  const router = useRouter();
  const [exercises, setExcercises] = useState([])
  const item = useLocalSearchParams()
  // console.log('got items:', item);

  useEffect(() => {
    if (item) getExcercises(item.name);
  }, []) //[item]

  const getExcercises = async (bodypart) => {
    let data = await fetchExercisesByBodyPart(bodypart)
    // console.log('got data of excersises by body parts of component excercises function getExcersises', data)
    setExcercises(data)
  }
  return (
    <ScrollView>
      <StatusBar style='light' />
      <Image
        source={item.image}
        style={{ width: wp(100), height: hp(45) }}
        className='rounded-b-[45px]'
      />
      <TouchableOpacity
        onPress={() => router.back()}
        className='bg-rose-500 mx-4 absolute flex justify-center item-center rounded-full'
        style={{ height: hp(5.5), width: hp(5.5), marginTop: hp(7) }}
      >
        <Ionicons name='caret-back-outline' size={hp(5)} color={'white'} />
      </TouchableOpacity>

      {/* excercises */}
      <View className='mx-4 space-y-3 mt-4' >
        <Text style={{ fontSize: hp(3) }} className='font-semibold text-neutral-700'>
          {item.name} excercises
        </Text>
        <View className='mb-10'>
          <ExcerciseList data={exercises} />
        </View>
      </View>
    </ScrollView>
  )
}