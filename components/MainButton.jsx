import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const MainButton = ({ title, onPress, gradientFrom = '#C3B091', gradientTo = '#8E7F6B' }) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7} className='w-[90%] my-2 shadow-sm'>
        <LinearGradient
            colors={[gradientFrom, gradientTo]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={{ borderRadius: 10 }}
        >
            <View className="w-full py-4 items-center justify-center">
                <Text className="text-3xl text-gray-200 font-pixelifyM">{title}</Text>
            </View>
        </LinearGradient>
    </TouchableOpacity>
  );
};

export default MainButton;
