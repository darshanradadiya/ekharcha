import {
  CircleArrowDown as ArrowDownCircle,
  CircleArrowUp as ArrowUpCircle,
  PiggyBank,
  Wallet,
} from "lucide-react-native";
import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";

const { width } = Dimensions.get("window");
const isSmallScreen = width < 380;

type Props = {
  totalBalance: number;
  assetsBalance: number;
  liabilitiesBalance: number;
  totalIncome: number;
  totalExpense: number;
  balance: number;
};

const DashboardCards: React.FC<Props> = ({
  totalBalance,
  assetsBalance,
  liabilitiesBalance,
  totalIncome,
  totalExpense,
  balance,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={[styles.card, styles.balanceCard]}>
          <View style={styles.cardHeader}>
            <Wallet size={24} color="#FFFFFF" />
            <Text style={styles.cardTitle}>Total Balance</Text>
          </View>
          <Text style={styles.balanceAmount}>${totalBalance.toFixed(2)}</Text>
        </View>
        <View style={[styles.card, styles.incomeCard]}>
          <View style={styles.cardHeader}>
            <ArrowUpCircle size={24} color="#FFFFFF" />
            <Text style={styles.cardTitle}>Income</Text>
          </View>
          <Text style={styles.cardAmount}>${totalIncome.toFixed(2)}</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={[styles.card, styles.expenseCard]}>
          <View style={styles.cardHeader}>
            <ArrowDownCircle size={24} color="#FFFFFF" />
            <Text style={styles.cardTitle}>Expenses</Text>
          </View>
          <Text style={styles.cardAmount}>${totalExpense.toFixed(2)}</Text>
        </View>
        <View style={[styles.card, styles.savingsCard]}>
          <View style={styles.cardHeader}>
            <PiggyBank size={24} color="#FFFFFF" />
            <Text style={styles.cardTitle}>Liabilities</Text>
          </View>
          <Text style={styles.cardAmount}>
            ${liabilitiesBalance.toFixed(2)}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  row: { flexDirection: "row", marginBottom: 16 },
  card: {
    flex: 1,
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
    height: isSmallScreen ? 130 : 150,
  },
  balanceCard: { marginRight: 8, backgroundColor: "#3B82F6" },
  incomeCard: { marginLeft: 8, backgroundColor: "#10B981" },
  expenseCard: { marginRight: 8, backgroundColor: "#EF4444" },
  savingsCard: { marginLeft: 8, backgroundColor: "#8B5CF6" },
  cardHeader: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
  cardTitle: {
    color: "#FFFFFF",
    marginLeft: 8,
    fontSize: 14,
    fontWeight: "500",
  },
  balanceAmount: {
    color: "#FFFFFF",
    fontSize: isSmallScreen ? 22 : 24,
    fontWeight: "700",
    marginBottom: 8,
  },
  cardAmount: {
    color: "#FFFFFF",
    fontSize: isSmallScreen ? 20 : 22,
    fontWeight: "700",
    marginBottom: 8,
  },
});

export default DashboardCards;
