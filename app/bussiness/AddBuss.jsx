import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker'; // Correct import for ImagePicker
import RNPickerSelect from 'react-native-picker-select'; // Correct import for RNPickerSelect
import {db, storage} from '../../config/Firebase'
import { collection, getDocs, query } from 'firebase/firestore';
import { Colors } from '../../constants/Colors';
import {  ref, uploadBytes } from '@firebase/storage';


const AddBuss = () => {
  const navigation = useNavigation();
    const [image, setImage] = useState(null);
    const [cat,setCat]=useState([])
    const [selectedCategory, setSelectedCategory] = useState(''); 

    const [name,setName]=useState('')
    const [address,setAddress]=useState('')
    const [email,setEmail]=useState('')
    const [contact,setContact]=useState('')
    const [about,setAbout]=useState('')

  useEffect(() => {
    navigation.setOptions({
      headerShown: true, // Correct property name is `headerShown`
      headerTitle: 'Add Business',
    });
    getCat()
  }, [navigation]);

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error picking image:', error);
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

      const onAddNewBuss = async () => {
        if (!image) {
            console.error('No image selected');
            return;
        }
    
        try {
            const response = await fetch(image);
            const blob = await response.blob();
            const fileName = Date.now().toString() + '.jpg';
            const imageRef = ref(storage, 'business/' + fileName);
    
            await uploadBytes(imageRef, blob);
            console.log('File uploaded successfully');
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };
        

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Add New Business</Text>
      <Text style={{ color: 'gray', fontWeight: 'bold', marginVertical: 10 }}>Fill All The Details</Text>
      
      <TouchableOpacity onPress={pickImage}>
        {!image ? (
          <Image
            source={{ uri: 'https://i.pinimg.com/736x/d0/18/6b/d0186b1f7911d168d442d1a888ca2bb6.jpg' }}
            style={{ width: 80, height: 70 }}
          />
        ) : (
          <Image source={{ uri: image }} style={{ width: 80, height: 70 }} />
        )}
      </TouchableOpacity>

      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Name"
        style={{ borderWidth: 1, borderColor: 'gray', backgroundColor: '#fff', marginTop: 9, padding: 8, borderRadius: 7 }}
      />

      <TextInput
        value={address}
        onChangeText={setAddress}
        placeholder="Address"
        style={{ borderWidth: 1, borderColor: 'gray', backgroundColor: '#fff', marginTop: 9, padding: 8, borderRadius: 7 }}
      />

      <TextInput
        value={contact}
        onChangeText={setContact}
        placeholder="Contact"
        style={{ borderWidth: 1, borderColor: 'gray', backgroundColor: '#fff', marginTop: 9, padding: 8, borderRadius: 7 }}
      />

      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        style={{ borderWidth: 1, borderColor: 'gray', backgroundColor: '#fff', marginTop: 9, padding: 8, borderRadius: 7 }}
      />

      <TextInput
        value={about}
        onChangeText={setAbout}
        placeholder="About"
        multiline
        numberOfLines={5}
        style={{ borderWidth: 1, borderColor: 'gray', backgroundColor: '#fff', marginTop: 9, padding: 8, borderRadius: 7, textAlignVertical: 'top' }}
      />

<RNPickerSelect
     onValueChange={(value) => setSelectedCategory(value)}
     items={cat}
   />

     {/* btn */}

    <TouchableOpacity
                onPress={()=>{onAddNewBuss()}}
            >
                <Text            
                     style={{
                    backgroundColor: '#ff9d14' ,
                    padding: 15,
                    marginHorizontal: 6,
                    borderRadius: 5,
                    alignItems: 'center',
                    marginTop:9,
                }}
                className='font-bold text-center text-white text-xl'
>Submit</Text>
            </TouchableOpacity>

    </View>
  );
};

export default AddBuss;


// import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native'
// import React, { useEffect, useState } from 'react'
// import { useNavigation } from 'expo-router'
// import * as ImagePicker from 'expo-image-picker';
// import RNPickerSelect from 'react-native-picker-select';
// import {db, storage} from '../../config/Firebase'
// import { collection, getDocs, query } from 'firebase/firestore';
// import { Colors } from '../../constants/Colors';
// import {  ref, uploadBytes } from '@firebase/storage';

// const AddBuss = () => {

//     const [image, setImage] = useState(null);
//     const [cat,setCat]=useState([])
//     const [selectedCategory, setSelectedCategory] = useState(''); 

