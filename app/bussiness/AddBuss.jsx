import { View, Text, Image, TextInput, TouchableOpacity, ToastAndroid } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import RNPickerSelect from 'react-native-picker-select';
import { db, storage } from '../../config/Firebase';
import { collection, doc, getDocs, query, setDoc } from 'firebase/firestore';
import { Colors } from '../../constants/Colors';
import { getDownloadURL, ref, uploadBytes } from '@firebase/storage';
import {  useRouter } from 'expo-router';

const AddBuss = () => {
    const navigation = useNavigation();
    const [image, setImage] = useState(null);
    const [cat, setCat] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [contact, setContact] = useState('');
    const [about, setAbout] = useState('');
    const router=useRouter()

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTitle: 'Add Business',
        });
        getCat();
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

    const getCat = async () => {
        const q = query(collection(db, 'category'));
        const snapShot = await getDocs(q);
        const data = snapShot.docs.map((doc) => doc.data());

        const formatData = data.map((item) => ({
            label: item.name,
            value: item.name,
        }));
        setCat(formatData);
        console.log(data);
    };

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
            const downLoadUrl = await getDownloadURL(imageRef);
            console.log(downLoadUrl);
            saveBussDetails(downLoadUrl);
            router.push('/bussiness/MyBusiness')

        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    const saveBussDetails = async (imgUrl) => {
        try {
            await setDoc(doc(db, 'businessList', Date.now().toString()), {
                name,
                address,
                about,
                contact,
                title: selectedCategory,
                email,
                img: imgUrl
            });
            ToastAndroid.show('New Business Added', ToastAndroid.LONG);
        } catch (error) {
            console.error('Error saving business details:', error);
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

            <TouchableOpacity onPress={onAddNewBuss}>
                <Text
                    style={{
                        backgroundColor: '#ff9d14',
                        padding: 15,
                        marginHorizontal: 6,
                        borderRadius: 5,
                        alignItems: 'center',
                        marginTop: 9,
                        textAlign: 'center',
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: 18
                    }}
                >
                    Submit
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default AddBuss;
