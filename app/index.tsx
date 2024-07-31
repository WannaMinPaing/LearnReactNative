import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View, Text } from "react-native";

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <StatusBar style="auto" />
      <Text className="text-3xl"> My Index App21132</Text>
      <Link href="/profile" style={{ color: "blue" }}>
        Go to Profile
      </Link>
    </View>
  );
}
// 29:45