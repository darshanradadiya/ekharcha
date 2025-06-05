import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { BarChart } from "react-native-chart-kit";

type Props = {
  recentTransactions: any[];
};

const SpendingChart: React.FC<Props> = ({ recentTransactions }) => {
  // Group expenses by category
  const categoryTotals: { [category: string]: number } = {};
  recentTransactions.forEach((txn) => {
    if (txn.type === "expense") {
      const cat = txn.category || "Other";
      categoryTotals[cat] = (categoryTotals[cat] || 0) + txn.amount;
    }
  });
  const labels = Object.keys(categoryTotals);
  const data = Object.values(categoryTotals);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Spending Overview</Text>
      {data.length === 0 ? (
        <Text style={{ color: "#64748B", textAlign: "center" }}>
          No expense data for chart.
        </Text>
      ) : (
        <BarChart
          data={{
            labels,
            datasets: [{ data }],
          }}
          width={Dimensions.get("window").width - 48}
          height={180}
          fromZero
          yAxisLabel=""
          yAxisSuffix=""
          chartConfig={{
            backgroundColor: "#fff",
            backgroundGradientFrom: "#fff",
            backgroundGradientTo: "#fff",
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`,
            labelColor: () => "#64748B",
            style: { borderRadius: 16 },
          }}
          style={{ borderRadius: 16 }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginBottom: 24,
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#0F172A",
    marginBottom: 16,
  },
});

export default SpendingChart;
