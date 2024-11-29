import React, { useState, useEffect } from 'react';
import { View, Text, Image } from 'react-native';

// Adjust the import path to point to the correct folder location for building icon
import buildingIcon from '../assets/icons/building.png';

// Adjust the import path for buildings.json
import buildingsData from '../data/buildings.json';

const BuildingComponent = ({ id, ownedCount = 0 }) => {
  const [building, setBuilding] = useState(null);

  useEffect(() => {
    // Fetch building data from the JSON file based on the id prop
    const buildingData = buildingsData.find((building) => building.id === id);
    setBuilding(buildingData);
  }, [id]);

  if (!building) {
    return null; // If data is still loading, you can return null or a loader.
  }

  // Determine the background color based on whether the user owns any of this building
  const backgroundColor = ownedCount > 0 ? 'bg-green-500' : 'bg-gray-300';

  return (
    <View className={`flex flex-row items-center ${backgroundColor} rounded-lg p-3 mb-4`}>
      {/* Left side with building icon */}
      <View className="bg-white rounded-lg p-3 mr-4">
        <Image source={buildingIcon} className="w-8 h-8" />
      </View>

      {/* Middle content with title, price, and profit */}
      <View className="flex-1">
        <Text className="text-lg font-semibold">{building.title}</Text>
        <Text className="text-sm text-gray-600">Price: ${building.price}</Text>
        <Text className="text-sm text-gray-600">Profit: ${building.profit}/min</Text>
      </View>

      {/* Right side with the number of buildings owned */}
      <View className="bg-white rounded-lg p-2">
        <Text className="text-xl font-bold">{ownedCount}</Text>
      </View>
    </View>
  );
};

export default BuildingComponent;
