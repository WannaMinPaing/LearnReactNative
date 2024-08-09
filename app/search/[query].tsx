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
import { getAllPosts, searchPosts } from "@/lib/appwrite";
import VideoCard from "@/components/VideoCard";
import { useLocalSearchParams } from "expo-router";

type DataItem = {
  id: number;
};

const Search = () => {
  const [videoData,setVideoData] = useState<any[]>([]);
  const [isLoading,setIsLoading] = useState(true);
  const {query} = useLocalSearchParams();
  const searchQuery = Array.isArray(query) ? query.join(" ") : query;


  useEffect(()=>{
    const fetchData = async () => {
      setIsLoading(true);
      try{
        const response = await searchPosts(searchQuery);
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
          <View className="my-6 px-4">
                <Text className="font-normal text-sm text-gray-100">Search Results</Text>
                <Text className="text-2xl font-normal text-white">{query}</Text>
                <View className="mt-6 mb-8">
                  <SearchInput initialQuery={searchQuery} />
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

export default Search;
