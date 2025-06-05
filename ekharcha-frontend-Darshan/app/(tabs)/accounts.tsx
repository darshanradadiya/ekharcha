import { Plus } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import AccountCard from '../../components/accounts/Accountcard';
import AccountSummary from '../../components/accounts/Accountsummry';
import CreateAccountModal from '../../components/accounts/CreateAccountModal';
import UpdateAccountModal from '../../components/accounts/UpdateAccountModal';
import type { Account } from '../../utils/accountApi';
import { getAccounts } from '../../utils/accountApi';

export default function Accounts() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [showCreate, setShowCreate] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);

  const fetchAccounts = async () => {
    try {
      const data = await getAccounts();
      setAccounts(data || []);
    } catch {
      setAccounts([]);
    }
  };
  useEffect(() => {
    fetchAccounts();
  }, []);

  const totalBalance = accounts.reduce((sum, account) => sum + (account.balance || 0), 0);
  const assetsBalance = accounts
    .filter(account => account.type !== 'credit')
    .reduce((sum, account) => sum + (account.balance || 0), 0);
  const liabilitiesBalance = accounts
    .filter(account => account.type === 'credit')
    .reduce((sum, account) => Math.abs(sum) + Math.abs(account.balance || 0), 0);

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView style={styles.scrollView}>
        <AccountSummary 
          totalBalance={totalBalance}
          assetsBalance={assetsBalance}
          liabilitiesBalance={liabilitiesBalance}
        />
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Your Accounts</Text>
          <TouchableOpacity onPress={() => setShowCreate(true)} style={styles.addButton}>
            <Plus size={18} color="#3B82F6" />
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
        </View>
        {accounts.length === 0 ? (
          <Text style={{ textAlign: 'center', color: '#888', marginTop: 24 }}>
            No accounts found.
          </Text>
        ) : (
          accounts.map((account) => (
            <TouchableOpacity
              key={Number(account._id)}
              onPress={() => { setSelectedAccount(account); setShowUpdate(true); }}
              activeOpacity={0.8}
            >
              <AccountCard
                account={{
                  ...account,
                  id: Number(account._id),
                  _id: Number(account._id),
                  type: account.type as "credit" | "checking" | "savings" | "investment", // Type assertion
                }}
              />
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
      <CreateAccountModal
        visible={showCreate}
        onClose={() => setShowCreate(false)}
        onCreated={fetchAccounts}
      />
      {selectedAccount && (
        <UpdateAccountModal
          visible={showUpdate}
          onClose={() => setShowUpdate(false)}
          account={selectedAccount}
          onUpdated={fetchAccounts}
        />
      )}
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
  sectionHeader: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0F172A',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  addButtonText: {
    marginLeft: 4,
    fontSize: 14,
    fontWeight: '500',
    color: '#3B82F6',
  },
});