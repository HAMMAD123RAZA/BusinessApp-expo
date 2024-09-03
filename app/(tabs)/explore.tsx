import { View, Text, TextInput, ScrollView } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import Category from '@/components/home/Category'
import ExploreBusList from '../../components/explore/ExploreBusList'

const explore = () => {
  return (
    <View className='mt-12' >
      <ScrollView>

      <Text className='ml-7 my-2 font-bold text-2xl ' style={{color:Colors.primary}} >Explore</Text>
      <View className='flex-row gap-3 m-4'  style={{borderWidth:2,padding:9 , borderRadius:8, borderColor:Colors.primary}}  >
        <Ionicons name='search' size={20} color={Colors.primary} />
      <TextInput placeholder='Search...'  />
      </View>
      {/* category */}
      <Category/>

      {/* list */}
      <ExploreBusList/>
      </ScrollView>

    </View>
  )
}

export default explore