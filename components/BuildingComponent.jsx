import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; // Import from expo-linear-gradient
import buildingIcon from '../assets/icons/building.png';

const BuildingComponent = ({ building, ownedCount = 0, onPurchase }) => {
    const gradientColors =
        ownedCount > 0
            ? ['#228B22', '#006400'] // Green gradient
            : ['#AFAFAF', '#6A6A6A']; // Gray gradient

    return (
    <TouchableOpacity
        className="mb-3 w-full"
        onPress={() => {
            console.log('Building clicked:', building);
            onPurchase(building); // Call the onPurchase prop passed from Home
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
                <Image source={buildingIcon} className="w-8 h-8" />
            </View>
            <View className="flex-1">
                <Text className="text-lg font-pixelifyB text-white">
                    {building?.title || 'No Title'}
                </Text>
                <Text className="text-sm font-pixelify text-white">
                    Price: ${building?.price || 0}
                </Text>
                <Text className="text-sm font-pixelify text-white">
                    Profit: {building?.profit}/s
                </Text>
            </View>
            <View className="bg-white py-2 px-4 rounded-lg">
                <Text className="text-xl font-pixelify">{ownedCount}</Text>
            </View>
        </View>
    </LinearGradient>
    </TouchableOpacity>

    );
};

export default BuildingComponent;
