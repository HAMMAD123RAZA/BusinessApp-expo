import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'

const Menu = () => {
    const router=useRouter()

    const menuList=[
        {
            id:1,
            name:'Add Business',
            img:'https://cdn-icons-png.flaticon.com/512/1933/1933920.png',
            path:'/bussiness/AddBuss'
        },
        {
            id:2,
            name:'My Business',
            img:'https://img.freepik.com/premium-vector/business-hierarchy-leader-icon-orange-color-vector-eps_996135-39113.jpg?w=740',
            path:''
        },{
            id:3,
            name:'Share-',
            img:'https://www.iconsdb.com/icons/preview/orange/sharethis-xxl.png',
            path:''
        },{
            id:4,
            name:'Logout',
            img:'https://www.iconsdb.com/icons/preview/orange/logout-xxl.png',
            path:''
        },
    ]

const onhandleMenu =(item)=>{
    router.push(item.path)
}
    
    const renderItem=({item})=>{
        return (
            <View className='flex-row gap-7 flex-1 mx-3 py-2 items-center' >
                <TouchableOpacity onPress={()=>onhandleMenu(item)} >
                <Image source={{uri:item.img}} width={50} height={30} style={{borderRadius:10}} />
            <Text className='font-bold my-2 text-xl' >{item.name}</Text>

                </TouchableOpacity>
            </View>
        )
    }

  return (
    <View>
        <FlatList numColumns={2} data={menuList} renderItem={renderItem}   />
        <Text className='text-xl text-center py-5 font-bold' >Developed By Hammad Raza</Text>
    </View>
  )
}

export default Menu