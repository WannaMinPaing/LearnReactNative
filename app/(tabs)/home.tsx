import { Alert, FlatList, Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
} from "react-native-safe-area-context";
import {images} from "../../constants";
import SearchInput from "@/components/SearchInput";
import Trending from "@/components/Trending";
import EmptyState from "@/components/EmptyState";
import RefreshControl from "@/components/RefreshControl";
import { getAllPosts } from "@/lib/appwrite";
import VideoCard from "@/components/VideoCard";

type DataItem = {
  id: number;
};

const Home = () => {
  const [videoData,setVideoData] = useState<any[]>([]);
  const [isLoading,setIsLoading] = useState(true);

  useEffect(()=>{
    const fetchData = async () => {
      setIsLoading(true);
      try{
        const response = await getAllPosts();
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
  },[])

  const [refreshing,setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    setRefreshing(false);
  }

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
          <View className="my-6 px-4 space-y-6">
            <View className="justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-normal text-sm text-gray-100">Welcome Back</Text>
                <Text className="text-2xl font-normal text-white">Wanna</Text>
              </View>
              <View className="mt-1.5"><Image source={images.logoSmall}  className="w-9 h-10" resizeMode="contain"/></View>
            </View>
            <SearchInput initialQuery="" />
            <View className="w-full flex-1 pt-5 pb-8">
              <Text className="text-gray-100 text-lg font-normal mb-3">Lastest Videos</Text>
              <Trending posts={ videoData ?? []} />
            </View>
            
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState 
            title = "No Videos Found"
            subtitle = "Be the first one to upload video"
          />
        )}
        // refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
    </SafeAreaView>
  );
};

export default Home;
