import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, ImageBackground, Image, ActivityIndicator, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native'; // Import useFocusEffect
import Header from '../../components/Header';
import { images, icons } from '../../constants';
import { LinearGradient } from 'expo-linear-gradient';
import AchievementComponent from '../../components/AchievementComponent';
import { fetchAchievements, updateUserAchievements } from '../../lib/appwrite';
import { useGlobalContext } from '../../context/GlobalProvider';
import { useGold } from '../../context/GoldProvider';

const Achievements = () => {
  const { user, isLoading: userLoading } = useGlobalContext();
  const { gold } = useGold();
  const [achievements, setAchievements] = useState([]);
  const [completedAchievements, setCompletedAchievements] = useState([]); // Track completed achievements
  const [loading, setLoading] = useState(true);
  const [totalPoints, setTotalPoints] = useState(0); // Track total points

  // Function to load achievements and check their status
  const loadAndCheckAchievements = async () => {
    console.log('Checking achievements')
    try {
      const fetchedAchievements = await fetchAchievements();
      setAchievements(fetchedAchievements);

      // Fetch completed achievements from the user's database
      const userCompletedAchievements = user?.achievements || [];
      setCompletedAchievements(userCompletedAchievements); // Store completed achievements

      let total = 0; // Initialize total points counter

      // Check achievement status for each achievement
      fetchedAchievements.forEach((achievement) => {
        if (getAchievementStatus(achievement.id, userCompletedAchievements)) {
          total += achievement.points;  // Add points of completed achievement
        }
      });

      setTotalPoints(total);  // Set the total points state
    } catch (error) {
      console.error('Error fetching achievements:', error);
    } finally {
      setLoading(false);
    }
  };

  // Check if an achievement is completed based on gold and/or database state
  const getAchievementStatus = (achievementId, userCompletedAchievements) => {
    if (userCompletedAchievements.includes(achievementId)) {
      // If the achievement is already marked as completed, return true
      return true;
    }

    // Otherwise, check the gold value
    switch (achievementId) {
      case 1:
        if (gold >= 1000) {
          markAchievementAsCompleted(achievementId);
          return true;
        }
        break;
      case 2:
        if (gold >= 100000) {
          markAchievementAsCompleted(achievementId);
          return true;
        }
        break;
      case 3:
        if (gold >= 1000000) {
          markAchievementAsCompleted(achievementId);
          return true;
        }
        break;
      case 4:
        if (gold >= 2000000) {
          markAchievementAsCompleted(achievementId);
          return true;
        }
        break;
      case 5:
        if (gold >= 10000000) {
          markAchievementAsCompleted(achievementId);
          return true;
        }
        break;
      case 6:
        if (gold >= 100000000) {
          markAchievementAsCompleted(achievementId);
          return true;
        }
        break;
      default:
        return false;
    }
    return false;
  };

  // When an achievement is completed, update the user's achievements in the database
  const markAchievementAsCompleted = (achievementId) => {
    if (user && !completedAchievements.includes(achievementId.toString())) {
      updateUserAchievements(user.$id, achievementId);
      setCompletedAchievements((prev) => [...prev, achievementId.toString()]); // Track completed achievements locally
    }
  };

  // UseEffect for loading achievements on component mount
  useEffect(() => {
    loadAndCheckAchievements();
  }, []); // This runs only on component mount

  // UseEffect to check achievements when gold changes
  useEffect(() => {
    loadAndCheckAchievements();
  }, [gold]);  // Re-run when gold value changes

  return (
    <SafeAreaView className="flex-1 bg-neutral">
      <View className="flex-1">
        <Header />
        {/* Top Section */}
        <View className="h-1/4">
          <ImageBackground
            source={images.achievementsbg}
            resizeMode="cover"
            className="flex-1 justify-center items-center"
          >
            <View className="h-1/2 w-3/5 bg-secondary rounded-xl justify-center items-center flex flex-row">
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
              <Image
                source={icons.goldtrophy}
                className="h-14 justify-center"
                resizeMode="contain"
                style={{ zIndex: 0 }}
              />
              <Text className="font-pixelify text-yellow-500 text-4xl">
                {totalPoints.toString()} {/* Ensure that totalPoints is rendered as a string */}
              </Text>
            </View>
          </ImageBackground>
        </View>

      {/* Scrollable Achievements List */}
      <ScrollView contentContainerStyle={{ paddingBottom: 20, alignItems: 'center' }} className="flex-1 p-4">
          {loading || userLoading ? (
            <ActivityIndicator size="large" color="#fff" />
          ) : (
            achievements.map((achievement) => {
              const isCompleted = getAchievementStatus(achievement.id, completedAchievements);
              return (
                <AchievementComponent
                  key={achievement.id}
                  title={achievement.title}
                  description={achievement.description}
                  points={achievement.points}
                  isCompleted={isCompleted} // Pass completion status to the component
                />
              );
            })
          )}
      </ScrollView>
    </View>
    </SafeAreaView>
  );
};

export default Achievements;
