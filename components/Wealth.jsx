import React, { useState, useEffect } from 'react';
import { View, Image, Text } from 'react-native';
import { getCurrentUser, subscribeToGoldUpdates } from '../lib/appwrite';
import { LinearGradient } from 'expo-linear-gradient';

const Wealth = () => {
  const [gold, setGold] = useState(0);

  useEffect(() => {
    let unsubscribe;

    async function initialize() {
      try {
        const currentUser = await getCurrentUser();
        if (!currentUser || currentUser.gold === undefined) {
          throw new Error('User or gold value not found');
        }

        setGold(currentUser.gold);

        unsubscribe = subscribeToGoldUpdates(currentUser.$id, (newGold) => {
          setGold(newGold);
        });
      } catch (error) {
        console.error('Error initializing Wealth component:', error);
      }
    }

    initialize();

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  return (
    <View
      className="w-full bg-secondary rounded-xl flex-1 flex-row items-center justify-start p-2 mb-2"
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

      {/* Wealth Icon */}
      <Image
        source={require('../assets/images/gold.png')}
        className="w-14 h-14 rounded-xxl"
        resizeMode="contain"
        style={{ zIndex: 0 }} // Ensuring the image is below the shadow
      />
      <Text className="text-white text-lg font-pixelifyB ml-2">{gold}</Text>
    </View>
  );
};

export default Wealth;
