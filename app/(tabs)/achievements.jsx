import { View, Text, SafeAreaView, ImageBackground, Image } from 'react-native'
import React from 'react'
import Header from '../../components/Header'
import { images } from '../../constants'
import { LinearGradient } from 'expo-linear-gradient';
import { icons } from '../../constants';

const achievements = () => {
  return (
    <SafeAreaView className='flex-1 bg'>
      <View className='flex-1'>
        <Header />
        <View className="h-1/4">
          <ImageBackground
            source={images.achievementsbg}
            resizeMode='cover'
            className='flex-1 justify-center items-center'
          >
            <View className='h-1/2 w-3/5 bg-secondary rounded-xl justify-center items-center flex flex-row'>
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
              <Image
                source={icons.goldtrophy}
                className="h-14 justify-center"
                resizeMode="contain"
                style={{ zIndex: 0 }}
              />
              <Text className='font-pixelify text-yellow-500 text-4xl'>400</Text>
            </View>
          </ImageBackground>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default achievements