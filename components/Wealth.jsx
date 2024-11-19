import React from 'react';
import { View, Image, Text } from 'react-native';

const Wealth = () => {
  return (
    <View className="w-40 h-20 bg-brown-700 rounded-xl flex flex-row items-center justify-start p-2">
      <Image
        source={require('../assets/images/gold.png')}
        className="w-14 h-14 rounded-xxl"
      />
      <Text className="text-white text-lg font-bold ml-2">100</Text> 
    </View>
  );
};

export default Wealth;
