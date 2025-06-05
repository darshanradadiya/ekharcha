import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { TriangleAlert as AlertTriangle, TrendingUp, CircleCheck as CheckCircle } from 'lucide-react-native';
import { Budget } from '../../types/types';

interface BudgetCategoryListProps {
  budgets: Budget[];
}

const BudgetCategoryList = ({ budgets }: BudgetCategoryListProps) => {
  const renderBudgetItem = ({ item }: { item: Budget }) => {
    const percentage = Math.round((item.spent / item.budgeted) * 100);
    const isOverBudget = item.spent > item.budgeted;
    
    const getBadgeIcon = () => {
      switch (item.status) {
        case 'over-budget':
          return <AlertTriangle size={14} color="#FFFFFF" />;
        case 'warning':
          return <AlertTriangle size={14} color="#FFFFFF" />;
        case 'under-budget':
          return <TrendingUp size={14} color="#FFFFFF" />;
        case 'on-track':
        default:
          return <CheckCircle size={14} color="#FFFFFF" />;
      }
    };
    
    const getBadgeStyle = () => {
      switch (item.status) {
        case 'over-budget':
          return styles.badgeOverBudget;
        case 'warning':
          return styles.badgeWarning;
        case 'under-budget':
          return styles.badgeUnderBudget;
        case 'on-track':
        default:
          return styles.badgeOnTrack;
      }
    };
    
    const getBadgeText = () => {
      switch (item.status) {
        case 'over-budget':
          return 'Over budget';
        case 'warning':
          return 'Near limit';
        case 'under-budget':
          return 'Under budget';
        case 'on-track':
        default:
          return 'On track';
      }
    };
    
    return (
      <View style={styles.budgetItem}>
        <View style={styles.budgetHeader}>
          <Text style={styles.categoryName}>{item.category}</Text>
          <View style={[styles.badge, getBadgeStyle()]}>
            {getBadgeIcon()}
            <Text style={styles.badgeText}>{getBadgeText()}</Text>
          </View>
        </View>
        
        <View style={styles.budgetDetails}>
          <View style={styles.amountsContainer}>
            <Text style={styles.spentAmount}>${item.spent.toFixed(2)}</Text>
            <Text style={styles.budgetedAmount}> / ${item.budgeted.toFixed(2)}</Text>
          </View>
          
          <Text style={styles.percentageText}>{percentage}%</Text>
        </View>
        
        <View style={styles.progressBarContainer}>
          <View 
            style={[
              styles.progressBar, 
              isOverBudget ? styles.progressBarOver : { width: `${percentage}%` },
              { backgroundColor: item.color }
            ]} 
          />
        </View>
      </View>
    );
  };
  
  return (
    <View style={styles.container}>
      <FlatList
        data={budgets}
        renderItem={renderBudgetItem}
        keyExtractor={(item) => item.category}
        scrollEnabled={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginBottom: 24,
  },
  budgetItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  budgetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0F172A',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  badgeOverBudget: {
    backgroundColor: '#EF4444',
  },
  badgeWarning: {
    backgroundColor: '#F59E0B',
  },
  badgeUnderBudget: {
    backgroundColor: '#10B981',
  },
  badgeOnTrack: {
    backgroundColor: '#3B82F6',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 4,
  },
  budgetDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  amountsContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  spentAmount: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
  },
  budgetedAmount: {
    fontSize: 14,
    color: '#64748B',
  },
  percentageText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#64748B',
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: '#F1F5F9',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
  },
  progressBarOver: {
    width: '100%',
    backgroundColor: '#EF4444',
  },
});

export default BudgetCategoryList;