import React, { useState } from 'react';
import { View, Image, Modal, Pressable, Text, Animated } from 'react-native';
import ProfilePicture from './ProfilePicture';
import Wealth from './Wealth';
import Power from './Power';
import { useRouter } from 'expo-router';
import { useGlobalContext } from '../context/GlobalProvider';
import { signOut } from '../lib/appwrite';
import { icons } from '../constants';
import { useGold } from '../context/GoldProvider';

export default function Header() {
  const [isModalVisible, setModalVisible] = useState(false);
  const { user, setUser, setIsLoggedIn } = useGlobalContext();
  const { gold } = useGold();
  const [scaleSettings] = useState(new Animated.Value(1));
  const router = useRouter();

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const onLogout = async () => {
    await signOut();
    setUser(null);
    setIsLoggedIn(false);
    router.replace('/login')
  }

  const handlePressIn = (scale) => {
    Animated.spring(scale, {
      toValue: 1.2,
      friction: 4,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = (scale) => {
    Animated.spring(scale, {
      toValue: 1,
      friction: 4,
      useNativeDriver: true,
    }).start();
  };

  return (
    <>
      <View className="w-full h-36 bg-primary p-3 flex flex-row items-center">
        <ProfilePicture />

        <View className="flex-1 h-full flex flex-col justify-between ml-3">
          <Wealth />
          <Power />
        </View>

        <View className="flex flex-col justify-between h-full ml-3">
          <Pressable onPress={() => router.push('/shop')} className="w-12 flex-1 bg-secondary rounded-xl justify-center items-center mb-2">
            <Image
              source={require('../assets/images/shop.png')}
              className="w-9 h-9"
              resizeMode="contain"
            />
          </Pressable>
          <Pressable
            onPress={() => {
              handlePressIn(scaleSettings);
              toggleModal();
            }}
            className="w-12 h-1/3 bg-secondary rounded-xl justify-center items-center"
            onPressIn={() => handlePressIn(scaleSettings)} 
            onPressOut={() => handlePressOut(scaleSettings)}
          >
            <Animated.Image
              source={icons.settings}  
              style={{
                transform: [{ scale: scaleSettings }],
              }}
              className="w-8 h-8"
            />
          </Pressable>
        </View>
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleModal}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Pressable
            onPress={toggleModal}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.5)'
            }}
          />
          <View className="w-80 bg-primary rounded-lg p-6">
            <Text className="text-xl font-pixelify mb-4 text-center">Settings</Text>
            <Pressable
              onPress={() => {
                toggleModal();
                onLogout();
              }}
              className="bg-red-700 py-2 px-4 rounded-lg"
            >
              <Text className="text-white text-center font-pixelifyB">Logout</Text>
            </Pressable>

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

