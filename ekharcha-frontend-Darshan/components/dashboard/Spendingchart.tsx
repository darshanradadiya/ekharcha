import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

// Placeholder for chart - in a real app, you would use a charting library
// compatible with React Native, such as react-native-chart-kit or Victory Native
const SpendingChart = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Spending Overview</Text>
      
      <View style={styles.chartPlaceholder}>
        <View style={styles.barContainer}>
          {/* Placeholder bars for chart */}
          <View style={styles.barGroup}>
            <View style={[styles.bar, styles.expenseBar, { height: 120 }]} />
            <View style={[styles.bar, styles.incomeBar, { height: 150 }]} />
            <Text style={styles.barLabel}>Jan</Text>
          </View>
          <View style={styles.barGroup}>
            <View style={[styles.bar, styles.expenseBar, { height: 100 }]} />
            <View style={[styles.bar, styles.incomeBar, { height: 130 }]} />
            <Text style={styles.barLabel}>Feb</Text>
          </View>
          <View style={styles.barGroup}>
            <View style={[styles.bar, styles.expenseBar, { height: 80 }]} />
            <View style={[styles.bar, styles.incomeBar, { height: 140 }]} />
            <Text style={styles.barLabel}>Mar</Text>
          </View>
          <View style={styles.barGroup}>
            <View style={[styles.bar, styles.expenseBar, { height: 150 }]} />
            <View style={[styles.bar, styles.incomeBar, { height: 120 }]} />
            <Text style={styles.barLabel}>Apr</Text>
          </View>
          <View style={styles.barGroup}>
            <View style={[styles.bar, styles.expenseBar, { height: 90 }]} />
            <View style={[styles.bar, styles.incomeBar, { height: 160 }]} />
            <Text style={styles.barLabel}>May</Text>
          </View>
          <View style={styles.barGroup}>
            <View style={[styles.bar, styles.expenseBar, { height: 110 }]} />
            <View style={[styles.bar, styles.incomeBar, { height: 140 }]} />
            <Text style={styles.barLabel}>Jun</Text>
          </View>
        </View>
        
        <View style={styles.legendContainer}>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: '#10B981' }]} />
            <Text style={styles.legendText}>Income</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: '#EF4444' }]} />
            <Text style={styles.legendText}>Expenses</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginBottom: 24,
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0F172A',
    marginBottom: 16,
  },
  chartPlaceholder: {
    height: 250,
  },
  barContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 300,
    paddingBottom: 20,
  },
  barGroup: {
    alignItems: 'center',
    width: 40,
  },
  bar: {
    width: 10,
    borderRadius: 7,
    marginHorizontal: 2 ,
    backgroundColor: '#E5E7EB', // Default color for bars
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    borderWidth: 1,
    borderColor: '#E5E7EB', // Default border color
    marginBottom: 4,
  },
  incomeBar: {
    backgroundColor: '#10B981',
  },
  expenseBar: {
    backgroundColor: '#EF4444',
  },
  barLabel: {
    marginTop: 8,
    fontSize: 12,
    color: '#64748B',
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  legendText: {
    fontSize: 14,
    color: '#64748B',
  },
});

export default SpendingChart;