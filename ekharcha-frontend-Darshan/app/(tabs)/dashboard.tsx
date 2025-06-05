import { Plus } from 'lucide-react-native';
import React, { useState } from 'react';
import { Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import DashboardCards from '../../components/dashboard/Dashboardcards';
import RecentTransactions from '../../components/dashboard/RecentTrasncations';
import SpendingChart from '../../components/dashboard/Spendingchart';
import AddTransactionModal from '../../components/transcations/AddTransactionModal';

export default function DashboardScreen() {
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.greeting}>Welcome back, Alex</Text>
          <Text style={styles.date}>{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</Text>
        </View>

        <DashboardCards />
        <SpendingChart />
        <RecentTransactions />
      </ScrollView>

      <TouchableOpacity 
        style={styles.fab} 
        onPress={() => setShowAddModal(true)}
        activeOpacity={0.9}
      >
        <Plus color="#FFFFFF" size={24} />
      </TouchableOpacity>

      <AddTransactionModal 
        visible={showAddModal} 
        onClose={() => setShowAddModal(false)} 
      />
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
  contentContainer: {
    paddingBottom: 80,
  },
  headerContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  greeting: {
    fontSize: 20,
    fontWeight: '600',
    color: '#0F172A',
    marginBottom: 4,
  },
  date: {
    fontSize: 14,
    color: '#64748B',
  },
  fab: {
    position: 'absolute',
    bottom: Platform.OS === 'web' ? 24 : 32,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});