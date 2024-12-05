import React, { createContext, useContext, useEffect, useState } from 'react';
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

  const loadAndCheckAchievements = async () => {
    console.log('Checking achievements')
    try {
      const fetchedAchievements = await fetchAchievements();
      setAchievements(fetchedAchievements);

      const userCompletedAchievements = user?.achievements || [];
      setCompletedAchievements(userCompletedAchievements);

      let total = 0;
      fetchedAchievements.forEach((achievement) => {
        if (getAchievementStatus(achievement.id, userCompletedAchievements)) {
          total += achievement.points;
        }
      });
      setTotalPoints(total);
    } catch (error) {
      console.error('Error loading achievements:', error);
    } finally {
      setLoading(false);
    }
  };

  const getAchievementStatus = (achievementId, userCompletedAchievements) => {
    if (userCompletedAchievements.includes(achievementId)) return true;

    switch (achievementId) {
      case 1:
        if (gold >= 1000) return completeAchievement(achievementId);
        break;
      case 2:
        if (gold >= 100000) return completeAchievement(achievementId);
        break;
      case 3:
        if (gold >= 1000000) return completeAchievement(achievementId);
        break;
      case 4:
        if (gold >= 2000000) return completeAchievement(achievementId);
        break;
      case 5:
        if (gold >= 10000000) return completeAchievement(achievementId);
        break;
      case 6:
        if (gold >= 100000000) return completeAchievement(achievementId);
        break;
      default:
        return false;
    }
    return false;
  };

  const completeAchievement = (achievementId) => {
    if (user && !completedAchievements.includes(achievementId.toString())) {
      updateUserAchievements(user.$id, achievementId);
      setCompletedAchievements((prev) => [...prev, achievementId.toString()]);
      return true;
    }
    return false;
  };

  useEffect(() => {
    loadAndCheckAchievements();
  }, [gold]);

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
