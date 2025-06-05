import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { X } from 'lucide-react-native';

interface TransactionFiltersProps {
  activeFilters: string[];
  onFilterChange: (filters: string[]) => void;
}

const TransactionFilters = ({ activeFilters, onFilterChange }: TransactionFiltersProps) => {
  const categories = [
    'Food', 'Shopping', 'Transportation', 'Entertainment', 
    'Housing', 'Utilities', 'Healthcare', 'Education', 
    'Travel', 'Groceries', 'Salary', 'Investments'
  ];
  
  const toggleFilter = (category: string) => {
    if (activeFilters.includes(category)) {
      onFilterChange(activeFilters.filter(c => c !== category));
    } else {
      onFilterChange([...activeFilters, category]);
    }
  };
  
  const clearFilters = () => {
    onFilterChange([]);
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Filter by Category</Text>
        {activeFilters.length > 0 && (
          <TouchableOpacity onPress={clearFilters} style={styles.clearButton}>
            <Text style={styles.clearButtonText}>Clear all</Text>
          </TouchableOpacity>
        )}
      </View>
      
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesContainer}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryChip,
              activeFilters.includes(category) && styles.activeChip
            ]}
            onPress={() => toggleFilter(category)}
          >
            <Text
              style={[
                styles.categoryText,
                activeFilters.includes(category) && styles.activeCategoryText
              ]}
            >
              {category}
            </Text>
            {activeFilters.includes(category) && (
              <X size={12} color="#FFFFFF" style={styles.chipIcon} />
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    color: '#0F172A',
  },
  clearButton: {
    padding: 4,
  },
  clearButtonText: {
    color: '#3B82F6',
    fontSize: 14,
    fontWeight: '500',
  },
  categoriesContainer: {
    paddingHorizontal: 12,
    paddingBottom: 4,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    marginHorizontal: 4,
  },
  activeChip: {
    backgroundColor: '#3B82F6',
  },
  categoryText: {
    fontSize: 14,
    color: '#64748B',
  },
  activeCategoryText: {
    color: '#FFFFFF',
  },
  chipIcon: {
    marginLeft: 4,
  },
});

export default TransactionFilters;