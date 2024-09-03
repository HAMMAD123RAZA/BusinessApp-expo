import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import {collection, getDocs, query} from 'firebase/firestore'
import { db } from '../../config/Firebase'
import { FlatList } from 'react-native'
import { useRouter } from 'expo-router'


const Category = () => {

    const [cat, setcat] = useState([])

    const router=useRouter()

 useEffect(()=>{
getData()
    },[])

 const getData=async()=>{
try {
    const q=query(collection(db,'category'))
    const qSnapShot=await getDocs(q)
    const data=qSnapShot.docs.map((doc)=>doc.data())
    // console.log(data)
    setcat(data)
} 
catch (error) {
    console.log(error,'error in cats')
}
    }

    const renderItem=({item})=>{
        return (
            <View className='px-5' >
                <TouchableOpacity onPress={()=>router.push('/catList/'+item.name)} >
            <Image source={{uri:item.img}} width={70} height={30}  />
            <Text className='px-2 pt-3' >{item.name}</Text>
            </TouchableOpacity>
            </View>
        )
    }

  return (
    <View className='py-5' >
        <FlatList
        renderItem={renderItem}
        data={cat}
         horizontal 
         showsHorizontalScrollIndicator={false} />
    </View>
  )
}

export default Category