import React, { useState } from 'react';
import { View, Image, Modal, Pressable, Text, Animated } from 'react-native';
import ProfilePicture from './ProfilePicture';
import Wealth from './Wealth';
import Power from './Power';
import { useRouter } from 'expo-router';
import { useGlobalContext } from '../context/GlobalProvider';
import { signOut } from '../lib/appwrite';
import { icons } from '../constants';

export default function Header({ coinCount }) {
  const [isModalVisible, setModalVisible] = useState(false);
  const { user, setUser, setIsLoggedIn } = useGlobalContext();
  const [scaleSettings, setScaleSettings] = useState(new Animated.Value(1)); // Create scale animation for settings icon
  const router = useRouter();

  // Function to toggle modal visibility
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const onLogout = async () => {
    await signOut();
    setUser(null);
    setIsLoggedIn(false);
    router.replace('/login')
  }

    //Animation
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
      {/* Hide StatusBar when modal is open */}
      <View className="w-full h-36 bg-primary p-3 flex flex-row items-center">
        {/* Profile Picture */}
        <ProfilePicture />

        {/* Wealth and Power */}
        <View className="flex-1 h-full flex flex-col justify-between ml-3">
          <Wealth initialCount={coinCount} />
          <Power />
        </View>

        {/* Shop and Settings */}
        <View className="flex flex-col justify-between h-full ml-3">
          <View className="w-12 flex-1 bg-secondary rounded-xl justify-center items-center mb-2">
            <Image
              source={require('../assets/images/shop.png')}
              className="w-9 h-9"
              resizeMode="contain"
            />
          </View>
          <Pressable
            onPress={() => {
              handlePressIn(scaleSettings);  // Trigger scale up on press
              toggleModal(); // Toggle modal visibility
            }} // Toggle modal on press
            className="w-12 h-1/3 bg-secondary rounded-xl justify-center items-center"
            onPressIn={() => handlePressIn(scaleSettings)} // Trigger scale up on press
            onPressOut={() => handlePressOut(scaleSettings)} // Reset scale on release
          >
            <Animated.Image
            source={icons.settings}  // Assuming the settings icon is in your icons file
            style={{
              transform: [{ scale: scaleSettings }], // Apply scaling animation to the settings icon
            }}
            className="w-8 h-8"
            />
          </Pressable>
        </View>
      </View>

      {/* Modal for Settings */}
      <Modal
        animationType="fade"
        transparent={true} // Makes the modal background transparent
        visible={isModalVisible}
        onRequestClose={toggleModal} // Close modal when the back button is pressed
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          {/* Semi-Transparent Overlay */}
          <Pressable
            onPress={toggleModal} // Close modal when overlay is pressed
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.5)'
            }}
          />
          {/* Modal Content */}
          <View className="w-80 bg-primary rounded-lg p-6">
            <Text className="text-xl font-pixelify mb-4 text-center">Settings</Text>
            {/* Logout Button */}
            <Pressable
              onPress={() => {
                toggleModal();
                onLogout();
              }}
              className="bg-red-700 py-2 px-4 rounded-lg"
            >
              <Text className="text-white text-center font-pixelifyB">Logout</Text>
            </Pressable>

            {/* Close Modal Button */}
            <Pressable
              onPress={toggleModal}
              className="mt-4 bg-secondary py-4 px-4 rounded-lg"
            >
              <Text className="text-center font-pixelifyB">Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  );
}
