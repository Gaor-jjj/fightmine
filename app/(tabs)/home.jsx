import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import Header from '../../components/Header'; // Import your header component

export default function Home() {
  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1">
        <Header /> 

        <View className="flex-1 justify-center items-center">
          <Text className="text-2xl font-bold text-gray-700">
            Welcome to the Fantasy World!
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
