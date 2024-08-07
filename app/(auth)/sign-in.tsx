import { Alert, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import { SignInForm } from "@/lib/appwrite";

const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = async () => {
    if ( !form.email || !form.password) {
      Alert.alert("Error", "Please fill in all fields.");
    }
    setIsSubmitting(true);
    try {
      await SignInForm({email : form.email,password : form.password});
      router.replace('/home')
    } catch (error) {
      // console.log(error);
      // Alert.alert("Error", "error");
      router.replace('/home')
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[85vh] px-4 my-6">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-[35px]"
          />
          <Text className="text-2xl text-white font-bold mt-10 ">
            Log in to Aora
          </Text>
          <FormField
            title="Email"
            value={form.email}
            placeHolder="example@gmail.com"
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={form.password}
            placeHolder="******"
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />
          <CustomButton
            title="Sign In"
            handlePress={() => handleSubmit()}
            containerStyles="w-full mt-7"
            isLoading={isSubmitting}
          />
          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-normal">
              Don't have account?
            </Text>
            <Link href="/sign-up" className="text-lg text-secondary">
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
