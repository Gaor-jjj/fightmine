// app/(tabs)/_layout.jsx
import React, { useState } from 'react';
import { View, Pressable, Image, Text } from 'react-native';
import { useRouter } from 'expo-router';

export default function CustomTabLayout() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('Home');

  const tabs = [
    { name: 'Home', icon: require('../../assets/icons/home.png'), screen: 'home' },
    { name: 'Achievements', icon: require('../../assets/icons/achievements.png'), screen: 'achievements' },
    { name: 'Fight', icon: require('../../assets/icons/fight.png'), screen: 'fight' },
  ];

  const handleTabPress = (tab) => {
    setActiveTab(tab.name);
    router.push(tab.screen);
  };

  return (
    <View className="flex-1">
      {/* Content area */}
      <View className="flex-1">
        {/* Add your content here or use children prop if wrapping other components */}
      </View>

      {/* Custom Tab Bar */}
      <View className="flex-row justify-around bg-gray-900 p-4">
        {tabs.map((tab) => (
          <Pressable
            key={tab.name}
            onPress={() => handleTabPress(tab)}
            className={`flex items-center ${activeTab === tab.name ? 'text-blue-500' : 'text-gray-400'}`}
          >
            <Image source={tab.icon} className="w-6 h-6" />
            <Text className="mt-1 text-xs">{tab.name}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}
