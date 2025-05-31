import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { useState, useEffect } from 'react';

export default function AnalyticsScreen() {
  const [categoryData, setCategoryData] = useState([
    {
      name: 'Food',
      amount: 250,
      color: '#6366F1',
      legendFontColor: '#374151',
    },
    {
      name: 'Transport',
      amount: 150,
      color: '#8B5CF6',
      legendFontColor: '#374151',
    },
    {
      name: 'Shopping',
      amount: 200,
      color: '#EC4899',
      legendFontColor: '#374151',
    },
  ]);

  useEffect(() => {
    // Fetch category-wise data from your API
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Analytics</Text>
      </View>

      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Expenses by Category</Text>
        <PieChart
          data={categoryData}
          width={350}
          height={220}
          chartConfig={{
            color: (opacity = 1) => `rgba(99, 102, 241, ${opacity})`,
          }}
          accessor="amount"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
        />
      </View>

      <View style={styles.statsContainer}>
        {categoryData.map((category) => (
          <View key={category.name} style={styles.statCard}>
            <View style={[styles.statIndicator, { backgroundColor: category.color }]} />
            <View style={styles.statInfo}>
              <Text style={styles.statLabel}>{category.name}</Text>
              <Text style={styles.statValue}>${category.amount}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    padding: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontFamily: 'Inter_600SemiBold',
    color: '#111827',
  },
  chartContainer: {
    margin: 16,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 16,
    alignItems: 'center',
  },
  chartTitle: {
    fontSize: 18,
    fontFamily: 'Inter_600SemiBold',
    color: '#111827',
    marginBottom: 16,
  },
  statsContainer: {
    padding: 16,
  },
  statCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 12,
  },
  statIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
  },
  statInfo: {
    flex: 1,
  },
  statLabel: {
    fontSize: 16,
    fontFamily: 'Inter_500Medium',
    color: '#374151',
  },
  statValue: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#6B7280',
    marginTop: 4,
  },
});