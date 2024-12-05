import { View, SafeAreaView, Text, ImageBackground } from 'react-native'
import React from 'react'
import Header from '../../../components/Header'
import { images } from '../../../constants'
import ShopComponent from '../../../components/ShopComponent'

const Shop = () => {
  return (
    <SafeAreaView className='flex-1 bg-neutral'>
      <View className='flex-1'>
        <Header />
        <View className="h-1/4">
          <ImageBackground
            source={images.shopbg}
            resizeMode='cover'
            className='flex-1 justify-center items-center'
          >
          </ImageBackground>
        </View>
        <View className='flex-1 items-center p-4'>
          <ShopComponent/>
          <ShopComponent/>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Shop

