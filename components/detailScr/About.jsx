import { View, Text, FlatList, TouchableOpacity, Linking } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';

const About = ({ item }) => {
  const data = [
    {
      id: 1,
      name: 'Call',
      icon: 'call',
      url: 'tel:' + item.contact,
    },
    {
      id: 2,
      name: 'Map',
      icon: 'location',
      url: 'https://:' + item.location,
    },
    {
      id: 3,
      name: 'Web',
      icon: 'globe',
      url: 'https://:' + item.web,
    },
    {
      id: 4,
      name: 'share',
      icon: 'share',
      url: 'sms:' + item.share,
    },
  ];

  const handlePress=(item)=>{
    Linking.openURL(item.url)
  }

  const renderItem = ({ item: el }) => {
    return (
      <TouchableOpacity onPress={()=>handlePress(el)} key={el.id} className=" mx-5 my-2">
        <Ionicons name={el.icon} size={22} color={Colors.primary} />
        <Text>{el.name}</Text>
      </TouchableOpacity >
    );
  };

  return (
    <View className="bg-gray-200 rounded-md py-2">
      <FlatList
        data={data}
        renderItem={renderItem}
        horizontal
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ justifyContent: 'space-between', width: 360 }}
      />
      <Text  className='font-bold px-4 text-xl ' >About</Text>
      <Text style={{lineHeight:24}} className='px-5' >Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam dolore, nostrum ipsa sequi repellendus quidem modi. Soluta vero consectetur ullam aut maiores dolores laboriosam aperiam, cumque temporibus , cumque temporibus indem m8red</Text>
    </View>
  );
};

export default About;
