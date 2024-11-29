import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, ImageBackground, TouchableOpacity, Image } from 'react-native';
import Header from '../../components/Header'; // Import your custom Header component
import BuildingComponent from '../../components/BuildingComponent'; // Import the BuildingComponent
import Wealth from '../../components/Wealth'; // Import the Wealth component

export default function Home() {
  // Initialize coin count to 100
  const [coinCount, setCoinCount] = useState(100);

  // Building data (you can also use the imported JSON for this)
  const buildings = [
    { id: 1, ownedCount: 5, profit: 2 },
    { id: 2, ownedCount: 0, profit: 3 },
    { id: 3, ownedCount: 3, profit: 1 },
  ];

  // Calculate total profit from all owned buildings
  const totalProfit = buildings.reduce((total, building) => total + (building.ownedCount * building.profit), 0);

  // Function to increment coin count based on profit every second
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCoinCount(prevCoinCount => prevCoinCount + totalProfit);
    }, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, [totalProfit]);

  // Function to increment coin count when the coin image is pressed
  const handleCoinPress = () => {
    setCoinCount(coinCount + 1);
  };

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1">
        {/* Pass the coinCount state to Header */}
        <Header coinCount={coinCount} />

        {/* Container for the background image */}
        <View className="h-1/4">
          <ImageBackground
            source={require('../../assets/images/minebg.png')}
            resizeMode="cover"
            className="flex-1 justify-center items-center"
          >
            {/* Coin image in the center with TouchableOpacity */}
            <TouchableOpacity onPress={handleCoinPress}>
              <Image source={require('../../assets/images/coin.png')} className="w-24 h-24" />
            </TouchableOpacity>
          </ImageBackground>
        </View>

        {/* Rest of the content */}
        <View className="flex-1 justify-center items-center p-4">
          {/* Replace the welcome text with the BuildingComponent */}
          <BuildingComponent id={1} ownedCount={5} />
          <BuildingComponent id={2} ownedCount={0} />
          <BuildingComponent id={3} ownedCount={3} />
        </View>
      </View>
    </SafeAreaView>
  );
}
