import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Button,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AddBudgetModal from "../../components/budgets/AddBudgetModal";
import BudgetCategoryList from "../../components/budgets/BudgetCategorylist";
import BudgetSummary from "../../components/budgets/Budgetsummry";
import { Budget } from "../../types/types";
import { getBudgets } from "../../utils/budgetApi";
export default function BudgetsScreen() {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showAdd, setShowAdd] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    setRefreshing(true);
    await fetchBudgets();
    setRefreshing(false);
  };

  useEffect(() => {
    fetchBudgets();
  }, []);

  const fetchBudgets = async () => {
    try {
      setLoading(true);
      const data = await getBudgets();
      setBudgets(data);
    } catch (err) {
      console.error("Failed to fetch budgets:", err);
    } finally {
      setLoading(false);
    }
  };

  const totalBudgeted = budgets.reduce((sum, b) => sum + b.budgeted, 0);
  const totalSpent = budgets.reduce((sum, b) => sum + b.spent, 0);
  const remaining = totalBudgeted - totalSpent;
  const percentUsed =
    totalBudgeted > 0 ? Math.round((totalSpent / totalBudgeted) * 100) : 0;

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#3B82F6"]}
            tintColor="#3B82F6"
          />
        }
      >
        <View style={styles.header}>
          <Text style={styles.monthTitle}>
            {new Date().toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </Text>
          <Text style={styles.subtitle}>Budget Overview</Text>
        </View>

        <BudgetSummary
          totalBudgeted={totalBudgeted}
          totalSpent={totalSpent}
          remaining={remaining}
          percentUsed={percentUsed}
        />

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Budget Categories</Text>
          <Button title="Add Budget" onPress={() => setShowAdd(true)} />
        </View>

        {loading ? (
          <Text
            style={{ textAlign: "center", marginTop: 20, color: "#64748B" }}
          >
            Loading budgets...
          </Text>
        ) : budgets.length === 0 ? (
          <Text
            style={{ textAlign: "center", marginTop: 20, color: "#64748B" }}
          >
            No budgets found.
          </Text>
        ) : (
          <BudgetCategoryList budgets={budgets} onSpentAdded={fetchBudgets} />
        )}
      </ScrollView>
      <AddBudgetModal
        visible={showAdd}
        onClose={() => setShowAdd(false)}
        onCreated={fetchBudgets}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  monthTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#0F172A",
  },
  subtitle: {
    fontSize: 14,
    color: "#64748B",
    marginTop: 4,
  },
  sectionHeader: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#0F172A",
  },
});
