import React, { useState } from "react";
import {
    Keyboard,
    Modal,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import { createTransaction } from "../../utils/transactionApi";

type AddTransactionModalProps = {
  visible: boolean;
  onClose: () => void;
  onAdded: () => void;
};

export default function AddTransactionModal({
  visible,
  onClose,
  onAdded,
}: AddTransactionModalProps) {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [type, setType] = useState<"income" | "expense">("expense");
  const [error, setError] = useState("");

  const handleSave = async () => {
    setError("");
    if (!amount || !description || !date || !type) {
      setError("All fields are required");
      return;
    }
    try {
      await createTransaction({
        amount: parseFloat(amount),
        description,
        date,
        type,
      });
      setAmount("");
      setDescription("");
      setDate(new Date().toISOString().split("T")[0]);
      setType("expense");
      onClose();
      onAdded();
    } catch (e: any) {
      setError(e?.response?.data?.message || "Failed to add transaction");
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.backdrop}>
          <View style={styles.modalContent}>
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
            <View style={styles.typeRow}>
              <TouchableOpacity
                style={[
                  styles.typeButton,
                  type === "expense" && styles.typeButtonActive,
                ]}
                onPress={() => setType("expense")}
              >
                <Text
                  style={[
                    styles.typeButtonText,
                    type === "expense" && styles.typeButtonTextActive,
                  ]}
                >
                  Expense
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.typeButton,
                  type === "income" && styles.typeButtonActive,
                ]}
                onPress={() => setType("income")}
              >
                <Text
                  style={[
                    styles.typeButtonText,
                    type === "income" && styles.typeButtonTextActive,
                  ]}
                >
                  Income
                </Text>
              </TouchableOpacity>
            </View>
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

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
  typeRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 12,
  },
  typeButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: "#F1F5F9",
    marginHorizontal: 4,
    alignItems: "center",
  },
  typeButtonActive: {
    backgroundColor: "#3B82F6",
  },
  typeButtonText: {
    fontSize: 15,
    color: "#64748B",
    fontWeight: "600",
  },
  typeButtonTextActive: {
    color: "#fff",
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