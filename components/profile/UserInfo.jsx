import { View, Text, Image } from 'react-native'
import React from 'react'

const UserInfo = () => {
  return (
    <View className=' my-10 ml-28    ' >

<Image source={{uri:'https://a0.anyrgb.com/pngimg/1784/296/client-icon-login-avatar-user-light-service-orange-business-icons-circle.png'}}
      style={{borderRadius:112}}
      width={90} height={70} />
      <Text className='font-bold py-2' >Hammad Raza</Text>
      <Text className='py-2' >01hammadraza@gmail.com</Text>
          </View>
  )
}

export default UserInfo