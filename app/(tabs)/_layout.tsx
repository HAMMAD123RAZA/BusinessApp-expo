import { Tabs } from 'expo-router';
import React from 'react';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'blue',
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{

          headerShown:false,
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'home' : 'home-outline'} size={22} color={ color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
        headerShown:false,
          title: 'Explore',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'code-slash' : 'code-slash-outline'} size={22} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
