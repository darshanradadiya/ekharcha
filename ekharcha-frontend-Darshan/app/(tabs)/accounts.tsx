import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
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

type ApiName = "getAccounts" | "createAccount" | "updateAccount" | "deleteAccount" | "searchAccounts";

type FormErrors = {
  name?: string;
  email?: string;
  general?: string;
};

export default function AccountsScreen() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [form, setForm] = useState({ name: "", email: "", username: "" });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [searchType, setSearchType] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  // Ref to track API calls counts only for console logs
  const apiCallCountRef = useRef<Record<ApiName, number>>({
    getAccounts: 0,
    createAccount: 0,
    updateAccount: 0,
    deleteAccount: 0,
    searchAccounts: 0,
  });

  const nameRef = useRef<TextInput>(null) as React.RefObject<TextInput>;
  const emailRef = useRef<TextInput>(null) as React.RefObject<TextInput>;
  const usernameRef = useRef<TextInput>(null) as React.RefObject<TextInput>;
  const searchRef = useRef<TextInput>(null) as React.RefObject<TextInput>;

  // Track API call and log to console
  const trackApiCall = useCallback((apiName: ApiName) => {
    apiCallCountRef.current[apiName]++;
    console.log(
      `🔥 API Call: ${apiName} - ${new Date().toLocaleTimeString()} (Total: ${apiCallCountRef.current[apiName]})`
    );
  }, []);

  const validateForm = useCallback(() => {
    const newErrors: FormErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = "Invalid email address";
    return newErrors;
  }, [form.name, form.email]);

  const fetchAccounts = useCallback(async () => {
    try {
      setIsLoading(true);
      trackApiCall("getAccounts");
      const data = await getAccounts();
      setAccounts(data);
      console.log(`✅ getAccounts successful - Total calls: ${apiCallCountRef.current.getAccounts}`);
    } catch (error) {
      console.log(`❌ getAccounts failed:`, error);
      setErrors({ general: "Failed to fetch accounts" });
      Alert.alert("Error", "Failed to fetch accounts");
    } finally {
      setIsLoading(false);
    }
  }, [trackApiCall]);

  useEffect(() => {
    fetchAccounts();
  }, [fetchAccounts]);

  const handleCreateOrUpdate = useCallback(async () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsLoading(true);
    Keyboard.dismiss();

    try {
      if (editingId) {
        trackApiCall("updateAccount");
        await updateAccount(editingId, form);
        console.log(`✅ updateAccount successful - ID: ${editingId}`);
        Alert.alert("Success", "Account updated successfully");
      } else {
        trackApiCall("createAccount");
        await createAccount(form);
        console.log(`✅ createAccount successful`);
        Alert.alert("Success", "Account created successfully");
      }

      setForm({ name: "", email: "", username: "" });
      setEditingId(null);
      await fetchAccounts();
    } catch (error: any) {
      console.log(`❌ Create/Update failed:`, error);
      const message = error?.response?.data?.message || error?.message || "Operation failed";
      setErrors({ general: message });
      Alert.alert("Error", message);
    } finally {
      setIsLoading(false);
    }
  }, [validateForm, editingId, form, trackApiCall, fetchAccounts]);

  const handleDelete = useCallback(
    async (id: string) => {
      Alert.alert("Delete Account", "Are you sure you want to delete this account?", [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              setIsLoading(true);
              trackApiCall("deleteAccount");
              await deleteAccount(id);
              console.log(`✅ deleteAccount successful - ID: ${id}`);
              Alert.alert("Success", "Account deleted successfully");
              await fetchAccounts();
            } catch (error: any) {
              console.log(`❌ deleteAccount failed:`, error);
              const message = error?.response?.data?.message || error?.message || "Failed to delete account";
              setErrors({ general: message });
              Alert.alert("Error", message);
            } finally {
              setIsLoading(false);
            }
          },
        },
      ]);
    },
    [trackApiCall, fetchAccounts]
  );

  const handleEdit = useCallback((account: Account) => {
    console.log("📝 Edit mode activated for:", account.name);
    setForm({
      name: account.name,
      email: account.email,
      username: account.username ?? "",
    });
    setEditingId(account._id ?? null);
    setErrors({});

    setTimeout(() => {
      nameRef.current?.focus();
    }, 100);
  }, []);

  const handleSearch = useCallback(
    async () => {
      try {
        setIsLoading(true);
        Keyboard.dismiss();

        if (!searchType.trim()) {
          console.log("🔍 Empty search - calling fetchAccounts");
          await fetchAccounts();
          return;
        }

        trackApiCall("searchAccounts");
        const data = await searchAccountsByType(searchType.trim());
        setAccounts(data);
        console.log(`✅ searchAccounts successful - Query: "${searchType}"`);
      } catch (error: any) {
        console.log(`❌ searchAccounts failed:`, error);
        const message = error?.response?.data?.message || error?.message || "Search failed";
        setErrors({ general: message });
        Alert.alert("Error", message);
      } finally {
        setIsLoading(false);
      }
    },
    [searchType, fetchAccounts, trackApiCall]
  );

  const handleInputChange = useCallback(
    (field: keyof typeof form, value: string) => {
      setForm((prev) => ({ ...prev, [field]: value }));
      if (errors[field as keyof FormErrors]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    },
    [errors]
  );

  const focusNextInput = useCallback((nextRef: React.RefObject<TextInput>) => {
    setTimeout(() => {
      nextRef?.current?.focus();
    }, 100);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.container}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.scrollViewContent}
        >
          <View style={styles.formSection}>
            <Text style={styles.heading}>{editingId ? "Update Account" : "Create Account"}</Text>

            <TextInput
              ref={nameRef}
              style={[styles.input, errors.name && styles.inputError]}
              placeholder="Name"
              value={form.name}
              onChangeText={(text) => handleInputChange("name", text)}
              returnKeyType="next"
              blurOnSubmit={false}
              autoCorrect={false}
              spellCheck={false}
              autoCapitalize="words"
              editable={!isLoading}
              onSubmitEditing={() => focusNextInput(emailRef)}
            />
            {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

            <TextInput
              ref={emailRef}
              style={[styles.input, errors.email && styles.inputError]}
              placeholder="Email"
              value={form.email}
              onChangeText={(text) => handleInputChange("email", text)}
              keyboardType="email-address"
              autoCapitalize="none"
              returnKeyType="next"
              blurOnSubmit={false}
              autoCorrect={false}
              spellCheck={false}
              editable={!isLoading}
              onSubmitEditing={() => focusNextInput(usernameRef)}
            />
            {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

            <TextInput
              ref={usernameRef}
              style={styles.input}
              placeholder="Username (optional)"
              value={form.username}
              onChangeText={(text) => handleInputChange("username", text)}
              autoCapitalize="none"
              returnKeyType="done"
              blurOnSubmit={true}
              autoCorrect={false}
              spellCheck={false}
              editable={!isLoading}
              onSubmitEditing={handleCreateOrUpdate}
            />

            {errors.general && <Text style={styles.generalError}>{errors.general}</Text>}

            <TouchableOpacity
              style={[styles.primaryBtn, isLoading && styles.primaryBtnDisabled]}
              onPress={handleCreateOrUpdate}
              activeOpacity={0.8}
              disabled={isLoading}
            >
              <Text style={styles.primaryBtnText}>{isLoading ? "Processing..." : editingId ? "Update" : "Create"}</Text>
            </TouchableOpacity>

            <View style={styles.divider} />

            <Text style={styles.heading}>Search by Type</Text>
            <View style={styles.searchRow}>
              <TextInput
                ref={searchRef}
                style={[styles.input, styles.searchInput]}
                placeholder="e.g. personal, business"
                value={searchType}
                onChangeText={setSearchType}
                returnKeyType="search"
                blurOnSubmit={true}
                autoCorrect={false}
                spellCheck={false}
                autoCapitalize="none"
                editable={!isLoading}
                onSubmitEditing={handleSearch}
              />
              <TouchableOpacity
                style={[styles.searchBtn, isLoading && styles.searchBtnDisabled]}
                onPress={handleSearch}
                disabled={isLoading}
              >
                <Text style={styles.searchBtnText}>Search</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.listSection}>
            <Text style={styles.heading}>Accounts</Text>
            {accounts.length === 0 && !isLoading && (
              <Text style={styles.noAccounts}>No accounts found.</Text>
            )}
            {accounts.map((account) => (
              <View key={account._id ?? account.email} style={styles.card}>
                <Text style={styles.cardTitle}>{account.name}</Text>
                <Text style={styles.cardDetail}>{account.email}</Text>
                {account.username && (
                  <Text style={styles.cardDetail}>{account.username}</Text>
                )}
                <View style={styles.cardBtnRow}>
                  <TouchableOpacity
                    style={styles.editBtn}
                    onPress={() => handleEdit(account)}
                    activeOpacity={0.7}
                    disabled={isLoading}
                  >
                    <Text style={styles.editBtnText}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.deleteBtn}
                    onPress={() => {
                      if (account._id) handleDelete(account._id);
                    }}
                    activeOpacity={0.7}
                    disabled={isLoading}
                  >
                    <Text style={styles.deleteBtnText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fefefe" },
  scrollViewContent: { padding: 16, paddingBottom: 40 },
  formSection: { marginBottom: 24 },
  heading: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 14,
    color: "#222",
  },
  input: {
    backgroundColor: "#fff",
    borderColor: "#bbb",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 10,
    fontSize: 16,
    color: "#111",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
  },
  inputError: {
    borderColor: "#e74c3c",
    backgroundColor: "#fceae9",
  },
  errorText: {
    color: "#e74c3c",
    marginBottom: 10,
    fontWeight: "600",
    fontSize: 13,
  },
  generalError: {
    color: "#c0392b",
    marginBottom: 14,
    fontWeight: "700",
    fontSize: 14,
    textAlign: "center",
  },
  primaryBtn: {
    backgroundColor: "#2a9d8f",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#2a9d8f",
    shadowOpacity: 0.5,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 5 },
  },
  primaryBtnDisabled: {
    backgroundColor: "#a5d6d3",
    shadowOpacity: 0,
  },
  primaryBtnText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
  divider: {
    height: 1,
    backgroundColor: "#ddd",
    marginVertical: 28,
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  searchInput: { flex: 1, marginRight: 10 },
  searchBtn: {
    backgroundColor: "#e76f51",
    paddingVertical: 13,
    paddingHorizontal: 18,
    borderRadius: 10,
    shadowColor: "#e76f51",
    shadowOpacity: 0.6,
    shadowRadius: 7,
    shadowOffset: { width: 0, height: 4 },
  },
  searchBtnDisabled: { backgroundColor: "#f4b6a5", shadowOpacity: 0 },

  searchBtnText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },

  listSection: { marginTop: 8 },
  noAccounts: {
    textAlign: "center",
    color: "#999",
    fontSize: 16,
    marginTop: 28,
    fontStyle: "italic",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 18,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOpacity: 0.07,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  cardTitle: {
    fontSize: 19,
    fontWeight: "700",
    marginBottom: 6,
    color: "#222",
  },
  cardDetail: {
    fontSize: 15,
    color: "#555",
    marginBottom: 4,
  },
  cardBtnRow: {
    flexDirection: "row",
    marginTop: 14,
    justifyContent: "flex-end",
  },
  editBtn: {
    backgroundColor: "#f4a261",
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 10,
    marginRight: 10,
    shadowColor: "#f4a261",
    shadowOpacity: 0.6,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  editBtnText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
  },
  deleteBtn: {
    backgroundColor: "#e63946",
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 10,
    shadowColor: "#e63946",
    shadowOpacity: 0.6,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  deleteBtnText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
  },
});
