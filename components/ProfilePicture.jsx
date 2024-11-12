import React from 'react';
import { View, Image } from 'react-native';

const ProfilePicture = () => {
  return (
    <View
      className="w-1/5 h-4/5 bg-brown-800 p-4 flex justify-center items-center"
      style={{ marginLeft: '5%' }} // Adds padding from the left edge
    >
      <Image
        source={require('../assets/images/profile.png')} // Change path as needed
        className="w-full h-full rounded-full"
      />
    </View>
  );
};

export default ProfilePicture;
