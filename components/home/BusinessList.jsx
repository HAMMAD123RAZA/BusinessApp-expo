import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import {collection, getDocs, query} from 'firebase/firestore'
import { db } from '../../config/Firebase'
import { FlatList } from 'react-native-gesture-handler'
import BussListCard from './BussListCard'

const BusinessList = () => {
    const [bussinessList, setbussinessList] = useState([])

    useEffect(()=>{
        getData()
            },[])
        
         const getData=async()=>{
        try {
            const q=query(collection(db,'businessList'))
            const qSnapShot=await getDocs(q)
            const data=qSnapShot.docs.map((doc)=>({id:doc.id,...doc.data()}))
            // console.log(data)
            setbussinessList(data)
        } 
        catch (error) {
            console.log(error,'error in cats')
        }
            }
        
            const renderItem=({item})=>{
                return (
                    <View>
                    <BussListCard item={item} />
                    </View>
                )
            }

  return (
    <View>
      <Text className='font-bold text-2xl pl-5 text-orange-400 py-2' >BusinessList</Text>
      <FlatList
        renderItem={renderItem}
        data={bussinessList}
         horizontal 
         showsHorizontalScrollIndicator={false} />
    </View>
  )
}

export default BusinessList