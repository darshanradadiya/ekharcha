import { MonthlyData } from '../../types/types';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface IncomeExpenseChartProps {
  data: MonthlyData[];
}

const IncomeExpenseChart = ({ data }: IncomeExpenseChartProps) => {
  // Find max value for scaling
  const maxValue = Math.max(
    ...data.map(item => Math.max(item.income, item.expenses))
  );
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Income vs Expenses</Text>
      
      <View style={styles.chartContainer}>
        {data.map((item, index) => (
          <View key={index} style={styles.barGroup}>
            <View style={styles.barContainer}>
              <View style={styles.barLabelsContainer}>
                <Text style={styles.barValue}>${item.income}</Text>
                <Text style={styles.barValue}>${item.expenses}</Text>
              </View>
              
              <View style={styles.barsContainer}>
                <View 
                  style={[
                    styles.bar, 
                    styles.incomeBar, 
                    { height: (item.income / maxValue) * 150 }
                  ]} 
                />
                <View 
                  style={[
                    styles.bar, 
                    styles.expenseBar, 
                    { height: (item.expenses / maxValue) * 150 }
                  ]} 
                />
              </View>
              
              <Text style={styles.monthLabel}>{item.month}</Text>
            </View>
          </View>
        ))}
      </View>
      
      <View style={styles.legendContainer}>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, styles.incomeLegend]} />
          <Text style={styles.legendText}>Income</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, styles.expenseLegend]} />
          <Text style={styles.legendText}>Expenses</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 16,
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0F172A',
    marginBottom: 16,
  },
  chartContainer: {
    flexDirection: 'row',
    height: 200,
    alignItems: 'flex-end',
  },
  barGroup: {
    flex: 1,
    alignItems: 'center',
  },
  barContainer: {
    alignItems: 'center',
    width: '100%',
  },
  barLabelsContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    zIndex: 1,
  },
  barValue: {
    fontSize: 10,
    color: '#64748B',
    textAlign: 'center',
  },
  barsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 150,
    marginTop: 20,
  },
  bar: {
    width: 8,
    marginHorizontal: 2,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  incomeBar: {
    backgroundColor: '#10B981',
  },
  expenseBar: {
    backgroundColor: '#EF4444',
  },
  monthLabel: {
    marginTop: 8,
    fontSize: 12,
    color: '#64748B',
    textAlign: 'center',
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 12,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  incomeLegend: {
    backgroundColor: '#10B981',
  },
  expenseLegend: {
    backgroundColor: '#EF4444',
  },
  legendText: {
    fontSize: 14,
    color: '#64748B',
  },
});

export default IncomeExpenseChart;