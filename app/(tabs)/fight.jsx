import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, ImageBackground, Image, TouchableOpacity, Animated, Text } from 'react-native';
import Header from '../../components/Header';
import HPComponent from '../../components/HPComponent';
import images from '../../constants/images';
import { getCurrentUser } from '../../lib/appwrite';

const Fight = () => {
  const [currentHP, setCurrentHP] = useState(500); // Initial HP for the dragon
  const [power, setPower] = useState(null); // User's power
  const [congratsVisible, setCongratsVisible] = useState(false); // Show congratulations
  const [isClickable, setIsClickable] = useState(true); // Manage clickability
  const [shakeAnimation] = useState(new Animated.Value(0)); // Animation value for shaking

  // Fetch user power from Appwrite
  useEffect(() => {
    const fetchPower = async () => {
      try {
        const user = await getCurrentUser();
        if (user && user.power !== undefined) {
          setPower(user.power);
        }
      } catch (error) {
        console.error('Error fetching user power:', error);
      }
    };

    fetchPower();
  }, []);

  const fightDragon = () => {
    if (!isClickable || power === null) return; // Prevent clicks if not clickable

    setCurrentHP((prevHP) => {
      const newHP = Math.max(prevHP - power, 0); // Deduct power, no negative HP
      if (newHP === 0) {
        triggerDeathSequence(); // Trigger animation and reset on death
      }
      return newHP;
    });
  };

  const triggerDeathSequence = () => {
    setIsClickable(false); // Disable clicking

    // Start shaking animation
    Animated.sequence([
      Animated.timing(shakeAnimation, {
        toValue: 10, // Shake right
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: -10, // Shake left
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 0, // Return to center
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setCongratsVisible(true); // Show congratulations
      setTimeout(() => {
        setCongratsVisible(false);
        setCurrentHP(500); // Reset dragon HP
        setIsClickable(true); // Re-enable clicking
      }, 2000);
    });
  };

  const shakeStyle = {
    transform: [{ translateX: shakeAnimation }],
  };

  return (
    <SafeAreaView className="flex-1 bg-neutral">
      <View className="flex-1">
        <Header />

        {/* Dragon and Background */}
        <View className="h-1/4">
          <ImageBackground
            source={images.fightbg}
            resizeMode="cover"
            className="flex-1 justify-center items-center"
          >
            {/* Dragon Image with Clickable and Shaking Animation */}
            <TouchableOpacity disabled={!isClickable} onPress={fightDragon}>
              <Animated.View style={shakeStyle}>
                <Image
                  source={images.dragon}
                  className="h-30 w-30"
                  resizeMode="contain"
                />
              </Animated.View>
            </TouchableOpacity>

            {/* Dragon HP Component */}
            <HPComponent currentHP={currentHP} />

            {/* Congratulatory Message */}
            {congratsVisible && (
              <View
                style={{
                  position: 'absolute',
                  bottom: -30,
                  left: 0,
                  right: 0,
                  alignItems: 'center',
                }}
              >
                <Text className="text-green-500 text-lg font-bold">
                  Congratulations! You defeated the dragon!
                </Text>
              </View>
            )}
          </ImageBackground>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Fight;
