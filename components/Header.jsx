import React from 'react';
import { View, Image } from 'react-native';
import ProfilePicture from './ProfilePicture';
import Wealth from './Wealth';
import Power from './Power';

export default function Header() {
  return (
    <View className="w-full h-56 bg-brown-500 p-3 flex flex-row items-center">
      <ProfilePicture className="w-36 h-36" />
      <View className="ml-3 flex flex-col justify-between h-4/5">
        <Wealth className="w-32 h-20" />
        <Power className="w-32 h-20" />
      </View>
      <View className="ml-3 flex flex-col justify-between h-4/5">
        <View className="w-20 h-20 bg-brown-700 rounded-xl flex justify-center items-center p-1">
          <Image
            source={require('../assets/images/shop.png')}
            className="w-12 h-12 rounded-xl"
          />
        </View>
        <View className="w-20 h-14 bg-brown-700 rounded-xl flex justify-center items-center p-1">
          <Image
            source={require('../assets/images/settings.png')}
            className="w-12 h-12 rounded-xl"
          />
        </View>
      </View>
    </View>
  );
}
