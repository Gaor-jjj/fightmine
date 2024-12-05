import React, { useState } from 'react';
import { TextInput, View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const InputField = ({
  value,
  placeholder,
  onChangeText,
  isPassword = false,
  gradientFrom = '#C3B091',
  gradientTo = '#8E7F6B',
  label, // Label prop will always be passed
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View className="w-[90%] my-3">
      {/* Label styled as a folder tab */}
      <View className="absolute -top-3 left-3 bg-secondary rounded px-2 z-10">
        <Text className="font-pixelifyM text-sm text-[#C3B091]">
          {label}
        </Text>
      </View>

      {/* Gradient Input Field */}
      <LinearGradient
        colors={[gradientFrom, gradientTo]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={{ borderRadius: 10}}
      >
        <View
          className={`${
            isFocused ? 'bg-white/15' : 'bg-white/10'
          } px-4 py-2 rounded-xl`}
        >
          <TextInput
            value={value}
            placeholder={placeholder}
            onChangeText={onChangeText}
            secureTextEntry={isPassword}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="font-pixelifyM text-white w-full h-14"
          />
        </View>
      </LinearGradient>
    </View>
  );
};

export default InputField;