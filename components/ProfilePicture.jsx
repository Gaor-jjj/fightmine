import React from 'react';
import { View, Image } from 'react-native';

const ProfilePicture = () => {
  return (
    <View
      className="w-44 bg-brown-700 rounded-xl h-4/5  ml-2 flex justify-center items-center" // Increased width and height
    >
      <Image
        source={require('../assets/images/profile.png')}
        className="w-full h-full rounded-l"
      />
    </View>
  );
};

export default ProfilePicture;
