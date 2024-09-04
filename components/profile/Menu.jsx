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
            img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNT0vnAaKYOLSEyBm9nXwSDCLwcLRJi7R9R-hagOBq0lOzQ3ByUjeMIBFnrA&s',
            path:'/bussiness/AddBuss'
        },
        {
            id:2,
            name:'My Business',
            img:'https://cdn4.iconfinder.com/data/icons/flatastic-11-1/256/user-orange-512.png',
            path:'/bussiness/MyBusiness'
        },{
            id:3,
            name:'Share',
            img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSebhPOdB5_6DUboJ-cgJK-YmFJydgmksudi3c13c2KtELiZw5yvfhlnsiEoQ&s',
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
                <Image source={{uri:item.img}} width={50} height={50} style={{borderRadius:10}} />
            <Text className='font-bold my-4 text' >{item.name}</Text>
                </TouchableOpacity>
            </View>
            </View>
        )
    }

  return (
    <View>
        <FlatList numColumns={2} data={menuList} renderItem={renderItem}   />
        <Text className='text-2xl pl-8 py-10 font-bold' >Developed By <Text style={{color:Colors.primary}} >Hammad Raza</Text> </Text>
    </View>
  )
}

export default Menu