import { View } from 'react-native';
import React from 'react';
import Header from '../../components/home/Header';
import Slider from '../../components/home/Slider';
import Category from '../../components/home/Category';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import BusinessList from '../../components/home/BusinessList'

const Index = () => {
  return (
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
  );
};

export default Index;
