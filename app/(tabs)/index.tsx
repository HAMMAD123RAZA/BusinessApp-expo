import { View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Header from '../../components/home/Header';
import Slider from '../../components/home/Slider';
import Category from '../../components/home/Category';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import BusinessList from '../../components/home/BusinessList'
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/config/Firebase';
import Login from '../auth/Login'
import Register from '../auth/Register'

const Index = () => {

    const [user, setuser] = useState(null)

  useEffect(()=>{
const unsubScribe=onAuthStateChanged(auth,(user)=>{
  if (user) {
    setuser(user)
  }
  else{
    setuser(null)
  }
  return ()=>unsubScribe()
})

  },[])

  return user?  (
    <GestureHandlerRootView style={{ flex: 1 }}>
            <ScrollView showsVerticalScrollIndicator={false} >
      <View>
        <Header />
        <Slider />
        <Category />
        <BusinessList/>
      </View>
      </ScrollView>
    </GestureHandlerRootView>

  ):(
    <Register/>
  )
};

export default Index;