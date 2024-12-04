import React, { createContext, useState, useEffect, useContext } from 'react';
import { getCurrentUser, subscribeToGoldUpdates } from '../lib/appwrite';

const GoldContext = createContext();

export const useGold = () => {
  return useContext(GoldContext);
};

export const GoldProvider = ({ children }) => {
  const [gold, setGold] = useState(null);  // Start with null to indicate uninitialized state
  const [isLoading, setIsLoading] = useState(true); // Track loading state

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
        setGold(currentUser.gold);
        unsubscribe = subscribeToGoldUpdates(currentUser.$id, (newGold) => {
          setGold(newGold);
        });
      } catch (error) {
        console.error('Error initializing gold context:', error);
        setGold(0); // Fallback to 0
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
  

  return (
    <GoldContext.Provider value={{ gold, setGold, isLoading }}>
      {children}
    </GoldContext.Provider>
  );
};
