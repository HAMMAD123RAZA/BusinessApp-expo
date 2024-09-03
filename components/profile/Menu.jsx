import { View, Text, FlatList, Image, TouchableOpacity, Share } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import {Colors} from '../../constants/Colors'

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
            path:'/bussiness/MyBusiness'
        },{
            id:3,
            name:'Share',
            img:'data:image/jpeg;base64,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',
            path:'Share'
        },{
            id:4,
            name:'Logout',
            img:'https://www.iconsdb.com/icons/preview/orange/logout-xxl.png',
            path:''
        },
    ]

const onhandleMenu =(item)=>{
    if(item.path=='Share'){
         Share.share({message:'Share Wherever you want '})
         return 
    }
    router.push(item.path)

}
    
    const renderItem=({item})=>{
        return (
            <View className='flex-row gap-7 flex-1 mx-3 py-2 items-center' >
                <View className='' >

                <TouchableOpacity onPress={()=>onhandleMenu(item)} >
                <Image source={{uri:item.img}} width={50} height={30} style={{borderRadius:10}} />
            <Text className='font-bold my-2 text-xl' >{item.name}</Text>
                </TouchableOpacity>
            </View>
            </View>
        )
    }

  return (
    <View>
        <FlatList numColumns={2} data={menuList} renderItem={renderItem}   />
        <Text className='text-xl text-center py-16 font-bold' >Developed By <Text style={{color:Colors.primary}} >Hammad Raza</Text> </Text>
    </View>
  )
}

export default Menu