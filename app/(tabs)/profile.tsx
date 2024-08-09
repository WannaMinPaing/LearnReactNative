import { Alert, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
} from "react-native-safe-area-context";
import SearchInput from "@/components/SearchInput";
import Trending from "@/components/Trending";
import EmptyState from "@/components/EmptyState";
import RefreshControl from "@/components/RefreshControl";
import { getAllPosts, searchPosts } from "@/lib/appwrite";
import VideoCard from "@/components/VideoCard";
import { router, useLocalSearchParams } from "expo-router";
import { icons, images } from "@/constants";
import InfoBox from "@/components/InfoBox";

type DataItem = {
  id: number;
};

const Profile = () => {
  const [videoData,setVideoData] = useState<any[]>([]);
  const [isLoading,setIsLoading] = useState(true);
  const {query} = useLocalSearchParams();
  const searchQuery = Array.isArray(query) ? query.join(" ") : query;


  useEffect(()=>{
    const fetchData = async () => {
      setIsLoading(true);
      try{
        const response = await searchPosts(searchQuery ?? "shwe");
        if (response) {
          setVideoData(response);
        } else {
          setVideoData([]);
        }
        
      }catch (error){
        if(error instanceof Error){
          Alert.alert('Error',error.message)
        } 
      }finally{
        setIsLoading(false);
      }
    }
    fetchData();
  },[query])

  const [refreshing,setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    setRefreshing(false);
  }

  const logout = () => {
    router.replace("/sign-in")
  }

  // useEffect(()=>{
  //   refetch();
  // },[query])

  // const data: DataItem[] = [{ id: 1 }, { id: 2 }, { id: 3 }];

  return (
    <SafeAreaView className="bg-primary  h-full">
      <FlatList
        data={videoData}
        keyExtractor={(item) => item.$id.toString()}
        // data={[{ id: 1 }, { id: 2 }, { id: 3 }]}
        // keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard title={item.title} thumbnail={item.thumbnail} video={item.video}  />}
        ListHeaderComponent={() => (
          <View className="w-full justify-center items-center mt-6 mb-12 px-4">
               <TouchableOpacity 
                  className="w-full items-end mb-10"
                  onPress={logout}
                >
                  <Image source={icons.logout}  resizeMode="contain" className="w-6 h-6 " />
               </TouchableOpacity>
              <View className="w-16 h-16 border border-secondary rounded-lg justify-center items-center">
                <Image source={images.logo} className="w-[90%] h-[90%] rounded-lg" resizeMode="cover" />
              </View>
                <InfoBox title="Wana"  containerStyles="mt-5" titleStyles="text-lg" />

                <View className="flex-row">
                  <InfoBox title={videoData.length || 0 } subtitle="Posts" containerStyles="mr-10" titleStyles="text-xl" />
                  <InfoBox title="1.2k" subtitle="Followers"  titleStyles="text-lg" />
                </View>
              
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState 
            title = "No Videos Found"
            subtitle = "No video found for this query"
          />
        )}
        // refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
    </SafeAreaView>
  );
};

export default Profile;
