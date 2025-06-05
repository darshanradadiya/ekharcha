import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { CircleArrowUp as ArrowUpCircle, CircleArrowDown as ArrowDownCircle, MoveVertical as MoreVertical } from 'lucide-react-native';
import { Transaction } from '../../types/types';

interface TransactionItemProps {
  transaction: Transaction;
}

const TransactionItem = ({ transaction }: TransactionItemProps) => {
  const { description, amount, category, date, type } = transaction;
  
  const isIncome = type === 'income';
  
  return (
    <View style={styles.container}>
      <View style={styles.leftContent}>
        <View style={[
          styles.iconContainer, 
          isIncome ? styles.incomeIconContainer : styles.expenseIconContainer
        ]}>
          {isIncome ? (
            <ArrowUpCircle size={20} color="#FFFFFF" />
          ) : (
            <ArrowDownCircle size={20} color="#FFFFFF" />
          )}
        </View>
        
        <View style={styles.details}>
          <Text style={styles.description}>{description}</Text>
          <View style={styles.metaContainer}>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>{category}</Text>
            </View>
            <Text style={styles.date}>{date}</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.rightContent}>
        <Text style={[
          styles.amount,
          isIncome ? styles.incomeAmount : styles.expenseAmount
        ]}>
          {isIncome ? '+' : '-'}${Math.abs(amount).toFixed(2)}
        </Text>
        
        <TouchableOpacity style={styles.moreButton}>
          <MoreVertical size={16} color="#64748B" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  incomeIconContainer: {
    backgroundColor: '#10B981',
  },
  expenseIconContainer: {
    backgroundColor: '#EF4444',
  },
  details: {
    flex: 1,
  },
  description: {
    fontSize: 16,
    fontWeight: '500',
    color: '#0F172A',
    marginBottom: 4,
  },
  metaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryBadge: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginRight: 8,
  },
  categoryText: {
    fontSize: 12,
    color: '#64748B',
  },
  date: {
    fontSize: 12,
    color: '#94A3B8',
  },
  rightContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  amount: {
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
  incomeAmount: {
    color: '#10B981',
  },
  expenseAmount: {
    color: '#EF4444',
  },
  moreButton: {
    padding: 4,
  },
});

export default TransactionItem;