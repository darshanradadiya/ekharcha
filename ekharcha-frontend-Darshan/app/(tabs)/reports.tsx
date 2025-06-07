import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import CategoryBreakdown from '../../components/reports/CategoryBreakdown';
import IncomeExpenseChart from '../../components/reports/IncomeExpenseChar';
import SpendingTrend from '../../components/reports/SpendingTrend';
import { getCategoryBreakdown, getMonthlyReport } from '../../utils/reports';

type Period = '1M' | '3M' | '6M' | '1Y' | 'ALL';

export default function ReportsScreen() {
  const [period, setPeriod] = useState<Period>('3M');
  const [monthlyData, setMonthlyData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const periods: Period[] = ['1M', '3M', '6M', '1Y', 'ALL'];

  const fetchData = async (selectedPeriod = period) => {
    setLoading(true);
    try {
      const [monthly, category] = await Promise.all([
        getMonthlyReport(selectedPeriod),
        getCategoryBreakdown(selectedPeriod),
      ]);
      console.log('Monthly Data:', monthly);
      console.log('Category Data:', category);
      setMonthlyData(monthly);
      setCategoryData(category);
    } catch (err) {
      setMonthlyData([]);
      setCategoryData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [period]);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#2563EB']}
            tintColor="#2563EB"
          />
        }
      >
        <View style={styles.header}>
          <Text style={styles.title}>Financial Reports</Text>
          <View style={styles.periodSelector}>
            {periods.map((p) => (
              <TouchableOpacity
                key={p}
                style={[
                  styles.periodButton,
                  period === p && styles.activePeriodButton,
                ]}
                onPress={() => setPeriod(p)}
              >
                <Text
                  style={[
                    styles.periodButtonText,
                    period === p && styles.activePeriodButtonText,
                  ]}
                >
                  {p}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        {loading ? (
          <ActivityIndicator size="large" color="#3B82F6" style={{ marginTop: 40 }} />
        ) : (
          <>
            <IncomeExpenseChart data={monthlyData} />
            <CategoryBreakdown categories={categoryData} />
            <SpendingTrend data={monthlyData} />
          </>
        )}
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