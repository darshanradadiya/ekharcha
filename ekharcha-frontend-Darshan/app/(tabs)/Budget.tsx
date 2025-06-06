import React, { useEffect, useState } from "react";
import {
  Button,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AddBudgetModal from "../../components/budgets/AddBudgetModal";
import BudgetCategoryList from "../../components/budgets/BudgetCategorylist";
import BudgetSummary from "../../components/budgets/Budgetsummry";
import EditBudgetModal from "../../components/budgets/EditBudgetModal";
import EditSpentModal from "../../components/budgets/EditSpentModel";
import { Budget } from "../../types/types";
import { getBudgets } from "../../utils/budgetApi";

export default function BudgetsScreen() {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showAdd, setShowAdd] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState<Budget | null>(null);
  const [showEditSpent, setShowEditSpent] = useState(false);
  const [selectedSpentBudget, setSelectedSpentBudget] = useState<Budget | null>(
    null
  );

  const fetchBudgets = async () => {
    setLoading(true);
    try {
      const data = await getBudgets();
      setBudgets(data ?? []);
    } catch (err) {
      setBudgets([]);
      console.error("Failed to fetch budgets:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBudgets();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchBudgets();
    setRefreshing(false);
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
            colors={["#2563EB"]}
            tintColor="#2563EB"
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
          <Text style={styles.subtitle}>Overview of your monthly budget</Text>
        </View>

        <BudgetSummary
          totalBudgeted={totalBudgeted}
          totalSpent={totalSpent}
          remaining={remaining}
          percentUsed={percentUsed}
        />

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <Button
            title="Add"
            color="#2563EB"
            onPress={() => setShowAdd(true)}
          />
        </View>

        {loading ? (
          <Text style={styles.loadingText}>Loading budgets...</Text>
        ) : budgets.length === 0 ? (
          <Text style={styles.loadingText}>No budgets found.</Text>
        ) : (
          <BudgetCategoryList
            budgets={budgets}
            onSpentAdded={fetchBudgets}
            onEdit={(budget) => {
              setSelectedBudget(budget);
              setShowEdit(true);
            }}
            onEditSpent={(budget) => {
              setSelectedSpentBudget(budget);
              setShowEditSpent(true);
            }}
          />
        )}
      </ScrollView>

      <AddBudgetModal
        visible={showAdd}
        onClose={() => setShowAdd(false)}
        onCreated={fetchBudgets}
      />

      {selectedBudget && (
        <EditBudgetModal
          visible={showEdit}
          budget={selectedBudget}
          onClose={() => setShowEdit(false)}
          onUpdated={() => {
            setShowEdit(false);
            setSelectedBudget(null);
            fetchBudgets();
          }}
        />
      )}

      {selectedSpentBudget && (
        <EditSpentModal
          visible={showEditSpent}
          budget={selectedSpentBudget}
          onClose={() => setShowEditSpent(false)}
          onUpdated={() => {
            setShowEditSpent(false);
            setSelectedSpentBudget(null);
            fetchBudgets();
          }}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1F5F9",
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 12,
  },
  monthTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1E293B",
  },
  subtitle: {
    fontSize: 15,
    color: "#475569",
    marginTop: 6,
  },
  sectionHeader: {
    paddingHorizontal: 20,
    paddingTop: 28,
    paddingBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1E293B",
  },
  loadingText: {
    textAlign: "center",
    marginTop: 24,
    color: "#94A3B8",
    fontSize: 14,
  },
});
