import { useEffect, useState } from "react";
import { getAllPosts } from "./appwrite";
import { Alert } from "react-native";

// Define the type for video data
interface Video {
    id: string;
    title: string;
    url: string;
    // Add other properties as needed
  }

type FetchVideosFunction = () => Promise<Video[]>;


const useAppWrite = (fn : FetchVideosFunction) => {
    const [videoData,setVideoData] = useState<any[]>([]);
    const [isLoading,setIsLoading] = useState(true);
  
    useEffect(()=>{
      const fetchData = async () => {
        setIsLoading(true);
        try{
          const response = await fn();
          if (response) {
            setVideoData(response);
          } else {
            setVideoData([]);
          }
          
        }catch (error){
          if(error instanceof Error){
            // console.log(error.message);
            // throw new Error(error.message);  
            Alert.alert('Error',error.message)
          } 
        }finally{
          setIsLoading(false);
        }
      }
    },[])
  
    return {videoData}
}

export default useAppWrite;