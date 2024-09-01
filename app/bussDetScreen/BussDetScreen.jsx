import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'

const BussDetScreen = ({item}) => {
    const router=useRouter()
  return (
    <TouchableOpacity onPress={()=>router.push('/bussDetPost/'+item.id)} >

    <View className='bg-gray-200 p-3 mx-4 my-3 rounded-xl flex-row gap-3 ' >
        <Image style={{borderRadius:13}} source={{uri:item.img}} width={120} height={ 110} />
        <View>
        <Text className='font-bold mt-1 ' >{item.name}</Text>
        <Text className='my-1 text-gray-500' >Lorem ipsum consectetur sicin</Text>
        <View className='flex-row gap-2  ' >
            <Ionicons name='star' size={22} color='orange' />
            <Text>4.5</Text>
        </View>
        </View>
    </View>
            </TouchableOpacity>

  )
}

export default BussDetScreen