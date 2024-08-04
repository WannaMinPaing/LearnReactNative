import { StyleSheet, Text,StyleProp,ViewStyle, TouchableOpacity,TextStyle, View } from 'react-native'
import React, { FC } from 'react';

interface CustomButtonProps {
  title: string;
  handlePress: () => void;
  // containerStyles?: StyleProp<ViewStyle>;
  containerStyles?: string;
  textStyles?: StyleProp<TextStyle>;
  isLoading?: boolean;
}

const CustomButton : FC<CustomButtonProps> = ({title, handlePress, containerStyles, textStyles, isLoading = false}) => {
  return (
    <TouchableOpacity
        onPress={handlePress}
        activeOpacity={0.7}   
        className={`bg-secondary rounded-xl min-h-[62px] justify-center items-center 
                    ${containerStyles}
                    ${isLoading ?  'opacity-50' : ''}`}
                    disabled={isLoading}
                    >
      <Text className={`text-primary font-bold text-lg ${textStyles}`}>
        {title}
      </Text>
    </TouchableOpacity>
  )
}

export default CustomButton

