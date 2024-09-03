import { View, Text, Image, TextInput } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'

const Header = () => {
  return (
    <View className='bg-orange-400   py-10' style={{borderBottomRightRadius:27,borderBottomLeftRadius:27}} >
      <View className='flex-row gap-3' >

      <Image source={{uri:'https://a0.anyrgb.com/pngimg/1784/296/client-icon-login-avatar-user-light-service-orange-business-icons-circle.png'}}
      style={{borderRadius:112}}
      width={50} height={40} />
      <View>
        <Text className='font-bold text-white text-xl' >Welcome</Text>
        <Text className='font-bold text-white text-xl'  >Bussiness Family</Text>
      </View>
      </View>

      {/* searchField */}
{/* searchField */}
<View className="bg-gray-200 px-5 mx-5 mt-8 pt-1 rounded-md flex-row items-center">
  <Ionicons name="search" size={22} color="black" />
  <TextInput
    placeholder="Search..."
    placeholderTextColor="gray"
    className="flex-1 py-3 ml-2 text-black"
  />
</View>
    </View>
  )
}

export default Header