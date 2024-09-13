import { View, Text, FlatList, Image, TouchableOpacity, Share } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import { Colors } from '../../constants/Colors'
import {auth} from 'firebase/auth'

const Menu = () => {
  const router = useRouter()

  const menuList = [
    {
      id: 1,
      name: 'Add Business',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNT0vnAaKYOLSEyBm9nXwSDCLwcLRJi7R9R-hagOBq0lOzQ3ByUjeMIBFnrA&s',
      path: '/bussiness/AddBuss'
    },
    {
      id: 2,
      name: 'My Business',
      img: 'https://cdn4.iconfinder.com/data/icons/flatastic-11-1/256/user-orange-512.png',
      path: '/bussiness/MyBusiness'
    },
    {
      id: 3,
      name: 'Share',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSebhPOdB5_6DUboJ-cgJK-YmFJydgmksudi3c13c2KtELiZw5yvfhlnsiEoQ&s',
      path: 'Share'
    },
    {
      id: 4,
      name: 'Logout',
      img: 'https://www.iconsdb.com/icons/preview/orange/logout-xxl.png',
      path: 'Logout'
    },
  ]

  const onHandleMenu = (item) => {
    if (item.path === 'Share') {
      Share.share({ message: 'Share Wherever you want' })
      return
    }
   
    router.push(item.path)
  }

  const renderItem = ({ item }) => {
    return (
      <View style={{ flexDirection: 'row', flex: 1, marginLeft: 55, paddingVertical: 20, alignItems: 'center' }}>
        <TouchableOpacity onPress={() => onHandleMenu(item)}>
          <Image 
            source={{ uri: item.img }} 
            style={{ width: 50, height: 50, borderRadius: 10 }} 
          />
          <Text style={{ fontWeight: 'bold', marginVertical: 10 }}>{item.name}</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View>
      <FlatList 
        numColumns={2} 
        data={menuList} 
        renderItem={renderItem} 
        keyExtractor={(item) => item.id.toString()}
      />
      <Text style={{ fontSize: 23, paddingLeft: 35, paddingVertical: 20, fontWeight: 'bold' }}>
        Developed By <Text style={{ color: Colors.primary }}>Hammad Raza</Text>
      </Text>
    </View>
  )
}

export default Menu