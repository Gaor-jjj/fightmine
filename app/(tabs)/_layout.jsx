import { Tabs } from 'expo-router';
import { Pressable, Animated, Image } from 'react-native';
import icons from '../../constants/icons';

export default function TabLayout() {
  // Create animated values for each tab icon
  const scaleHome = new Animated.Value(1);
  const scaleAchievements = new Animated.Value(1);
  const scaleFight = new Animated.Value(1);

  // Function to handle press in (scale up for the pressed icon)
  const handlePressIn = (scale) => {
    Animated.spring(scale, {
      toValue: 1.2, // Scale up to 120%
      friction: 4,
      useNativeDriver: true,
    }).start();
  };

  // Function to handle press out (reset scale)
  const handlePressOut = (scale) => {
    Animated.spring(scale, {
      toValue: 1, // Return to original size
      friction: 4,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#C3B091',
          height: 55
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
    </Tabs>
  );
}
