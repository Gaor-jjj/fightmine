import { View, SafeAreaView, Text } from 'react-native'
import React from 'react'
import Header from '../../../components/Header'

const Shop = () => {
  return (
    <SafeAreaView className='flex-1 bg-neutral'>
      <View className='flex-1'>
        <Header />
        <Text>This is the shop</Text>
      </View>
    </SafeAreaView>
  )
}

export default Shop

