import React from 'react';
import { Tabs } from 'expo-router';
import { Pressable, Animated, Image, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { GoldProvider } from '../../context/GoldProvider'; // Import the GoldProvider

import icons from '../../constants/icons';

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  // Create animated values for each tab icon
  const scaleHome = new Animated.Value(1);
  const scaleAchievements = new Animated.Value(1);
  const scaleFight = new Animated.Value(1);

  // Function to handle press in (scale up for the pressed icon)
  const handlePressIn = (scale) => {
    Animated.spring(scale, {
      toValue: 1.2,
      friction: 4,
      useNativeDriver: true,
    }).start();
  };

  // Function to handle press out (reset scale)
  const handlePressOut = (scale) => {
    Animated.spring(scale, {
      toValue: 1,
      friction: 4,
      useNativeDriver: true,
    }).start();
  };

  return (
    <>
      {/* Add a background for the status bar */}
      <View style={{ height: insets.top, backgroundColor: '#C3B091' }}>
        <StatusBar style="light" translucent />
      </View>

      {/* Main content with padding for the status bar */}
      <View style={{ flex: 1 }}>
        <GoldProvider>
          <Tabs
            screenOptions={{
              tabBarStyle: {
                backgroundColor: '#C3B091',
                height: 60 + insets.bottom,
                paddingBottom: insets.bottom
              },
              headerShown: false,
            }}
          >
            <Tabs.Screen
              name="home"
              options={{
                title: 'Home',
                tabBarButton: (props) => {
                  const isSelected = props.accessibilityState.selected;

                  return (
                    <Pressable
                      {...props}
                      android_ripple={null}
                      style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: isSelected ? '#8E7F6B' : 'transparent',
                      }}
                      onPressIn={() => handlePressIn(scaleHome)} // Trigger scale up on press
                      onPressOut={() => handlePressOut(scaleHome)} // Reset scale on release
                    >
                      <Animated.Image
                        source={icons.home}
                        className={`h-10 w-10 ${isSelected ? 'opacity-100' : 'opacity-40'}`} // Apply opacity based on selection
                        style={{ transform: [{ scale: scaleHome }] }} // Apply scaling for this icon only
                      />
                    </Pressable>
                  );
                },
              }}
            />
            <Tabs.Screen
              name="achievements"
              options={{
                title: 'Achievements',
                tabBarButton: (props) => {
                  const isSelected = props.accessibilityState.selected;

                  return (
                    <Pressable
                      {...props}
                      android_ripple={null}
                      style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: isSelected ? '#8E7F6B' : 'transparent',
                      }}
                      onPressIn={() => handlePressIn(scaleAchievements)} // Trigger scale up on press
                      onPressOut={() => handlePressOut(scaleAchievements)} // Reset scale on release
                    >
                      <Animated.Image
                        source={icons.achievements}
                        className={`h-10 w-10 ${isSelected ? 'opacity-100' : 'opacity-40'}`} // Apply opacity based on selection
                        style={{ transform: [{ scale: scaleAchievements }] }} // Apply scaling for this icon only
                      />
                    </Pressable>
                  );
                },
              }}
            />
            <Tabs.Screen
              name="fight"
              options={{
                title: 'Fight',
                tabBarButton: (props) => {
                  const isSelected = props.accessibilityState.selected;

                  return (
                    <Pressable
                      {...props}
                      android_ripple={null}
                      style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: isSelected ? '#8E7F6B' : 'transparent',
                      }}
                      onPressIn={() => handlePressIn(scaleFight)} // Trigger scale up on press
                      onPressOut={() => handlePressOut(scaleFight)} // Reset scale on release
                    >
                      <Animated.Image
                        source={icons.fight}
                        className={`h-10 w-10 ${isSelected ? 'opacity-100' : 'opacity-40'}`} // Apply opacity based on selection
                        style={{ transform: [{ scale: scaleFight }] }} // Apply scaling for this icon only
                      />
                    </Pressable>
                  );
                },
              }}
            />
            <Tabs.Screen
              name="shop/index"
              options={{
                href: null, // This disables it from appearing in the tab bar
              }}
            />
            <Tabs.Screen
              name="profile/index"
              options={{
                href: null, // This disables it from appearing in the tab bar
              }}
            />
          </Tabs>
        </GoldProvider>
      </View>
    </>
  );
}
