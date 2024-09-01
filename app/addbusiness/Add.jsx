import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from 'expo-router'
import * as ImagePicker from 'expo-image-picker';
import RNPickerSelect from 'react-native-picker-select';
import {db} from '../../config/Firebase'
import { collection, getDocs, query } from 'firebase/firestore';
import { Colors } from '../../constants/Colors';

const Add = () => {

    const [image, setImage] = useState(null);
    const [cat,setCat]=useState([])
    const [selectedCategory, setSelectedCategory] = useState(''); // State for selected category

    const [name,setname]=useState('')
    const [adress,setadress]=useState('')
    const [email,setEmail]=useState('')
    const [contact,setcontact]=useState('')
    const [about,setabout]=useState('')


    const navigation=useNavigation()
    useEffect(()=>{
        navigation.setOptions({
            headerShow:true,
            headerTitle:'Add Business'
        })
        getCat()
    },[])

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          quality: 1,
        });
    
        console.log(result);
    
        if (!result.canceled) {
          setImage(result.assets[0].uri);
        }
      };

      const getCat=async()=>{
        const q=query(collection(db,'category'))
        const snapShot=await getDocs(q)
        const data = snapShot.docs.map((doc) => doc.data());

        const formatData=data.map((item)=>({
            label:item.name,
            value:item.name,
        }))
        setCat(formatData)
        console.log(data)
      }


  return (
    <View className='px-5 py-2 '>
      <Text className='text-xl font-bold' >Add New Business</Text>
      <Text className='text-gray-400 font-bold py-2'>Fill All The Details </Text>
      <TouchableOpacity onPress={()=>pickImage()} >
   {!image?  <Image width={80} height={70}  source={{uri:'https://i.pinimg.com/736x/d0/18/6b/d0186b1f7911d168d442d1a888ca2bb6.jpg'}} />:<Image source={{uri:image}} width={80} height={70}  /> } 

      </TouchableOpacity>

      {/* //fields */}

    <TextInput onChangeText={(value)=>setname(value)}  placeholder='Name' style={{borderWidth:1,borderColor:'gray',backgroundColor:'#fff', marginTop:9, padding:8, borderRadius:7}} />

    <TextInput onChangeText={(v)=>setadress(v)} placeholder='Address' style={{borderWidth:1,borderColor:'gray',backgroundColor:'#fff', marginTop:9, padding:8, borderRadius:7}} />
    <TextInput onChangeText={(v)=>setcontact(v)} placeholder='Contact' style={{borderWidth:1,borderColor:'gray',backgroundColor:'#fff', marginTop:9, padding:8, borderRadius:7}} />
    <TextInput onChangeText={(v)=>setEmail(v)} placeholder='Email' style={{borderWidth:1,borderColor:'gray',backgroundColor:'#fff', marginTop:9, padding:8, borderRadius:7}} />
    <TextInput onChangeText={(v)=>setabout(v)} placeholder='About' multiline numberOfLines={5} style={{borderWidth:1,
      textAlignVertical:'top',  borderColor:'gray',backgroundColor:'#fff', marginTop:9, padding:8, borderRadius:7}} />

      {/* dropdown */}
      <RNPickerSelect
      onValueChange={(value) => setSelectedCategory(value)}
      items={cat}
    />

    {/* btn */}

    <TouchableOpacity
                onPress={()=>{}}
                style={{
                    backgroundColor: Colors.primary ,
                    padding: 19,
                    marginHorizontal: 6,
                    borderRadius: 5,
                    alignItems: 'center',
                    marginTop:9,
                
                }}
            >
                <Text style={{ color: 'white' ,fontSize:'bold'}}>Submit</Text>
            </TouchableOpacity>


    </View>
  )
}

export default Add