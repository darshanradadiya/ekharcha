import { Picker } from "@react-native-picker/picker"; // ✅ Import added here
import React, { useEffect, useState } from "react";
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { getAccounts } from "../../utils/accountApi";
import { createTransaction } from "../../utils/transactionApi";

interface AddTransactionModalProps {
  visible: boolean;
  onClose: () => void;
  onAdded: () => void;
}

const AddTransactionModal: React.FC<AddTransactionModalProps> = ({
  visible,
  onClose,
  onAdded,
}) => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [type, setType] = useState<"income" | "expense">("expense");
  const [accountId, setAccountId] = useState("");
  const [category, setCategory] = useState("");
  const [accounts, setAccounts] = useState<{ _id: string; name: string }[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (visible) {
      getAccounts()
        .then(setAccounts)
        .catch(() => setAccounts([]));
    }
  }, [visible]);

  const handleSave = async () => {
    setError("");
    if (!amount || !description || !date || !type || !accountId) {
      setError("All fields are required");
      return;
    }
    try {
      await createTransaction({
        amount: parseFloat(amount),
        description,
        date,
        type,
        accountId,
        category,
      });
      handleClose();
      onAdded();
    } catch (e: any) {
      setError(e?.response?.data?.message || "Failed to add transaction");
    }
  };

  const handleClose = () => {
    setAmount("");
    setDescription("");
    setDate(new Date().toISOString().split("T")[0]);
    setType("expense");
    setAccountId("");
    setCategory("");
    setError("");
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.backdrop}>
        <View style={styles.modalContent}>
          <ScrollView>
            <Text style={styles.title}>Add Transaction</Text>
            <TextInput
              placeholder="Amount"
              value={amount}
              onChangeText={setAmount}
              keyboardType="decimal-pad"
              style={styles.input}
            />
            <TextInput
              placeholder="Description"
              value={description}
              onChangeText={setDescription}
              style={styles.input}
            />
            <TextInput
              placeholder="Date (YYYY-MM-DD)"
              value={date}
              onChangeText={setDate}
              style={styles.input}
            />
            <View style={styles.pickerWrapper}>
              <Picker selectedValue={type} onValueChange={setType}>
                <Picker.Item label="Expense" value="expense" />
                <Picker.Item label="Income" value="income" />
              </Picker>
            </View>
            <View style={styles.pickerWrapper}>
              <Picker selectedValue={accountId} onValueChange={setAccountId}>
                <Picker.Item label="Select Account" value="" />
                {accounts.map((acc) => (
                  <Picker.Item key={acc._id} label={acc.name} value={acc._id} />
                ))}
              </Picker>
            </View>
            <TextInput
              placeholder="Category (optional)"
              value={category}
              onChangeText={setCategory}
              style={styles.input}
            />
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={handleClose}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(15,23,42,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 24,
    borderRadius: 16,
    width: "90%",
    maxHeight: "90%",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 16,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 12,
    backgroundColor: "#F8FAFC",
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 8,
    marginBottom: 12,
    backgroundColor: "#F8FAFC",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 12,
  },
  cancelButton: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
    backgroundColor: "#F1F5F9",
    marginRight: 10,
  },
  cancelButtonText: {
    color: "#64748B",
    fontWeight: "600",
    fontSize: 15,
  },
  saveButton: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
    backgroundColor: "#3B82F6",
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 15,
  },
  error: {
    color: "red",
    marginBottom: 8,
    textAlign: "center",
  },
});

export default AddTransactionModal;
