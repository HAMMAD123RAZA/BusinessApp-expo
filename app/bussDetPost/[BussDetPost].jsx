import { View, Text, Image, FlatList, Dimensions, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../config/Firebase'
import Intro from '../../components/detailScr/Intro'
import About from '../../components/detailScr/About'
import Reviews from '../../components/detailScr/Reviews'

const DetailPost = () => {
    const { BussDetPost } = useLocalSearchParams(); 
    console.log('BussDetPost:', BussDetPost); 

    const [businessData, setBusinessData] = useState({});

    const {width}=Dimensions.get('window')

    useEffect(() => {
      if (BussDetPost) {
        getData();
      } else {
        console.log('BussDetPost is undefined');
      }
    }, [BussDetPost]);

    const getData = async () => {
      try {
        const docRef = doc(db, 'businessList', BussDetPost);
        const docSnap = await getDoc(docRef);
    
        if (docSnap.exists()) {
          const data = docSnap.data();
          console.log('Document data:', data);
          setBusinessData(data);
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.log('Error fetching document:', error);
      }
    };

    
    return (
      <ScrollView>
      <View>
          {/* <Text>{BussDetPost}</Text>  */}
          <Intro item={businessData} />
          <About item={businessData} />
          <Reviews item={businessData} />
      </View>
      </ScrollView>
    )
}

export default DetailPost;
