import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import BudgetCategoryList from '../../components/budgets/BudgetCategorylist';
import BudgetSummary from '../../components/budgets/Budgetsummry';
import { mockBudgets } from '../../data/mockdata';

export default function BudgetsScreen() {
  // Calculate budget totals
  const totalBudgeted = mockBudgets.reduce((sum, budget) => sum + budget.budgeted, 0);
  const totalSpent = mockBudgets.reduce((sum, budget) => sum + budget.spent, 0);
  const remaining = totalBudgeted - totalSpent;
  const percentUsed = Math.round((totalSpent / totalBudgeted) * 100);

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.monthTitle}>
            {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
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
        </View>
        
        <BudgetCategoryList budgets={mockBudgets} />
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
  monthTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#0F172A',
  },
  subtitle: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 4,
  },
  sectionHeader: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0F172A',
  },
});