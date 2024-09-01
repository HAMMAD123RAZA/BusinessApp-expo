import { View, Text, Image, Dimensions } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import {Colors} from '../../constants/Colors'

const Intro = ({ item }) => {
  const { width } = Dimensions.get('window');

  return (
    <View>
      <View className="relative">
        {/* Image */}
        <Image source={{ uri: item.img }} style={{ width: width, height: 230 }} />

        {/* Icons positioned over the image */}
        <View className="absolute flex-row justify-between w-full p-4">
          <Ionicons size={28} color={Colors.primary} name="arrow-undo-circle-outline" />
          <Ionicons name="heart" color={Colors.primary} size={28} />
        </View>
      </View>
      <View className='bg-gray-200 rounded-md px-3  ' style={{borderTopLeftRadius:12,borderTopRightRadius:14}} >

<Text className='font-bold my-2 text-xl'>{item.name}</Text>
<Text>Lorem ipsum dolor sit, amet consectetur </Text>

    </View>
    </View>
  );
};
  
export default Intro;