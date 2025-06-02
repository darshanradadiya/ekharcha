import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import type { Account } from "../../utils/accountApi";
import {
  createAccount,
  deleteAccount,
  getAccounts,
  searchAccountsByType,
  updateAccount,
} from "../../utils/accountApi";

export default function AccountsScreen() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [form, setForm] = useState({ name: "", email: "", username: "" });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [searchType, setSearchType] = useState("");

  // Fetch accounts from API
  const fetchAccounts = async () => {
    try {
      const data = await getAccounts();
      console.log("Fetched accounts:", data); // Add this line
      setAccounts(data);
    } catch {
      Alert.alert("Error", "Failed to fetch accounts");
    }
  };
  useEffect(() => {
    fetchAccounts();
  }, []);

  // Create or update account
  const handleCreateOrUpdate = async () => {
    try {
      if (!form.name || !form.email) {
        Alert.alert("Validation", "Name and Email are required.");
        return;
      }
      if (editingId) {
        await updateAccount(editingId, form);
        Alert.alert("Success", "Account updated");
      } else {
        await createAccount(form);
        Alert.alert("Success", "Account created");
      }
      setForm({ name: "", email: "", username: "" });
      setEditingId(null);
      fetchAccounts();
    } catch {
      Alert.alert("Error", "Something went wrong");
    }
  };

  // Delete account
  const handleDelete = async (id: string) => {
    Alert.alert("Delete", "Are you sure you want to delete?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            await deleteAccount(id);
            fetchAccounts();
          } catch {
            Alert.alert("Error", "Failed to delete account");
          }
        },
      },
    ]);
  };

  // Edit account
  const handleEdit = (account: Account) => {
    setForm({
      name: account.name,
      email: account.email,
      username: account.username ?? "",
    });
    setEditingId(account._id ?? null);
  };

  // Search by type
  const handleSearch = async () => {
    try {
      if (!searchType.trim()) {
        fetchAccounts();
        return;
      }
      const data = await searchAccountsByType(searchType.trim());
      setAccounts(data);
    } catch {
      Alert.alert("Error", "Failed to search accounts");
    }
  };

  // Render each account card
  const renderAccountItem = ({ item }: { item: Account }) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{item.name}</Text>
      <Text style={styles.cardDetail}>{item.email}</Text>
      <Text style={styles.cardDetail}>{item.username}</Text>
      <View style={styles.cardBtnRow}>
        <TouchableOpacity
          style={styles.editBtn}
          onPress={() => handleEdit(item)}
        >
          <Text style={styles.editBtnText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteBtn}
          onPress={() => {
            if (item._id) handleDelete(item._id);
          }}
        >
          <Text style={styles.deleteBtnText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // Header with form and search
  const renderHeader = () => (
    <View style={styles.formSection}>
      <Text style={styles.heading}>
        {editingId ? "Update Account" : "Create Account"}
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={form.name}
        onChangeText={(v) => setForm({ ...form, name: v })}
        returnKeyType="next"
        blurOnSubmit={false}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={form.email}
        onChangeText={(v) => setForm({ ...form, email: v })}
        keyboardType="email-address"
        autoCapitalize="none"
        returnKeyType="next"
        blurOnSubmit={false}
      />
      <TextInput
        style={styles.input}
        placeholder="Username (optional)"
        value={form.username}
        onChangeText={(v) => setForm({ ...form, username: v })}
        autoCapitalize="none"
        returnKeyType="done"
      />
      <TouchableOpacity
        style={styles.primaryBtn}
        onPress={handleCreateOrUpdate}
        activeOpacity={0.8}
      >
        <Text style={styles.primaryBtnText}>
          {editingId ? "Update" : "Create"}
        </Text>
      </TouchableOpacity>

      <View style={styles.divider} />

      <Text style={styles.heading}>Search by Type</Text>
      <View style={styles.searchRow}>
        <TextInput
          style={[styles.input, styles.searchInput]}
          placeholder="e.g. personal, business"
          value={searchType}
          onChangeText={setSearchType}
          returnKeyType="search"
          onSubmitEditing={handleSearch}
        />
        <TouchableOpacity style={styles.searchBtn} onPress={handleSearch}>
          <Text style={styles.searchBtnText}>Search</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.divider} />
      <Text style={styles.heading}>Your Accounts</Text>
    </View>
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      >
        <FlatList
          ListHeaderComponent={renderHeader}
          data={accounts}
          keyExtractor={(item) => item._id ?? ""}
          renderItem={renderAccountItem}
          contentContainerStyle={{ paddingBottom: 32 }}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No accounts found.</Text>
          }
          keyboardShouldPersistTaps="handled"
        />
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f4f8",
  },
  formSection: {
    padding: 16,
    paddingBottom: 0,
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#22223b",
    marginBottom: 10,
    marginTop: 18,
    letterSpacing: 0.5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#bfc6d1",
    borderRadius: 8,
    padding: 12,
    marginVertical: 6,
    backgroundColor: "#fff",
    fontSize: 16,
    minHeight: 48,
  },
  searchInput: {
    flex: 1,
    marginRight: 8,
  },
  divider: {
    height: 1,
    backgroundColor: "#e0e4ea",
    marginVertical: 18,
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  searchBtn: {
    backgroundColor: "#6366F1",
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 8,
    minHeight: 48,
    justifyContent: "center",
  },
  searchBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  primaryBtn: {
    backgroundColor: "#22c55e",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
    minHeight: 48,
    justifyContent: "center",
  },
  primaryBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 17,
    letterSpacing: 0.5,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 18,
    marginVertical: 8,
    shadowColor: "#22223b",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#22223b",
    marginBottom: 4,
  },
  cardDetail: {
    fontSize: 15,
    color: "#4b5563",
    marginBottom: 2,
    marginLeft: 2,
  },
  cardBtnRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 12,
    gap: 12,
  },
  editBtn: {
    backgroundColor: "#fbbf24",
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 8,
    minHeight: 36,
    justifyContent: "center",
  },
  editBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },
  deleteBtn: {
    backgroundColor: "#ef4444",
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 8,
    minHeight: 36,
    justifyContent: "center",
  },
  deleteBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },
  emptyText: {
    textAlign: "center",
    color: "#888",
    fontSize: 16,
    marginTop: 32,
    padding: 20,
  },
});