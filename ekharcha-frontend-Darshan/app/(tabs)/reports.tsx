import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import CategoryBreakdown from '../../components/reports/CategoryBreakdown';
import IncomeExpenseChart from '../../components/reports/IncomeExpenseChar';
import SpendingTrend from '../../components/reports/SpendingTrend';
import { mockMonthlyData } from '../../data/mockdata';

type Period = '1M' | '3M' | '6M' | '1Y' | 'ALL';

export default function ReportsScreen() {
  const [period, setPeriod] = useState<Period>('3M');
  
  const periods: Period[] = ['1M', '3M', '6M', '1Y', 'ALL'];
  
  // Filter data based on selected period
  const getFilteredData = () => {
    switch(period) {
      case '1M':
        return mockMonthlyData.slice(0, 1);
      case '3M':
        return mockMonthlyData.slice(0, 3);
      case '6M':
        return mockMonthlyData.slice(0, 6);
      case '1Y':
        return mockMonthlyData.slice(0, 12);
      case 'ALL':
      default:
        return mockMonthlyData;
    }
  };
  
  const filteredData = getFilteredData();
  
  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>Financial Reports</Text>
          <View style={styles.periodSelector}>
            {periods.map((p) => (
              <TouchableOpacity
                key={p}
                style={[styles.periodButton, period === p && styles.activePeriodButton]}
                onPress={() => setPeriod(p)}
              >
                <Text 
                  style={[styles.periodButtonText, period === p && styles.activePeriodButtonText]}
                >
                  {p}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        
        <IncomeExpenseChart data={filteredData} />
        <CategoryBreakdown />
        <SpendingTrend data={filteredData} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#0F172A',
    marginBottom: 16,
  },
  periodSelector: {
    flexDirection: 'row',
    backgroundColor: '#E2E8F0',
    borderRadius: 8,
    padding: 4,
  },
  periodButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 6,
  },
  activePeriodButton: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  periodButtonText: {
    color: '#64748B',
    fontWeight: '500',
    fontSize: 14,
  },
  activePeriodButtonText: {
    color: '#0F172A',
  },
});