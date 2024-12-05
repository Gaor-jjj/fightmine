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

  const loadAndCheckAchievements = useCallback(async () => {
    console.log('Checking achievements')
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
        switch (achievement.id) {
          case 1:
            if (gold >= 1000) completeAchievement(achievement.id);
            break;
          case 2:
            if (gold >= 100000) completeAchievement(achievement.id);
            break;
          case 3:
            if (gold >= 1000000) completeAchievement(achievement.id);
            break;
          case 4:
            if (gold >= 2000000) completeAchievement(achievement.id);
            break;
          case 5:
            if (gold >= 10000000) completeAchievement(achievement.id);
            break;
          case 6:
            if (gold >= 100000000) completeAchievement(achievement.id);
            break;
        }
      }
    });
  }, [achievements, gold, getAchievementStatus]);

  const completeAchievement = useCallback((achievementId) => {
    if (user && !completedAchievements.includes(achievementId.toString())) {
      updateUserAchievements(user.$id, achievementId);
      setCompletedAchievements((prev) => {
        const newCompletedAchievements = [...prev, achievementId.toString()];
        const achievement = achievements.find(a => a.id === achievementId);
        if (achievement) {
          setTotalPoints(prevTotal => prevTotal + achievement.points);
        }
        return newCompletedAchievements;
      });
    }
  }, [user, completedAchievements, achievements]);

  useEffect(() => {
    loadAndCheckAchievements();
  }, [loadAndCheckAchievements]);

  useEffect(() => {
    checkAndUpdateAchievements();
  }, [checkAndUpdateAchievements]);

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

