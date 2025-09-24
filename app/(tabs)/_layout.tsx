import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          // Define icons for each tab
          if (route.name === "index") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "add") {
            iconName = focused ? "add-circle" : "add-circle-outline";
          } else if (route.name === "explore") {
            iconName = focused ? "search-sharp" : "search-outline";
          } else if (route.name === "voice-assistant") {
            iconName = focused ? "mic" : "mic-outline";
          } else if (route.name === "community") {
            iconName = focused ? "people" : "people-outline";
          } else {
            iconName = "ellipsis-horizontal";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#4CAF50",
        tabBarInactiveTintColor: "gray",
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: 'bold',
        },
      })}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Dashboard",
        }}
      />
      <Tabs.Screen
        name="add"
        options={{
          title: "Add Items",
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
        }}
      />
      <Tabs.Screen
        name="community"
        options={{
          title: "Community",
        }}
      />
      <Tabs.Screen
        name="voice-assistant"
        options={{
          title: "Voice AI",
        }}
      />
    </Tabs>
  );
}