import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { icons } from '../constants';

const ShopComponent = () => {
    gradientColors = ['#EFA00B', '#B87E11']

    return (
    <TouchableOpacity
        className="mb-3 w-full"
        onPress={() => {
            console.log('Shop item pressed')
        }}
    >
    <LinearGradient
        colors={gradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={{ borderRadius: 10 }}
    >
        <View className="p-4 flex flex-row items-center">
            <View className="bg-white p-3 mr-4 rounded-lg">
                <Image source={icons.shopicon} className="w-8 h-8" resizeMode='contain'/>
            </View>
            <View className="flex-1">
                <Text className="text-lg font-pixelifyB text-white">
                    Shop Item Name
                </Text>
                <Text className="text-sm font-pixelify text-white">
                    Item description
                </Text>
                <Text>

                </Text>
            </View>
            <View className="py-2 px-4 min-w-14 rounded-lg">
                <Text className="text-xl text-center text-white font-pixelify">100$</Text>
            </View>
        </View>
    </LinearGradient>
    </TouchableOpacity>
    );
};

export default ShopComponent;