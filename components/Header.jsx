import React from 'react';
import { View } from 'react-native';
import ProfilePicture from './ProfilePicture';  // Import the ProfilePicture component

export default function Header() {
  return (
    <View className="w-full h-72 bg-brown-700 p-4 flex flex-row items-center">
      <ProfilePicture />
      {/* Other header content can go here */}
    </View>
  );
}
