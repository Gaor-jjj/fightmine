import { View, Text, SafeAreaView, ImageBackground } from 'react-native'
import React from 'react'
import Header from '../../components/Header'
import { images } from '../../constants'

const achievements = () => {
  return (
    <SafeAreaView className='flex-1'>
      <View className='flex-1'>
        <Header />
        <View className="h-1/4">
          <ImageBackground
            source={images.achievementsbg}
            resizeMode='cover'
            className='flex-1 justify-center items-center'
          >
            <View>

            </View>
          </ImageBackground>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default achievements