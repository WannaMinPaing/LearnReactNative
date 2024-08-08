import { FlatList, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View, ViewToken } from 'react-native';
import React, { useEffect, useState } from 'react';
import * as Animatable from "react-native-animatable";
import { icons, images } from '@/constants';

interface Post {
    $id: string;
    thumbnail: string;
}

interface TrendingProps {
    posts: Post[];
}

const zoomIn = {
    0: {
        scale: 0.9
    },
    1: {
        scale: 1.2
    }
};

const zoomOut = {
    0: {
        scale: 1
    },
    1: {
        scale: 0.9
    }
};

const TrendingItem = ({ activeItem, item }: { activeItem: string, item: Post }) => {
    const [play, setPlay] = useState(false);

    return (
        <Animatable.View
            className='mr-5'
            animation={ activeItem === item.$id ? zoomIn : zoomOut}
            duration={500}
        >
            {play ? (<Text className='text-white'>Playing</Text>) :
                (
                    <TouchableOpacity
                        className='relative justify-center items-center'
                        activeOpacity={0.7}
                        onPress={() => setPlay(true)}
                    >
                        <ImageBackground
                            source={{
                                uri: item.thumbnail
                            }}
                            className='w-32 h-52 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40'
                            resizeMode='cover'
                        />
                        <Image
                            source={icons.play}
                            className='w-12 h-12 absolute'
                            resizeMode='contain'
                        />
                    </TouchableOpacity>
                )}
        </Animatable.View>
    );
};

const Trending: React.FC<TrendingProps> = ({ posts }) => {
    
  const [activeItem, setActiveItem] = useState<any>(posts[1]);

    const viewableItemsChanged = ({ viewableItems }: { viewableItems: ViewToken[] }) => {
        if (viewableItems.length > 0) {
            setActiveItem(viewableItems[0].key);
        }
    };

    return (
        <FlatList
            data={posts}
            keyExtractor={(item) => item.$id.toString()}
            renderItem={({ item }) => (
                <TrendingItem activeItem={activeItem} item={item} />
            )}
            onViewableItemsChanged={viewableItemsChanged}
            viewabilityConfig={{
                itemVisiblePercentThreshold: 70
            }}
            contentOffset={{ x: 100, y: 0 }}  
            horizontal
        />
    );  
};

export default Trending;
