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
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <LinearGradient
      colors={[gradientFrom, gradientTo]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={{
        borderRadius: 10,
        width: '90%',
        marginVertical: 8
      }}
    >
      <View
        style={{
          backgroundColor: isFocused ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0.1)',
        }}
        className='px-4'
      >
        <TextInput
          value={value}
          placeholder={placeholder}
          onChangeText={onChangeText}
          secureTextEntry={isPassword}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="font-pixelifyM w-full h-14"
        />
      </View>
    </LinearGradient>
  );
};

export default InputField;
