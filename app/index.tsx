import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View, Text } from "react-native";

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <StatusBar style="auto" />
      <Text className="text-3xl font-bold">Aora!</Text>
      <Link href="/home" style={{ color: "blue" }}>
        MHome
      </Link>
    </View>
  );
}
// 39