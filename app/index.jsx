import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function App() {
  return (
    <SafeAreaView>
        <View className="w-full h-full items-center justify-center p-2">
            <Text className="font-pixelifyB">Hello world!</Text>
        </View>
    </SafeAreaView>
  )
}