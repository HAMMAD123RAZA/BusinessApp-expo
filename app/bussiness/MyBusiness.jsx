import { View, Text, Image, TouchableOpacity, FlatList, ScrollView, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import {collection, getDocs, query} from 'firebase/firestore'
import {db } from '../../config/Firebase'
import BussListCard from '../../components/home/BussListCard'

const MyBusiness = () => {

    const [bussinessList, setbussinessList] = useState([])
    const [loading, setloading] = useState(false)
    useEffect(()=>{
        getData()
            },[])
        
         const getData=async()=>{
            setloading(true)
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
        setloading(false)
            }
            const renderItem=({item})=>{
                return (
                    <View>
                    <BussListCard item={item} />
                    </View>
                )
            }

            if (loading) {
                return (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <ActivityIndicator size={'large'} color='#f79a65' />
                    </View>
                )
            }

  return (
    <FlatList
    ListHeaderComponent={<Text className='font-bold text-2xl px-9  py-2' >My Business</Text>}
      renderItem={renderItem}
      data={bussinessList}
       showsHorizontalScrollIndicator={false} />
)
}

export default MyBusiness