import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface BudgetSummaryProps {
  totalBudgeted: number;
  totalSpent: number;
  remaining: number;
  percentUsed: number;
}

const BudgetSummary = ({ totalBudgeted, totalSpent, remaining, percentUsed }: BudgetSummaryProps) => {
  const isOverBudget = remaining < 0;
  
  return (
    <View style={styles.container}>
      <View style={styles.progressContainer}>
        <View style={styles.progressCircleContainer}>
          <View style={styles.progressCircleBackground}>
            <View 
              style={[
                styles.progressCircle, 
                { 
                  borderColor: isOverBudget ? '#EF4444' : '#3B82F6',
                  // This is a simplified way to show progress in a circle
                  width: `${Math.min(percentUsed, 100)}%`,
                }
              ]} 
            />
          </View>
          <View style={styles.progressTextContainer}>
            <Text style={styles.progressPercentage}>{percentUsed}%</Text>
            <Text style={styles.progressLabel}>Used</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.summaryCards}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Total Budgeted</Text>
          <Text style={styles.summaryAmount}>${totalBudgeted.toFixed(2)}</Text>
        </View>
        
        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Total Spent</Text>
          <Text style={styles.summaryAmount}>${totalSpent.toFixed(2)}</Text>
        </View>
        
        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Remaining</Text>
          <Text style={[
            styles.summaryAmount, 
            isOverBudget ? styles.negativeAmount : styles.positiveAmount
          ]}>
            ${Math.abs(remaining).toFixed(2)}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginTop: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  progressContainer: {
    alignItems: 'center',
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  progressCircleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressCircleBackground: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 12,
    borderColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  progressCircle: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    borderWidth: 12,
    height: '100%',
  },
  progressTextContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressPercentage: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0F172A',
  },
  progressLabel: {
    fontSize: 14,
    color: '#64748B',
  },
  summaryCards: {
    flexDirection: 'row',
  },
  summaryCard: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: '#F1F5F9',
  },
  summaryLabel: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 4,
  },
  summaryAmount: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0F172A',
  },
  positiveAmount: {
    color: '#10B981',
  },
  negativeAmount: {
    color: '#EF4444',
  },
});

export default BudgetSummary;