import { View, Text } from 'react-native'
import React from 'react'
import UserInfo from '../../components/profile/UserInfo'
import Menu from '../../components/profile/Menu'

const Profile = () => {
  return (
    <View>
      <Text className='px-3 py-2 text-xl font-bold' >Profile</Text>
      <UserInfo  />
      <Menu/>
    </View>
  )
}

export default Profile