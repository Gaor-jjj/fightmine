import React from 'react';
import { View, Image, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const Power = () => {
  return (
    <View
      className="w-full h-1/3 bg-secondary rounded-xl flex-row items-center justify-start p-2"
      style={{ position: 'relative' }} 
    >
      {/* Inner Shadow */}
      <LinearGradient
        colors={['rgba(0, 0, 0, 0.2)', 'rgba(0, 0, 0, 0)']}
        start={[0, 0]}
        end={[0, 1]}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1,
          borderRadius: 10,
        }}
      />

      {/* Power Icon */}
      <Image
        source={require('../assets/images/wand.png')}
        className="w-14 h-8 rounded-xxl"
        resizeMode="contain"
        style={{ zIndex: 0 }} // Ensuring the image is below the shadow
      />
      <Text className="text-white text-lg font-pixelifyB ml-2">100</Text>
    </View>
  );
};

export default Power;
