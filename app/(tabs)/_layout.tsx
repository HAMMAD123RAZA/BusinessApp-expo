import { Tabs } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/config/Firebase';
import { View, ActivityIndicator } from 'react-native';
import Register from '../auth/Register';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubScribe = onAuthStateChanged(auth, (user) => {
      setUser(user ? user : null);
    });

    return () => unsubScribe();
  }, []);

  if (!user) {
    return <Register />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.triple,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'home' : 'home-outline'}
              size={22}
              color={Colors.primary}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          headerShown: false,
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name="people" size={22} color={Colors.primary} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          headerShown: false,
          title: 'Explore',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name="search" size={22} color={Colors.four} />
          ),
        }}
      />
    </Tabs>
  );
}
