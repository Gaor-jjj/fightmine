import React from 'react';
import { View, Image, Text } from 'react-native';

const Power = () => {
  return (
    <View
      className="w-40 h-14 bg-brown-700 rounded-xl flex flex-row items-center justify-start p-2" 
    >
      <Image
        source={require('../assets/images/wand.png')}
        className="w-10 h-10 rounded-xxl"
      />
      <Text className="text-white text-lg font-bold ml-2">75</Text> 
    </View>
  );
};

export default Power;
