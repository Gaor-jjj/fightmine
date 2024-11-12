import { View, ImageBackground, StatusBar, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MainButton from '../components/MainButton';
import { images } from '../constants';
import { useRouter } from 'expo-router';

export default function App() {
  const router = useRouter();

  return (
    <ImageBackground
      source={images.splash}
      style={{ width: '100%', height: '100%' }}
      resizeMode="cover"
    >
      {/* Set status bar style */}
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <SafeAreaView className="flex-1">
        <View className="w-full h-full items-center justify-around p-2">
          <Image source={images.logo} resizeMode='contain' className="w-[100%] h-16"/>
          <View className="w-full items-center">
            <MainButton title="Log In" onPress={() => router.push('/home')}/>
            <MainButton title="Register" onPress={() => router.push('/home')}/>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}
