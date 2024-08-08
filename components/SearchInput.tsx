import {
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
  } from "react-native";
  import React, { FC, useState } from "react";
  import icons from "../constants/icons";
  
  interface SearchInputProps {
    title?: string;
    value?: string;
    // handleChangeText: (e: string) => void;
    placeHolder? : string,
    otherStyles?: string;
    keyboardType?: string;
  }
  
  const SearchInput = ({
    title,
    value,
    // handleChangeText,
    placeHolder,
    otherStyles,
    keyboardType,
  }: SearchInputProps) => {
    const [showPassword, setShowPassword] = useState(false);
    return (
        <View className="border-2 border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center flex-row space-x-4">
          <TextInput
            className="text-base mt-0.5 text-white flex-1 font-normal"
            value={value}
            placeholder={"Search for video a topic"}
            placeholderTextColor="#7b7b8b"
            // onChangeText={handleChangeText}
            secureTextEntry={title === "Password" && !showPassword}
          />
  
          <TouchableOpacity>
            <Image source={icons.search} className="w-5 h-5"  resizeMode="contain"/>
          </TouchableOpacity>
        </View>
    );
  };
  
  export default SearchInput;
  