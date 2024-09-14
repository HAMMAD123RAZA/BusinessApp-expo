import { View, Text, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import {auth} from '../../config/Firebase'

const UserInfo = () => {

  const [Name, setName] = useState()
  const [Email, setEmail] = useState()

  useEffect(()=>{
    const user=auth.currentUser;

    if (user) {
      setEmail(user.email || 'GamingTirtle@gmail.com')
      setName(user.displayName || 'MobileUser')
    }
  },[])

  return (
    <View style={{ marginVertical: 20, alignItems: 'center' }}>
      <Image 
        source={{ uri: 'https://a0.anyrgb.com/pngimg/1784/296/client-icon-login-avatar-user-light-service-orange-business-icons-circle.png' }}
        style={{ width: 90, height: 70, borderRadius: 35 }}
      />
      <Text style={{ fontWeight: 'bold', paddingVertical: 10 }}>{Name}</Text>
      <Text style={{ paddingVertical: 5 }}>{Email}</Text>
    </View>
  )
}

export default UserInfo

