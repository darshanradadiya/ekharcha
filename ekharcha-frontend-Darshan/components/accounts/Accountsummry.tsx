import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface AccountSummaryProps {
  totalBalance: number;
  assetsBalance: number;
  liabilitiesBalance: number;
}

const AccountSummary = ({ totalBalance, assetsBalance, liabilitiesBalance }: AccountSummaryProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.totalBalanceContainer}>
        <Text style={styles.totalBalanceLabel}>Net Worth</Text>
        <Text style={styles.totalBalanceAmount}>${totalBalance.toFixed(2)}</Text>
      </View>
      
      <View style={styles.summaryContainer}>
        <View style={styles.summaryItem}>
          <View style={[styles.indicator, styles.assetsIndicator]} />
          <View style={styles.summaryContent}>
            <Text style={styles.summaryLabel}>Assets</Text>
            <Text style={styles.summaryAmount}>${assetsBalance.toFixed(2)}</Text>
          </View>
        </View>
        
        <View style={styles.divider} />
        
        <View style={styles.summaryItem}>
          <View style={[styles.indicator, styles.liabilitiesIndicator]} />
          <View style={styles.summaryContent}>
            <Text style={styles.summaryLabel}>Liabilities</Text>
            <Text style={styles.summaryAmount}>${liabilitiesBalance.toFixed(2)}</Text>
          </View>
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
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  totalBalanceContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    alignItems: 'center',
  },
  totalBalanceLabel: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 4,
  },
  totalBalanceAmount: {
    fontSize: 28,
    fontWeight: '700',
    color: '#0F172A',
  },
  summaryContainer: {
    flexDirection: 'row',
  },
  summaryItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  indicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
  },
  assetsIndicator: {
    backgroundColor: '#10B981',
  },
  liabilitiesIndicator: {
    backgroundColor: '#EF4444',
  },
  summaryContent: {
    flex: 1,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 4,
  },
  summaryAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0F172A',
  },
  divider: {
    width: 1,
    backgroundColor: '#F1F5F9',
  },
});

export default AccountSummary;