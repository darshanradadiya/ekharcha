import { Tabs } from "expo-router";
import {
  ChartLine as LineChart,
  ListOrdered,
  ChartPie as PieChart,
  Wallet,
} from "lucide-react-native";
import { Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#3B82F6",
        tabBarInactiveTintColor: "#64748B",
        tabBarStyle: {
          height: Platform.OS === "ios" ? 88 : 60,
          paddingBottom: Platform.OS === "ios" ? 28 : 8,
          paddingTop: 8,
          backgroundColor: "#FFFFFF",
          borderTopWidth: 1,
          borderTopColor: "#E2E8F0",
          ...Platform.select({
            web: {
              height: 60,
              paddingBottom: 8,
            },
          }),
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "500",
        },
        headerStyle: {
          backgroundColor: "#FFFFFF",
          height: 60 + insets.top,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.05,
          shadowRadius: 2,
          elevation: 3,
        },
        headerTitleStyle: {
          fontSize: 18,
          fontWeight: "600",
          color: "#0F172A",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "index",
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <PieChart size={size} color={color} />
          ),
          headerTitle: "Finance Dashboard",
        }}
      />
      <Tabs.Screen
        name="budget"
        options={{
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <PieChart size={size} color={color} />
          ),
          tabBarLabel: "Budget",
        }}
      />
      <Tabs.Screen
        name="transactions"
        options={{
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <ListOrdered size={size} color={color} />
          ),
          tabBarLabel: "Transactions",
        }}
      />
      <Tabs.Screen
        name="accounts"
        options={{
          title: "Accounts",
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <Wallet size={size} color={color} />
          ),
          headerTitle: "Accounts Overview",
        }}
      />
      <Tabs.Screen
        name="reports"
        options={{
          title: "Reports",
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <LineChart size={size} color={color} />
          ),
          headerTitle: "Financial Reports",
        }}
      />
    </Tabs>
  );
}