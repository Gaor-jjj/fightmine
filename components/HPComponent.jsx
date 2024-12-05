import React from 'react';
import { View, Text } from 'react-native';

const HPComponent = ({ currentHP, monsterHP }) => {
  if (currentHP === undefined || monsterHP === undefined) {
    console.error("HPComponent: Missing props for currentHP or monsterHP", { currentHP, monsterHP });
  }
  console.log("currentHP:", currentHP, "monsterHP:", monsterHP);

  const hpPercentage = (currentHP / monsterHP) * 100;

  return (
    <View className="w-4/5 mt-4">
      <View className="h-6 w-full bg-gray-300 rounded-lg overflow-hidden relative">
        <View
          className="bg-green-500 h-full"
          style={{ width: `${hpPercentage}%` }}
        />
        <Text
          className="absolute w-full text-center font-bold text-black text-xs"
          style={{ top: '50%', transform: [{ translateY: -7 }] }}
        >
          {`${currentHP} / ${monsterHP}`}
        </Text>
      </View>
    </View>
  );
};

export default HPComponent;
