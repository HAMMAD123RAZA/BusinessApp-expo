import { View, Text, Image } from 'react-native'
import React from 'react'

const UserInfo = () => {
  return (
    <View style={{ marginVertical: 20, alignItems: 'center' }}>
      <Image 
        source={{ uri: 'https://a0.anyrgb.com/pngimg/1784/296/client-icon-login-avatar-user-light-service-orange-business-icons-circle.png' }}
        style={{ width: 90, height: 70, borderRadius: 35 }}
      />
      <Text style={{ fontWeight: 'bold', paddingVertical: 10 }}>Hammad Raza</Text>
      <Text style={{ paddingVertical: 5 }}>01hammadraza@gmail.com</Text>
    </View>
  )
}

export default UserInfo
