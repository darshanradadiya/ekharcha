import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MonthlyData } from '../../types/types';

interface SpendingTrendProps {
  data: MonthlyData[];
}

const SpendingTrend = ({ data }: SpendingTrendProps) => {
  const calculateTrend = () => {
    // This is a simplified trend calculation
    if (data.length < 2) return 0;
    
    const firstMonth = data[data.length - 1].expenses;
    const lastMonth = data[0].expenses;
    
    return ((lastMonth - firstMonth) / firstMonth) * 100;
  };
  
  const trend = calculateTrend();
  const isPositiveTrend = trend <= 0; // Negative trend in expenses is positive financially
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Spending Trend</Text>
      
      <View style={styles.trendContainer}>
        <Text style={styles.trendLabel}>
          Your spending has 
          <Text style={[
            styles.trendValue,
            isPositiveTrend ? styles.positiveTrend : styles.negativeTrend
          ]}>
            {' '}{trend > 0 ? 'increased' : 'decreased'} by {Math.abs(trend).toFixed(1)}%
          </Text>
          {' '}compared to the beginning of this period.
        </Text>
      </View>
      
      <View style={styles.lineChartContainer}>
        {/* This is a simplified line chart visualization */}
        <View style={styles.lineChart}>
          {data.map((item, index) => {
            const maxExpense = Math.max(...data.map(d => d.expenses));
            const height = (item.expenses / maxExpense) * 100;
            
            return (
              <View key={index} style={styles.dataPointContainer}>
                <View 
                  style={[
                    styles.dataPoint, 
                    { bottom: `${height}%` }
                  ]} 
                />
                {index < data.length - 1 && (
                  <View 
                    style={[
                      styles.dataLine,
                      {
                        bottom: `${height}%`,
                        width: `${100 / data.length}%`,
                        transform: [
                          { 
                            rotate: calculateLineAngle(
                              height, 
                              (data[index + 1].expenses / maxExpense) * 100
                            ) 
                          }
                        ]
                      }
                    ]} 
                  />
                )}
                <Text style={styles.dataLabel}>{item.month}</Text>
              </View>
            );
          })}
        </View>
      </View>
      
      <View style={styles.insightsContainer}>
        <Text style={styles.insightTitle}>Spending Insights:</Text>
        <View style={styles.insightItem}>
          <View style={styles.insightBullet} />
          <Text style={styles.insightText}>
            Your highest spending month was {getHighestSpendingMonth(data)}.
          </Text>
        </View>
        <View style={styles.insightItem}>
          <View style={styles.insightBullet} />
          <Text style={styles.insightText}>
            {trend > 0 
              ? 'Consider reviewing your budget to reduce expenses.'
              : 'Great job keeping your expenses under control!'}
          </Text>
        </View>
      </View>
    </View>
  );
};

// Helper function to calculate the angle for the connecting line
const calculateLineAngle = (startHeight: number, endHeight: number) => {
  const heightDiff = endHeight - startHeight;
  return `${Math.atan(heightDiff / 50) * (180 / Math.PI)}deg`;
};

// Helper function to get the month with highest spending
const getHighestSpendingMonth = (data: MonthlyData[]) => {
  if (data.length === 0) return '';
  
  const highestMonth = data.reduce((prev, current) => {
    return (prev.expenses > current.expenses) ? prev : current;
  });
  
  return highestMonth.month;
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
  trendContainer: {
    backgroundColor: '#F1F5F9',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  trendLabel: {
    fontSize: 14,
    color: '#0F172A',
    lineHeight: 20,
  },
  trendValue: {
    fontWeight: '600',
  },
  positiveTrend: {
    color: '#10B981',
  },
  negativeTrend: {
    color: '#EF4444',
  },
  lineChartContainer: {
    height: 150,
    marginBottom: 16,
  },
  lineChart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: '100%',
    paddingTop: 20,
    paddingBottom: 30,
  },
  dataPointContainer: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    position: 'relative',
  },
  dataPoint: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#3B82F6',
    position: 'absolute',
    zIndex: 2,
  },
  dataLine: {
    height: 2,
    backgroundColor: '#3B82F6',
    position: 'absolute',
    right: '50%',
    zIndex: 1,
  },
  dataLabel: {
    position: 'absolute',
    bottom: 0,
    fontSize: 12,
    color: '#64748B',
  },
  insightsContainer: {
    marginTop: 16,
  },
  insightTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0F172A',
    marginBottom: 12,
  },
  insightItem: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  insightBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#3B82F6',
    marginTop: 6,
    marginRight: 8,
  },
  insightText: {
    flex: 1,
    fontSize: 14,
    color: '#0F172A',
    lineHeight: 20,
  },
});

export default SpendingTrend;