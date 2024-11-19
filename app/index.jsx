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
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <SafeAreaView className="flex-1">
        <View className="w-full h-full p-2">
          {/* Logo container */}
          <View className="w-full h-[300px] items-center justify-center">
            <Image source={images.logo} resizeMode="contain" className="w-[70%] h-full" />
          </View>

          {/* Main buttons */}
          <View className="flex-1 items-center justify-center">
            <MainButton title="Log In" onPress={() => router.push('/login')} />
            <MainButton title="Register" onPress={() => router.push('/register')} />
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

