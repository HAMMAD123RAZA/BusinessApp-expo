import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import {collection, getDocs, query, where} from 'firebase/firestore'
// import { db } from '../../config/Firebase'
import { FlatList, GestureHandlerRootView } from 'react-native-gesture-handler'
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router'
import {db} from '../../config/Firebase'
import BussDetScreen from '../bussDetScreen/BussDetScreen'

const CatId = () => {

    const [cat, setcat] = useState([])
    
    const {CatId}=useLocalSearchParams()

    const router=useRouter()
    const navigation=useNavigation()
    useEffect(() => {
      navigation.setOptions({
          headerShown: true,
          headerTitle: CatId,
      });
      getData();
  }, []); 

 const getData=async()=>{
try {
    const q=query(collection(db,'businessList'),where('title','==',CatId))
    const qSnapShot=await getDocs(q)
    const data = qSnapShot.docs.map((doc) =>({id:doc.id, ...doc.data()}));
    console.log(data)
    setcat(data)
} 
catch (error) {
    console.log(error,'error in cats')
}
    }

    const renderItem=({item})=>{
      return (
        <View>
          <BussDetScreen item={item} />
        </View>
      )
    }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
<FlatList renderItem={renderItem} 
data={cat} />
    </GestureHandlerRootView>
  )
}

export default CatId