//     const [name,setname]=useState('')
//     const [adress,setadress]=useState('')
//     const [email,setEmail]=useState('')
//     const [contact,setcontact]=useState('')
//     const [about,setabout]=useState('')

//     const navigation=useNavigation()
//     useEffect(()=>{
//         navigation.setOptions({
//             headerShow:true,
//             headerTitle:'Add Business'
//         })
//         getCat()
//     },[])
    
//     const pickImage = async () => {
//       try {
//           let result = await ImagePicker.launchImageLibraryAsync({
//               mediaTypes: ImagePicker.MediaTypeOptions.Images,
//               allowsEditing: true,
//               quality: 1,
//           });
  
//           if (!result.canceled) {
//               setImage(result.assets[0].uri);
//           }
//       } catch (error) {
//           console.error('Error picking image:', error);
//       }
//   };
  
//       const getCat=async()=>{
//         const q=query(collection(db,'category'))
//         const snapShot=await getDocs(q)
//         const data = snapShot.docs.map((doc) => doc.data());

//         const formatData=data.map((item)=>({
//             label:item.name,
//             value:item.name,
//         }))
//         setCat(formatData)
//         console.log(data)
//       }

//       const onAddNewBuss = async () => {
//         if (!image) {
//             console.error('No image selected');
//             return;
//         }
    
//         try {
//             const response = await fetch(image);
//             const blob = await response.blob();
//             const fileName = Date.now().toString() + '.jpg';
//             const imageRef = ref(storage, 'business/' + fileName);
    
//             await uploadBytes(imageRef, blob);
//             console.log('File uploaded successfully');
//         } catch (error) {
//             console.error('Error uploading file:', error);
//         }
//     };
        

//   return (
//     <View className='px-5 py-2 '>
//       <Text className='text-xl font-bold' >Add New Business</Text>
//       <Text className='text-gray-400 font-bold py-2'>Fill All The Details </Text>
//       <TouchableOpacity onPress={()=>pickImage()} >
//    {!image?  <Image width={80} height={70}  source={{uri:'https://i.pinimg.com/736x/d0/18/6b/d0186b1f7911d168d442d1a888ca2bb6.jpg'}} />:<Image source={{uri:image}} width={80} height={70}  /> } 

//       </TouchableOpacity>

//       {/* //fields */}

//     <TextInput onChangeText={(value)=>setname(value)}  placeholder='Name' style={{borderWidth:1,borderColor:'gray',backgroundColor:'#fff', marginTop:9, padding:8, borderRadius:7}} />

//     <TextInput onChangeText={(v)=>setadress(v)} placeholder='Address' style={{borderWidth:1,borderColor:'gray',backgroundColor:'#fff', marginTop:9, padding:8, borderRadius:7}} />
//     <TextInput onChangeText={(v)=>setcontact(v)} placeholder='Contact' style={{borderWidth:1,borderColor:'gray',backgroundColor:'#fff', marginTop:9, padding:8, borderRadius:7}} />
//     <TextInput onChangeText={(v)=>setEmail(v)} placeholder='Email' style={{borderWidth:1,borderColor:'gray',backgroundColor:'#fff', marginTop:9, padding:8, borderRadius:7}} />
//     <TextInput onChangeText={(v)=>setabout(v)} placeholder='About' multiline numberOfLines={5} style={{borderWidth:1,
//       textAlignVertical:'top',  borderColor:'gray',backgroundColor:'#fff', marginTop:9, padding:8, borderRadius:7}} />

//       {/* dropdown */}
//       <RNPickerSelect
//       onValueChange={(value) => setSelectedCategory(value)}
//       items={cat}
//     />

//     {/* btn */}

//     <TouchableOpacity
//                 onPress={()=>onAddNewBuss()}
//                 style={{
//                     backgroundColor: Colors.primary ,
//                     padding: 19,
//                     marginHorizontal: 6,
//                     borderRadius: 5,
//                     alignItems: 'center',
//                     marginTop:9,
                
//                 }}
//             >
//                 <Text style={{ color: 'white' ,fontSize:'bold'}}>Submit</Text>
//             </TouchableOpacity>
//     </View>
//   )
// }

// export default AddBuss





// import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native'
// import React, { useEffect, useState } from 'react'
// import { useNavigation } from 'expo-router'
// import * as ImagePicker from 'expo-image-picker';
// import RNPickerSelect from 'react-native-picker-select';
// import {db, storage} from '../../config/Firebase'
// import { collection, getDocs, query } from 'firebase/firestore';
// import { Colors } from '../../constants/Colors';
// import {  ref, uploadBytes } from '@firebase/storage';

