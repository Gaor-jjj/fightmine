import React from 'react';
import { View, Image, Text, ActivityIndicator } from 'react-native';
import { useGold } from '../context/GoldProvider';
import { LinearGradient } from 'expo-linear-gradient';

const Wealth = () => {
  const { gold, isLoading } = useGold();

  return (
    <View
      className="w-full bg-secondary rounded-xl flex-1 flex-row items-center justify-start p-2 mb-2"
      style={{ position: 'relative' }}
    >
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

      <Image
        source={require('../assets/images/gold.png')}
        className="w-14 h-14 rounded-xxl"
        resizeMode="contain"
        style={{ zIndex: 0 }}
      />
      
      <View style={{ marginLeft: 8, zIndex: 2 }}>
        {isLoading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text className="text-white text-lg font-pixelifyB">
            {gold !== null && gold !== undefined ? gold.toString() : '0'}
          </Text>
        )}
      </View>
    </View>
  );
};

export default Wealth;

