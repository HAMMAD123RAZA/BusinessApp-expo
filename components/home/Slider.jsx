import { View, Text, FlatList, Image, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import {collection, getDocs, query} from 'firebase/firestore'
import { db } from '../../config/Firebase'

const Slider = () => {
const [slider, setslider] = useState([])
  const [loading, setloading] = useState(false)
  useEffect(()=>{
getData()
    },[])

    const getData=async()=>{
      setloading(true)
try {
    const q=query(collection(db,'listing'))
    const qSnapShot=await getDocs(q)
    const data=qSnapShot.docs.map((doc)=>doc.data())
    // console.log(data)
    setslider(data)
} 
catch (error) {
    console.log(error,'error in sliders')
}
finally{
  setloading(false)
}
    }

    if (loading) {
      return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <ActivityIndicator size={'large'} color='#f79a65' />
          </View>
      )
  }

    const renderItem=({item})=>{
      return (
        <View className='px-3  py-2' >
          <Image source={{uri:item.img}} style={{borderRadius:13}} width={200} height={130}  />
        </View>
      )
    }

  return (
    <View className='my-3  '>
      <Text className='font-bold text-2xl py-2 pl-4 text-orange-400' >You May Like It 😊</Text>
      <FlatList horizontal showsHorizontalScrollIndicator={false}  data={slider} renderItem={renderItem}  />
    </View>
  )
}

export default Slider