import { Plus } from "lucide-react-native";
import React, { useEffect, useState, useCallback } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  RefreshControl,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import AccountCard from "../../components/accounts/Accountcard";
import AccountSummary from "../../components/accounts/Accountsummry";
import CreateAccountModal from "../../components/accounts/CreateAccountModal";
import UpdateAccountModal from "../../components/accounts/UpdateAccountModal";
import type { Account } from "../../utils/accountApi";
import { getAccounts } from "../../utils/accountApi";

export default function Accounts() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [showCreate, setShowCreate] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchAccounts();
    setRefreshing(false);
  };
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

  const totalBalance = accounts.reduce(
    (sum, account) => sum + (account.balance || 0),
    0
  );
  const assetsBalance = accounts
    .filter((account) => account.type !== "credit")
    .reduce((sum, account) => sum + (account.balance || 0), 0);
  const liabilitiesBalance = accounts
    .filter((account) => account.type === "credit")
    .reduce(
      (sum, account) => Math.abs(sum) + Math.abs(account.balance || 0),
      0
    );

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#3B82F6"]}
            tintColor="#3B82F6"
          />
        }
      >
        <AccountSummary
          totalBalance={totalBalance}
          assetsBalance={assetsBalance}
          liabilitiesBalance={liabilitiesBalance}
        />
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Your Accounts</Text>
          <TouchableOpacity
            onPress={() => setShowCreate(true)}
            style={styles.addButton}
          >
            <Plus size={18} color="#3B82F6" />
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
        </View>
        {/* // ...existing code... */}
        {accounts.length === 0 ? (
          <Text style={{ textAlign: "center", color: "#888", marginTop: 24 }}>
            No accounts found.
          </Text>
        ) : (
          accounts.map((account) => (
            <AccountCard
              key={String(account._id)}
              account={{
                ...account,
                _id: Number(account._id),
                id: account._id ?? String(account._id),
                type: account.type as
                  | "credit"
                  | "checking"
                  | "savings"
                  | "investment",
              }}
              onEdit={(account) => {
                setSelectedAccount({
                  ...account,
                  _id: String(account._id),
                  id: account.id,
                });
                setShowUpdate(true);
              }}
            />
          ))
        )}
        {/* // ...existing code... */}
      </ScrollView>

      <CreateAccountModal
        visible={showCreate}
        onClose={() => setShowCreate(false)}
        onCreated={() => {
          setShowCreate(false);
          fetchAccounts();
        }}
      />
      {selectedAccount && (
        <UpdateAccountModal
          visible={showUpdate}
          onClose={() => setShowUpdate(false)}
          account={selectedAccount}
          onUpdated={() => {
            setShowUpdate(false);
            fetchAccounts();
          }}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  scrollView: {
    flex: 1,
  },
  sectionHeader: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#0F172A",
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
  },
  addButtonText: {
    marginLeft: 4,
    fontSize: 14,
    fontWeight: "500",
    color: "#3B82F6",
  },
});
