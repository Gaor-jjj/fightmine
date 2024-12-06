import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { fetchAchievements, updateUserAchievements } from '../lib/appwrite';
import { useGlobalContext } from './GlobalProvider';
import { useGold } from './GoldProvider';

const AchievementContext = createContext();

export const useAchievements = () => useContext(AchievementContext);

export const AchievementProvider = ({ children }) => {
  const { user } = useGlobalContext();
  const { gold } = useGold();
  const [achievements, setAchievements] = useState([]);
  const [completedAchievements, setCompletedAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPoints, setTotalPoints] = useState(0);
  const [pendingUpdates, setPendingUpdates] = useState([]);


  const loadAndCheckAchievements = useCallback(async () => {
    console.log('Checking achievements');
    try {
      const fetchedAchievements = await fetchAchievements();
      setAchievements(fetchedAchievements);

      const userCompletedAchievements = user?.achievements || [];
      setCompletedAchievements(userCompletedAchievements);

      let total = 0;
      fetchedAchievements.forEach((achievement) => {
        if (userCompletedAchievements.includes(achievement.id.toString())) {
          total += achievement.points;
        }
      });
      setTotalPoints(total);
    } catch (error) {
      console.error('Error loading achievements:', error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  const getAchievementStatus = useCallback((achievementId) => {
    return completedAchievements.includes(achievementId.toString());
  }, [completedAchievements]);

  const checkAndUpdateAchievements = useCallback(() => {
    achievements.forEach((achievement) => {
      if (!getAchievementStatus(achievement.id)) {
        // Log the achievement and the gold value
        console.log(`Checking achievement: ${achievement.id}, Gold: ${gold}`);
  
        // Check if the achievement should be completed based on gold
        if (
          (achievement.id === 1 && gold >= 1000) ||
          (achievement.id === 2 && gold >= 100000) ||
          (achievement.id === 3 && gold >= 1000000) ||
          (achievement.id === 4 && gold >= 2000000) ||
          (achievement.id === 5 && gold >= 10000000) ||
          (achievement.id === 6 && gold >= 100000000)
        ) {
          console.log(`Completing achievement with ID: ${achievement.id}`);
          completeAchievement(achievement.id);
        }
      }
    });
  }, [achievements, gold, getAchievementStatus]);
  
  

  const completeAchievement = useCallback((achievementId) => {
    if (user && !completedAchievements.includes(achievementId.toString())) {
      setCompletedAchievements((prev) => {
        const newCompletedAchievements = new Set(prev);  // Use Set to avoid duplicates
        newCompletedAchievements.add(achievementId.toString());
        const achievement = achievements.find(a => a.id === achievementId);
        if (achievement) {
          setTotalPoints(prevTotal => prevTotal + achievement.points);
        }
        return Array.from(newCompletedAchievements);  // Convert Set back to array
      });
  
      // Add the completed achievement to pending updates list
      setPendingUpdates(prev => [...prev, achievementId]);
    } else {
      console.log(`Achievement ID ${achievementId} already completed or user is not available.`);
    }
  }, [user, completedAchievements, achievements]);
  
  
  
  

  // Update completed achievements when gold changes
  useEffect(() => {
    if (!loading) {
      checkAndUpdateAchievements();
    }
  }, [gold, loading, checkAndUpdateAchievements]);

  useEffect(() => {
    loadAndCheckAchievements();
  }, [loadAndCheckAchievements]);

  useEffect(() => {
    const updateAchievementsSequentially = async () => {
      if (pendingUpdates.length > 0) {
        for (let i = 0; i < pendingUpdates.length; i++) {
          const achievementId = pendingUpdates[i];
          const achievement = achievements.find(a => a.id.toString() === achievementId.toString());
  
          if (achievement) {
            try {
              await updateUserAchievements(user.$id, achievement.id);  // Wait for each update to finish
              console.log(`Achievement ${achievement.id} successfully updated in database.`);
            } catch (error) {
              console.error(`Failed to update achievement ${achievement.id} in database:`, error);
            }
          }
        }
  
        // Clear the pending updates after all are updated
        setPendingUpdates([]);
        console.log("All achievements updated successfully.");
      }
    };
  
    updateAchievementsSequentially();
  }, [pendingUpdates, user.$id, achievements]);
  
  
  
  
  

  return (
    <AchievementContext.Provider
      value={{
        achievements,
        completedAchievements,
        totalPoints,
        loading,
        getAchievementStatus,
      }}
    >
      {children}
    </AchievementContext.Provider>
  );
};
