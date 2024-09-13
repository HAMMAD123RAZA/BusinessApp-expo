import { View, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { FlatList, GestureHandlerRootView } from 'react-native-gesture-handler'
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router'
import { db } from '../../config/Firebase'
import BussDetScreen from '../bussDetScreen/BussDetScreen'

const CatId = () => {
    const [loading, setLoading] = useState(false)
    const [cat, setCat] = useState([])
    
    const { CatId } = useLocalSearchParams()

    const router = useRouter()
    const navigation = useNavigation()

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTitle: CatId,
        });
        getData();
    }, []); 

    const getData = async () => {
        setLoading(true)
        try {
            const q = query(collection(db, 'businessList'), where('title', '==', CatId))
            const qSnapShot = await getDocs(q)
            const data = qSnapShot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            console.log(data)
            setCat(data)
        } 
        catch (error) {
            console.log(error, 'error in cats')
        } finally {
            setLoading(false)
        }
    }

    const renderItem = ({ item }) => {
        return (
            <View>
                <BussDetScreen item={item} />
            </View>
        )
    }

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size={'large'} color='#f79a65' />
            </View>
        )
    }

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <FlatList 
                renderItem={renderItem} 
                data={cat} 
                keyExtractor={(item) => item.id} 
            />
        </GestureHandlerRootView>
    )
}

export default CatId