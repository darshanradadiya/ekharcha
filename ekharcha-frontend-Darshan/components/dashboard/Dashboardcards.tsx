import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { CircleArrowUp as ArrowUpCircle, CircleArrowDown as ArrowDownCircle, Wallet, PiggyBank } from 'lucide-react-native';

// Get device width for responsive layout
const { width } = Dimensions.get('window');
const isSmallScreen = width < 380;

const DashboardCards = () => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={[styles.card, styles.balanceCard]}>
          <View style={styles.cardHeader}>
            <Wallet size={24} color="#FFFFFF" />
            <Text style={styles.cardTitle}>Total Balance</Text>
          </View>
          <Text style={styles.balanceAmount}>$12,540.33</Text>
          <View style={styles.changeContainer}>
            <Text style={styles.changeText}>+2.4% from last month</Text>
          </View>
        </View>
        
        <View style={[styles.card, styles.incomeCard]}>
          <View style={styles.cardHeader}>
            <ArrowUpCircle size={24} color="#FFFFFF" />
            <Text style={styles.cardTitle}>Income</Text>
          </View>
          <Text style={styles.cardAmount}>$3,280.00</Text>
          <Text style={styles.cardPeriod}>This Month</Text>
        </View>
      </View>
      
      <View style={styles.row}>
        <View style={[styles.card, styles.expenseCard]}>
          <View style={styles.cardHeader}>
            <ArrowDownCircle size={24} color="#FFFFFF" />
            <Text style={styles.cardTitle}>Expenses</Text>
          </View>
          <Text style={styles.cardAmount}>$1,950.40</Text>
          <Text style={styles.cardPeriod}>This Month</Text>
        </View>
        
        <View style={[styles.card, styles.savingsCard]}>
          <View style={styles.cardHeader}>
            <PiggyBank size={24} color="#FFFFFF" />
            <Text style={styles.cardTitle}>Savings Goal</Text>
          </View>
          <Text style={styles.cardAmount}>$5,000.00</Text>
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: '65%' }]} />
            </View>
            <Text style={styles.progressText}>65%</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  card: {
    flex: 1,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
    height: isSmallScreen ? 130 : 150,
  },
  balanceCard: {
    marginRight: 8,
    backgroundColor: '#3B82F6',
  },
  incomeCard: {
    marginLeft: 8,
    backgroundColor: '#10B981',
  },
  expenseCard: {
    marginRight: 8,
    backgroundColor: '#EF4444',
  },
  savingsCard: {
    marginLeft: 8,
    backgroundColor: '#8B5CF6',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    color: '#FFFFFF',
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '500',
  },
  balanceAmount: {
    color: '#FFFFFF',
    fontSize: isSmallScreen ? 22 : 24,
    fontWeight: '700',
    marginBottom: 8,
  },
  cardAmount: {
    color: '#FFFFFF',
    fontSize: isSmallScreen ? 20 : 22,
    fontWeight: '700',
    marginBottom: 8,
  },
  cardPeriod: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
  },
  changeContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignSelf: 'flex-start',
  },
  changeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 3,
    marginRight: 8,
  },
  progressFill: {
    height: 6,
    backgroundColor: '#FFFFFF',
    borderRadius: 3,
  },
  progressText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
  },
});

export default DashboardCards;