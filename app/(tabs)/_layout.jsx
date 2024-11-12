import { Tabs } from 'expo-router';
import { Pressable, Text, Image } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'blue', // Active tab title color
        tabBarInactiveTintColor: 'gray', // Inactive tab title color
        tabBarStyle: {
          height: 80, // Increased height of the tab bar
          backgroundColor: 'black', // Tab bar background color set to black
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarButton: (props) => (
            <Pressable
              {...props}
              className={`flex-1 justify-center items-center ${
                props.accessibilityState.selected ? 'bg-gray-700' : ''
              }`}
            >
              <Image
                source={require('../../assets/icons/home.png')}
                className={`w-6 h-6 ${props.accessibilityState.selected ? 'tint-blue-500' : 'tint-gray-400'}`}
              />
              <Text
                className={`${
                  props.accessibilityState.selected ? 'text-blue-500' : 'text-gray-500'
                } text-xs mt-1`}
              >
                Home
              </Text>
            </Pressable>
          ),
        }}
      />
      <Tabs.Screen
        name="achievements"
        options={{
          title: 'Achievements',
          tabBarButton: (props) => (
            <Pressable
              {...props}
              className={`flex-1 justify-center items-center ${
                props.accessibilityState.selected ? 'bg-gray-700' : ''
              }`}
            >
              <Image
                source={require('../../assets/icons/achievements.png')}
                className={`w-6 h-6 ${props.accessibilityState.selected ? 'tint-blue-500' : 'tint-gray-400'}`}
              />
              <Text
                className={`${
                  props.accessibilityState.selected ? 'text-blue-500' : 'text-gray-500'
                } text-xs mt-1`}
              >
                Achievements
              </Text>
            </Pressable>
          ),
        }}
      />
      <Tabs.Screen
        name="fight"
        options={{
          title: 'Fight',
          tabBarButton: (props) => (
            <Pressable
              {...props}
              className={`flex-1 justify-center items-center ${
                props.accessibilityState.selected ? 'bg-gray-700' : ''
              }`}
            >
              <Image
                source={require('../../assets/icons/fight.png')}
                className={`w-6 h-6 ${props.accessibilityState.selected ? 'tint-blue-500' : 'tint-gray-400'}`}
              />
              <Text
                className={`${
                  props.accessibilityState.selected ? 'text-blue-500' : 'text-gray-500'
                } text-xs mt-1`}
              >
                Fight
              </Text>
            </Pressable>
          ),
        }}
      />
    </Tabs>
  );
}
