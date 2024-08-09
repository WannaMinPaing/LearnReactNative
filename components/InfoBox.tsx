import { View, Text } from "react-native";
import React from "react";

const InfoBox = ({
  title,
  subtitle,
  containerStyles,
  titleStyles,
}: {
  title: string | Number;
  subtitle?: string | null;
  containerStyles?: string | null;
  titleStyles: string;
}) => {
  return (
    <View  className={`${containerStyles}`}>
      <Text className={`text-white text-center font-normal ${titleStyles}`}>{title.toString()}</Text>
      <Text className="text-sm text-gray-100 text-center font-normal">{subtitle}</Text>
    </View>
  );
};

export default InfoBox;
