import { View, SafeAreaView } from 'react-native'
import React from 'react'
import Header from '../../components/Header'

const Fight = () => {
  return (
    <SafeAreaView className='flex-1 bg-neutral'>
      <View className='flex-1'>
        <Header />
      </View>
    </SafeAreaView>
  )
}

export default Fight

