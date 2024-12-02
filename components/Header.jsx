import React from 'react';
import { View, Image } from 'react-native';
import ProfilePicture from './ProfilePicture';
import Wealth from './Wealth';
import Power from './Power';

export default function Header({ coinCount }) {
  return (
    <View className="w-full h-36 bg-brown-500 p-3 flex flex-row items-center">
      {/* Profile Picture */}
      <ProfilePicture />

      {/* Wealth and Power */}
      <View className="flex-1 h-full flex flex-col justify-between ml-3">
        <Wealth initialCount={coinCount}/>
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
        <View className="w-12 h-1/3 bg-secondary rounded-xl justify-center items-center">
          <Image
            source={require('../assets/images/settings.png')}
            className="w-8 h-8"
            resizeMode="contain"
          />
        </View>
      </View>
    </View>
  );
}