// const AddBuss = () => {
//     const [image, setImage] = useState(null);
//     const [cat,setCat]=useState([])
//     const [selectedCategory, setSelectedCategory] = useState(''); 

//     const [name,setname]=useState('')
//     const [adress,setadress]=useState('')
//     const [email,setEmail]=useState('')
//     const [contact,setcontact]=useState('')
//     const [about,setabout]=useState('')

//     const navigation=useNavigation()
//     useEffect(()=>{
//         navigation.setOptions({
//             headerShow:true,
//             headerTitle:'Add Business'
//         })
//         getCat()
//     },[])
    
//     const pickImage = async () => {
//       try {
//           let result = await ImagePicker.launchImageLibraryAsync({
//               mediaTypes: ImagePicker.MediaTypeOptions.Images,
//               allowsEditing: true,
//               quality: 1,
//           });
  
//           if (!result.canceled) {
//               setImage(result.assets[0].uri);
//           }
//       } catch (error) {
//           console.error('Error picking image:', error);
//       }
//   };
  
//       const getCat=async()=>{
//         const q=query(collection(db,'category'))
//         const snapShot=await getDocs(q)
//         const data = snapShot.docs.map((doc) => doc.data());

//         const formatData=data.map((item)=>({
//             label:item.name,
//             value:item.name,
//         }))
//         setCat(formatData)
//         console.log(data)
//       }

//       const onAddNewBuss = async () => {
//         if (!image) {
//             console.error('No image selected');
//             return;
//         }
    
//         try {
//             const response = await fetch(image);
//             const blob = await response.blob();
//             const fileName = Date.now().toString() + '.jpg';
//             const imageRef = ref(storage, 'business/' + fileName);
    
//             await uploadBytes(imageRef, blob);
//             console.log('File uploaded successfully');
//         } catch (error) {
//             console.error('Error uploading file:', error);
//         }
//     };
        

//   return (
//     <View className='px-5 py-2 '>
//       <Text className='text-xl font-bold' >Add New Business</Text>
//       <Text className='text-gray-400 font-bold py-2'>Fill All The Details </Text>
//       <TouchableOpacity onPress={()=>pickImage()} >
//    {!image?  <Image width={80} height={70}  source={{uri:'https://i.pinimg.com/736x/d0/18/6b/d0186b1f7911d168d442d1a888ca2bb6.jpg'}} />:<Image source={{uri:image}} width={80} height={70}  /> } 

//       </TouchableOpacity>

//       {/* //fields */}

//     <TextInput onChangeText={(value)=>setname(value)}  placeholder='Name' style={{borderWidth:1,borderColor:'gray',backgroundColor:'#fff', marginTop:9, padding:8, borderRadius:7}} />

//     <TextInput onChangeText={(v)=>setadress(v)} placeholder='Address' style={{borderWidth:1,borderColor:'gray',backgroundColor:'#fff', marginTop:9, padding:8, borderRadius:7}} />
//     <TextInput onChangeText={(v)=>setcontact(v)} placeholder='Contact' style={{borderWidth:1,borderColor:'gray',backgroundColor:'#fff', marginTop:9, padding:8, borderRadius:7}} />
//     <TextInput onChangeText={(v)=>setEmail(v)} placeholder='Email' style={{borderWidth:1,borderColor:'gray',backgroundColor:'#fff', marginTop:9, padding:8, borderRadius:7}} />
//     <TextInput onChangeText={(v)=>setabout(v)} placeholder='About' multiline numberOfLines={5} style={{borderWidth:1,
//       textAlignVertical:'top',  borderColor:'gray',backgroundColor:'#fff', marginTop:9, padding:8, borderRadius:7}} />

//       {/* dropdown */}
//       <RNPickerSelect
//       onValueChange={(value) => setSelectedCategory(value)}
//       items={cat}
//     />

//     {/* btn */}

//     <TouchableOpacity
//                 onPress={()=>onAddNewBuss()}
//                 style={{
//                     backgroundColor: Colors.primary ,
//                     padding: 19,
//                     marginHorizontal: 6,
//                     borderRadius: 5,
//                     alignItems: 'center',
//                     marginTop:9,
                
//                 }}
//             >
//                 <Text style={{ color: 'white' ,fontSize:'bold'}}>Submit</Text>
//             </TouchableOpacity>
//     </View>
//   )
// }

