import { View, Text } from 'react-native'
import React from 'react'

interface RefreshControlProps{
    refreshing : boolean,
    onRefresh : () => void
}

const RefreshControl = ({refreshing,onRefresh}:RefreshControlProps) => {
  return (
    <View>
      <Text className='text-white'>RefreshControl</Text>
    </View>
  )
}

export default RefreshControl