import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { icons } from '../constants';

const AchievementComponent = ({ title, points, description, isCompleted }) => {
    return (
        <TouchableOpacity
            className="mb-3 w-full"
            onPress={() => console.log(`${title} achievement pressed!`)}
        >
            <LinearGradient
                colors={isCompleted ? ['#8A2BE2', '#4B0082'] : ['#AFAFAF', '#6A6A6A']} // Purple if completed, gray if not
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={{ borderRadius: 10 }}
            >
                <View className="p-4 flex flex-row items-center">
                    <View className="bg-white p-3 mr-4 rounded-lg">
                        <Image source={icons.achievementicon} className="w-8 h-8" resizeMode='contain'/>
                    </View>
                    <View className="flex-1">
                        <Text className="text-lg font-pixelifyB text-white">{title}</Text>
                        <Text className="text-sm font-pixelify text-white">{description}</Text>
                        <Text className="text-sm"></Text>
                    </View>
                    <View className="bg-white py-2 px-4 min-w-14 rounded-lg">
                        <Text className="text-xl text-center font-pixelify">{points}</Text>
                    </View>
                </View>
            </LinearGradient>
        </TouchableOpacity>
    );
};

export default AchievementComponent;
