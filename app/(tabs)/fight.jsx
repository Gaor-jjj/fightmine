import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, ImageBackground, TouchableOpacity, Animated, Text, FlatList, Image } from 'react-native';
import { useGold } from '../../context/GoldProvider'; // Import the GoldContext hook
import Header from '../../components/Header';
import HPComponent from '../../components/HPComponent';
import MonsterComponent from '../../components/MonsterComponent';
import { getCurrentUser, getMonsters } from '../../lib/appwrite';
import { images } from '../../constants';

const Fight = () => {
  const [currentHP, setCurrentHP] = useState(null);
  const [monsterHP, setMonsterHP] = useState(null);
  const [power, setPower] = useState(null);
  const [congratsVisible, setCongratsVisible] = useState(false);
  const [isClickable, setIsClickable] = useState(true);
  const [shakeAnimation] = useState(new Animated.Value(0));
  const [selectedMonster, setSelectedMonster] = useState(null);
  const [monsters, setMonsters] = useState([]);
  const [fadeAnimation] = useState(new Animated.Value(1)); // Initial opacity set to 1 (fully visible)
  const [messagePosition] = useState(new Animated.Value(-100)); // Starts off-screen below (negative value)

  // Gold context values
  const { gold, updateGold, isLoading } = useGold(); // Access gold and updateGold function from context

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await getCurrentUser();
        if (user && user.power !== undefined) {
          setPower(user.power);
        }

        const monsterData = await getMonsters();
        setMonsters(monsterData);

        if (monsterData.length > 0) {
          const defaultMonster = monsterData[0];
          setSelectedMonster(defaultMonster);
          setMonsterHP(defaultMonster.hp);
          setCurrentHP(defaultMonster.hp);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const fightMonster = () => {
    if (!isClickable || power === null || !selectedMonster) return;

    setCurrentHP((prevHP) => {
      const newHP = Math.max(prevHP - power, 0);
      if (newHP === 0) {
        onMonsterDeath(); // Trigger both death sequence and loot addition
      }
      return newHP;
    });

    triggerShakeAnimation();
  };

  const triggerAddLoot = () => {
    if (selectedMonster && selectedMonster.gold) {
      updateGold(selectedMonster.gold, 'add'); // Fetch and add gold at the same time
      console.log(`Added ${selectedMonster.gold} gold!`); // Optional: for debugging
    }
  };

  const triggerDeathSequence = () => {
    setIsClickable(false);

    // Reset message position to off-screen (below the screen)
    messagePosition.setValue(-100);

    // Start fade-out animation (1.5 seconds)
    Animated.sequence([
      Animated.timing(fadeAnimation, {
        toValue: 0, // Fade to 0 (fully transparent)
        duration: 1500, // 1.5 seconds fade-out
        useNativeDriver: true,
      }),
      Animated.delay(500), // Wait for 0.5 seconds after fade-out
      Animated.timing(fadeAnimation, {
        toValue: 1, // Fade back in (fully visible)
        duration: 500, // Fade in duration (0.5 seconds)
        useNativeDriver: true,
      }),
    ]).start();

    // Push the area down and show congrats message with slide-up animation
    Animated.timing(messagePosition, {
      toValue: 0, // Slide the message from below to the top
      duration: 500,
      useNativeDriver: false,
    }).start();

    setCongratsVisible(true);

    // Set timeout for hiding the congrats message and respawning the monster
    setTimeout(() => {
      setCongratsVisible(false); // Hide congrats message

      // Reset position after the message disappears
      Animated.timing(messagePosition, {
        toValue: -100, // Slide the message back down
        duration: 300,
        useNativeDriver: false,
      }).start();

      // Respawn monster with full HP
      if (selectedMonster) {
        setCurrentHP(selectedMonster.hp);
      }

      setIsClickable(true); // Allow clicks again
    }, 2000); // Total duration for the sequence is 2 seconds
  };

  const onMonsterDeath = () => {
    triggerDeathSequence(); // Trigger death sequence animations
    triggerAddLoot(); // Add loot (gold) immediately after monster death
  };

  const triggerShakeAnimation = () => {
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
    ]).start();
  };

  const shakeStyle = {
    transform: [{ translateX: shakeAnimation }],
  };

  return (
    <SafeAreaView className="flex-1 bg-neutral">
      <View className="flex-1">
        <Header />

        {/* Monster and Background */}
        <View className="h-1/4">
          <ImageBackground
            source={images.fightbg}
            resizeMode="cover"
            className="flex-1 justify-center items-center"
          >
            {/* Display selected monster image */}
            {selectedMonster && (
              <TouchableOpacity disabled={!isClickable} onPress={fightMonster}>
                <Animated.View style={[shakeStyle, { opacity: fadeAnimation }]}>
                  <Image
                    source={images[selectedMonster.name.toLowerCase()]} // Display the selected monster's image
                    className="h-40 w-40"
                    resizeMode="contain"
                  />
                </Animated.View>
              </TouchableOpacity>
            )}

            {/* Monster HP Component */}
            {currentHP !== null && monsterHP !== null && (
              <HPComponent currentHP={currentHP} monsterHP={monsterHP} />
            )}

            {/* Congratulatory Message */}
            {congratsVisible && (
              <Animated.View
                style={{
                  position: 'absolute',
                  bottom: messagePosition, // Animated position to slide it up and down
                  left: 0,
                  right: 0,
                  paddingVertical: 10,
                  backgroundColor: '#3E2723', // Brown-900 background
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 10, // Rounded corners for the "bar" shape
                }}
              >
                <Text className="text-white text-lg font-bold">
                  Congratulations! You defeated {selectedMonster?.name}!
                </Text>
              </Animated.View>
            )}
          </ImageBackground>
        </View>

        {/* Monster selection */}
        <View className="flex-1 mt-2">
          <Text className="text-center text-xl font-bold mb-4">Choose a Monster</Text>

          <FlatList
            data={monsters}
            renderItem={({ item }) => (
              <MonsterComponent
                monster={item}
                activeMonsterImage={images[item?.name.toLowerCase()]}
                onFight={(selected) => {
                  setSelectedMonster(selected);
                  setCurrentHP(selected.hp); // Reset the HP of the selected monster
                  setMonsterHP(selected.hp); // Set the max HP (same as initial HP)
                }}
              />
            )}
            keyExtractor={(item) => item?.id}
            contentContainerStyle={{
              paddingBottom: 20,
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Fight;
