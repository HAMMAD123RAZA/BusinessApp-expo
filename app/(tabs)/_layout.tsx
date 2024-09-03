import { Tabs } from 'expo-router';
import React from 'react';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.triple,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{

          headerShown:false,
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'home' : 'home-outline'} size={22} color={ Colors.primary} />
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
        headerShown:false,
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name='people' size={22} color={Colors.primary} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
        headerShown:false,
          title: 'Explore',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'code-slash' : 'code-slash-outline'} size={22} color={Colors.four} />
          ),
        }}
      />
    </Tabs>
  );
}
