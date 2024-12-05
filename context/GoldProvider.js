import React, { createContext, useState, useEffect, useContext } from 'react';
import { getCurrentUser, subscribeToGoldUpdates, updateGold as updateGoldInDB } from '../lib/appwrite';

const GoldContext = createContext();

export const useGold = () => {
  return useContext(GoldContext);
};

export const GoldProvider = ({ children }) => {
  const [gold, setGold] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    let unsubscribe;
    const initialize = async () => {
      setIsLoading(true);
      console.log("Loading started...");
      try {
        const currentUser = await getCurrentUser();
        if (!currentUser || currentUser.gold === undefined) {
          throw new Error('User or gold value not found');
        }
        setUserId(currentUser.$id);
        setGold(currentUser.gold);
        unsubscribe = subscribeToGoldUpdates(currentUser.$id, (newGold) => {
          setGold(newGold);
        });
      } catch (error) {
        console.error('Error initializing gold context:', error);
        setGold(0);
      } finally {
        console.log("Loading finished");
        setIsLoading(false);
      }
    };
  
    initialize();
  
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  const updateGold = async (amount, operation = 'add') => {
    if (userId) {
      const newGold = operation === 'add' ? gold + amount : gold - amount;
      setGold(newGold);
      await updateGoldInDB(userId, newGold);
    }
  };

  return (
    <GoldContext.Provider value={{ gold, updateGold, isLoading }}>
      {children}
    </GoldContext.Provider>
  );
};

