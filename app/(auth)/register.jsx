import { View, ImageBackground, StatusBar, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MainButton from '../../components/MainButton';
import { images } from '../../constants';
import { useRouter } from 'expo-router';
import InputField from '../../components/InputField';
import { useState } from 'react';

export default function Register() {
    const router = useRouter();
    const [form, setForm] = useState({
      username: '',  
      email: '',
      password: '',
    });
  
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
  
            {/* Login form */}
            <View className="flex-1 items-center justify-center">
                <InputField
                label='Username'
                placeholder="Username"
                value={form.email}
                onChangeText={(e) => setForm({ ...form, username: e })}
                />
                <InputField
                label='Password'
                placeholder="Example@email.com"
                value={form.email}
                onChangeText={(e) => setForm({ ...form, email: e })}
                />
                <InputField
                label='Password'
                placeholder="Password"
                value={form.password}
                onChangeText={(e) => setForm({ ...form, password: e })}
                isPassword
                />
                <MainButton title="Register" onPress={() => router.push('/home')} />
            </View>
          </View>
        </SafeAreaView>
      </ImageBackground>
    );
  }
  