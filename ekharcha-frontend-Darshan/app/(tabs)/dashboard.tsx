import { router } from "expo-router";
import { Plus } from "lucide-react-native";
import React, { useEffect, useState, useCallback } from "react";
import {
  ActivityIndicator,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  RefreshControl,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DashboardCards from "../../components/dashboard/Dashboardcards";
import RecentTransactions from "../../components/dashboard/RecentTrasncations";
import SpendingChart from "../../components/dashboard/Spendingchart";
import AddTransactionModal from "../../components/transcations/AddTransactionModal";
import { useAuthStore } from "../../store/auth";
import { getDashboardSummary } from "../../utils/dashboard";

export default function DashboardScreen() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchSummary();
    setRefreshing(false);
  }, []);
  const [summary, setSummary] = useState<{
    totalIncome: number;
    totalExpense: number;
    balance: number;
    recentTransactions: any[];
    totalBalance: number;
    assetsBalance: number;
    liabilitiesBalance: number;
  } | null>(null);
  const { logout } = useAuthStore();

  const fetchSummary = async () => {
    setLoading(true);
    try {
      const data = await getDashboardSummary();
      setSummary(data);
    } catch {
      setSummary(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, []);

  const handleLogout = async () => {
    await logout();
    router.replace("/(auth)/login");
  };

  // ...existing imports...

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#3B82F6"]}
          />
        }
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
      >
        {/* Header with greeting and logout */}
        <View style={styles.headerRow}>
          <Text style={styles.greeting}>Welcome back!</Text>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.date}>{new Date().toLocaleDateString()}</Text>
        {loading || !summary ? (
          <ActivityIndicator
            size="large"
            color="#3B82F6"
            style={{ marginTop: 40 }}
          />
        ) : (
          <>
            <DashboardCards
              totalBalance={summary.totalBalance}
              assetsBalance={summary.assetsBalance}
              liabilitiesBalance={summary.liabilitiesBalance}
              totalIncome={summary.totalIncome}
              totalExpense={summary.totalExpense}
              balance={summary.balance}
            />
            <SpendingChart recentTransactions={summary.recentTransactions} />
            <RecentTransactions
              recentTransactions={summary.recentTransactions}
            />
          </>
        )}
      </ScrollView>
      <TouchableOpacity
        style={styles.fab}
        onPress={() => setShowAddModal(true)}
        activeOpacity={0.9}
      >
        <Plus color="#FFFFFF" size={24} />
      </TouchableOpacity>
      <AddTransactionModal
        visible={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdded={fetchSummary}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    position: "relative",
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 100,
    paddingTop: 24,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 4,
  },
  greeting: {
    fontSize: 20,
    fontWeight: "600",
    color: "#0F172A",
  },
  date: {
    fontSize: 14,
    color: "#64748B",
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  fab: {
    position: "absolute",
    bottom: Platform.OS === "web" ? 24 : 32,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#3B82F6",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 10,
  },
  logoutButton: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    backgroundColor: "#fff",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  logoutText: {
    color: "#3B82F6",
    fontWeight: "bold",
    fontSize: 15,
  },
});
