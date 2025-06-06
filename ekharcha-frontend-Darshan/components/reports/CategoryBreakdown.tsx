import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type Category = {
  name: string;
  percentage: number;
  color: string;
};

interface Props {
  categories: Category[];
}

const CategoryBreakdown = ({ categories }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Spending by Category</Text>
      
      <View style={styles.pieChartContainer}>
        <View style={styles.pieChart}>
          {categories.map((category, index) => {
            const rotate =
              index === 0
                ? 0
                : categories
                    .slice(0, index)
                    .reduce((sum, cat) => sum + cat.percentage, 0) * 3.6;

            return (
              <View
                key={category.name}
                style={[
                  styles.pieSlice,
                  {
                    backgroundColor: category.color,
                    transform: [
                      { rotate: `${rotate}deg` },
                      { skewX: `${category.percentage * 3.6}deg` }
                    ],
                    opacity: 0.9,
                    zIndex: categories.length - index
                  }
                ]}
              />
            );
          })}
        </View>
      </View>
      
      <View style={styles.legendContainer}>
        {categories.map(category => (
          <View key={category.name} style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: category.color }]} />
            <View style={styles.legendTextContainer}>
              <Text style={styles.legendCategory}>{category.name}</Text>
              <Text style={styles.legendPercentage}>{category.percentage}%</Text>
            </View>
          </View>
        ))}
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
  pieChartContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 180,
    marginBottom: 16,
  },
  pieChart: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#F8FAFC',
    overflow: 'hidden',
    position: 'relative',
  },
  pieSlice: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    transformOrigin: 'center',
  },
  legendContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '48%',
    marginBottom: 12,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  legendTextContainer: {
    flex: 1,
  },
  legendCategory: {
    fontSize: 14,
    color: '#0F172A',
  },
  legendPercentage: {
    fontSize: 12,
    color: '#64748B',
  },
});

export default CategoryBreakdown;