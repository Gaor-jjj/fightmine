import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import buildingIcon from '../assets/icons/building.png';

const BuildingComponent = ({ building, ownedCount = 0, onPurchase }) => {
    const backgroundColor = ownedCount > 0 ? 'bg-green-500' : 'bg-gray-300';

    return (
        <TouchableOpacity
            className={`p-5 mb-3 ${backgroundColor} flex flex-row items-center rounded-xl`}
            onPress={() => {
                console.log('Building clicked:', building);
                onPurchase(building); // Call the onPurchase prop passed from Home
            }}
        >
            <View className="bg-white p-3 mr-4 rounded-lg">
                <Image source={buildingIcon} className="w-8 h-8" />
            </View>
            <View className="flex-1">
                <Text className="text-lg font-pixelifyB text-black">
                    {building?.title || 'No Title'}
                </Text>
                <Text className="text-sm font-pixelify text-gray-600">
                    Price: ${building?.price || 0}
                </Text>
                <Text className="text-sm font-pixelify text-gray-600">Profit: {building?.profit}/s</Text>
            </View>
            <View className="bg-white py-2 px-4 rounded-lg">
                <Text className="text-xl font-pixelify">{ownedCount}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default BuildingComponent;
