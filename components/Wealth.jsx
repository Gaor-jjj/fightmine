import React, { useState, useEffect } from 'react';
import { View, Image, Text } from 'react-native';
import { getCurrentUser, subscribeToGoldUpdates } from '../lib/appwrite';

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
    <View className="w-40 h-20 bg-brown-700 rounded-xl flex flex-row items-center justify-start p-2">
      <Image
        source={require('../assets/images/gold.png')}
        className="w-14 h-14 rounded-xxl"
      />
      <Text className="text-white text-lg font-bold ml-2">{gold}</Text>
    </View>
  );
};

export default Wealth;
