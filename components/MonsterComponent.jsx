import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import skullIcon from "../assets/images/skull.png"; // Skull icon
import activeMonsterIcon from "../assets/images/activeMonster.png"; // Crossed swords icon indicating the active monster

const MonsterComponent = ({ monster, activeMonster, onFight }) => {
  const gradientColors = monster?.active
    ? ['#FF4500', '#FF6347'] // Bright red gradient for active monsters
    : ['#DC143C', '#8B0000']; // Crimson red gradient for inactive monsters

  const backgroundColor = monster?.active ? '#FF4500' : '#DC143C'; // Bright red for active, crimson red for others

  return (
    <TouchableOpacity
      className="mb-3 w-full"
      onPress={() => {
        console.log('Monster clicked:', monster);
        onFight(monster); // Call the onFight prop passed from Fight
      }}
      style={{ backgroundColor, borderRadius: 10 }} // Fallback color for solid background
    >
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={{ borderRadius: 10 }} // Gradient with rounded corners
      >
        <View className="p-4 flex flex-row items-center">
          {/* Skull Icon on the Left */}
          <View className="bg-white p-3 mr-4 rounded-lg">
            <Image source={skullIcon} className="w-8 h-8" />
          </View>

          {/* Monster Data in the Center */}
          <View className="flex-1">
            <Text className="text-lg font-pixelifyB text-white">
              Name: {monster?.name || 'Unknown'}
            </Text>
            <Text className="text-sm font-pixelify text-white">
              HP: {monster?.hp || '0'} {/* Fix HP */}
            </Text>
            <Text className="text-sm font-pixelify text-white">
              Gold: {monster?.gold || '0'} {/* Fix Gold */}
            </Text>
          </View>

          {/* Active Monster Indicator (Crossed Swords Icon on the Right) */}
          {activeMonster === monster?.id && ( // Check if this monster is the active one
            <View>
              <Image
                source={activeMonsterIcon} // Crossed swords image for the active monster
                className="w-10 h-10"
                resizeMode="contain"
              />
            </View>
          )}
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default MonsterComponent;
