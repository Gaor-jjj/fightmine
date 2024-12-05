import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

const ProfilePicture = () => {
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() => router.push('/profile')}
      activeOpacity={0.7} // Adjust the opacity effect on press
    >
    <View className="h-full aspect-square bg-secondary rounded-xl overflow-hidden">
      {/* Inner Shadow */}
      <LinearGradient
        colors={['rgba(0, 0, 0, 0.2)', 'rgba(0, 0, 0, 0)']}
        start={[0, 0]}
        end={[0, 1]}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1,
          borderRadius: 10,
        }}
      />

      {/* Profile Picture */}
      <Image
        source={require('../assets/images/profile.png')}
        className="w-full h-full"
        resizeMode="cover"
        style={{ zIndex: 0 }}
      />
    </View>
    </TouchableOpacity>
  );
};

export default ProfilePicture;
