import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MainButton from '../components/MainButton';

export default function App() {
  return (
    <SafeAreaView>
        <View className="w-full h-full items-center justify-center p-2">
            <MainButton
              title="Log In"
            />
            <MainButton
              title="Register"
            />
        </View>
    </SafeAreaView>
  )
}