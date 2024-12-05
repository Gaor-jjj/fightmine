import React from 'react';
import { View, Text } from 'react-native';

const HPComponent = ({ currentHP }) => {
  const maxHP = 500; // Maximum HP for the dragon
  const hpPercentage = (currentHP / maxHP) * 100;

  return (
    <View className="w-4/5 mt-4">
      <View className="h-6 w-full bg-gray-300 rounded-full overflow-hidden">
        <View
          className="h-full bg-green-500"
          style={{ width: `${hpPercentage}%` }} // Dynamically adjust width based on HP
        />
      </View>
      <Text className="text-center font-bold text-white mt-1">{`HP: ${currentHP} / ${maxHP}`}</Text>
    </View>
  );
};

export default HPComponent;
