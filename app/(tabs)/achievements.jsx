import React from 'react';
import { View, Text, SafeAreaView, ImageBackground, Image, ActivityIndicator, ScrollView } from 'react-native';
import { useAchievements } from '../../context/AchievementProvider';
import Header from '../../components/Header';
import { images, icons } from '../../constants';
import { LinearGradient } from 'expo-linear-gradient';
import AchievementComponent from '../../components/AchievementComponent';

const Achievements = () => {
  const { achievements, completedAchievements, totalPoints, loading, getAchievementStatus } = useAchievements();

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
                {totalPoints.toString()}
              </Text>
            </View>
          </ImageBackground>
        </View>

        {/* Scrollable Achievements List */}
        <ScrollView contentContainerStyle={{ paddingBottom: 20, alignItems: 'center' }} className="flex-1 p-4">
          {loading ? (
            <ActivityIndicator size="large" color="#fff" />
          ) : (
            achievements.map((achievement) => (
              <AchievementComponent
                key={achievement.id}
                title={achievement.title}
                description={achievement.description}
                points={achievement.points}
                isCompleted={getAchievementStatus(achievement.id)}
              />
            ))
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Achievements;

