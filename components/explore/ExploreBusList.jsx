import { View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, getDocs, query } from 'firebase/firestore'
import { db } from '@/config/Firebase'
import { useRouter } from 'expo-router'
import { Colors } from '@/constants/Colors'

const ExploreBusList = () => {
  const [list, setlist] = useState([])
  const [loading, setloading] = useState(false)
  useEffect(()=>{
    getData()
  },[])

  const getData=async()=>{
    setloading(true)
    const q=query(collection(db,'businessList'))
    const qSnapShot=await getDocs(q)
    const data=qSnapShot.docs.map((doc)=>({id:doc.id,...doc.data()}))
    setlist(data)
    setloading(false)
  }

const router=useRouter()

if (loading) {
  return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size={'large'} color='#f79a65' />
      </View>
  )
}

  const renderItem=({item})=>{
    return (
      <TouchableOpacity onPress={()=>router.push('/bussDetPost/'+item.id)} >
      <View className='w-90 m-7 py-2 pl-2  bg-gray-200' style={{borderRadius:12}} >
        <Image source={{uri:item.img}} width={290} style={{borderRadius:7}} height={150} />
        <Text  className='font-bold pl-3 pt-2 text-xl'>{item.name}</Text>
        <Text className='font-bold text-gray-400 pl-3'>Lorem, ipsum dolor sit amet consectetur </Text>

        {/* <Text>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rerum dolorem amet libero vero, et repellendus quasi molestias ea, exercitationem, explicabo error quo suscipit maxime repellat iste illo? Suscipit, pariatur optio?</Text> */}
      </View>
      </TouchableOpacity>
    )
  }

  return (
    <View>
      <Text className='ml-8 my-2 font-bold text-2xl' style={{color:Colors.primary}}>ExploreBusList</Text>
      <FlatList data={list} renderItem={renderItem} showsVerticalScrollIndicator={false}  />
    </View>
  )
}

export default ExploreBusList