import React, { useEffect, useState } from 'react';
import { View, Image, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { getCurrentUser, subscribeToPowerUpdates } from '../lib/appwrite'; // Adjust the path based on your project structure

const Power = () => {
  const [power, setPower] = useState(null);

  useEffect(() => {
    const fetchPower = async () => {
      try {
        // Get current user details
        const user = await getCurrentUser();
        if (user && user.power !== undefined) {
          setPower(user.power);

          // Subscribe to power updates
          const unsubscribe = subscribeToPowerUpdates(user.$id, (updatedPower) => {
            setPower(updatedPower);
          });

          return () => unsubscribe();
        }
      } catch (error) {
        console.error('Error fetching user power:', error);
      }
    };

    fetchPower();
  }, []);

  return (
    <View
      className="w-full h-1/3 bg-secondary rounded-xl flex-row items-center justify-start p-2"
      style={{ position: 'relative' }} 
    >
      {/* Inner Shadow */}
      <LinearGradient
        colors={['rgba(0, 0, 0, 0.2)', 'rgba(0, 0, 0, 0)']}
        start={[0, 0]}
        end={[0, 1]}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1,
          borderRadius: 10,
        }}
      />

      {/* Power Icon */}
      <Image
        source={require('../assets/images/wand.png')}
        className="w-14 h-8 rounded-xxl"
        resizeMode="contain"
        style={{ zIndex: 0 }}
      />
      <Text className="text-white text-lg font-pixelifyB ml-2">
        {power !== null ? power : 'Loading...'}
      </Text>
    </View>
  );
};

export default Power;
