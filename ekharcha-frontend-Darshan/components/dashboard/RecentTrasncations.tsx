import { useRouter } from "expo-router";
import { ChevronRight } from "lucide-react-native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import TransactionItem from "../../components/transcations/TransactionItem";

type Props = {
  recentTransactions: any[];
};

const RecentTransactions: React.FC<Props> = ({ recentTransactions }) => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Recent Transactions</Text>
        <TouchableOpacity
          style={styles.viewAllButton}
          onPress={() => router.push("/(tabs)/transactions")}
        >
          <Text style={styles.viewAllText}>View All</Text>
          <ChevronRight size={16} color="#3B82F6" />
        </TouchableOpacity>
      </View>
      {recentTransactions.length === 0 ? (
        <Text
          style={{ textAlign: "center", color: "#64748B", marginBottom: 16 }}
        >
          No transactions found.
        </Text>
      ) : (
        recentTransactions.map((transaction) => (
          <TransactionItem
            key={transaction._id || transaction.id}
            transaction={transaction}
          />
        ))
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginBottom: 24,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#0F172A",
  },
  viewAllButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  viewAllText: {
    color: "#3B82F6",
    fontSize: 14,
    fontWeight: "500",
    marginRight: 4,
  },
});

export default RecentTransactions;
